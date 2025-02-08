// app/api/chat/route.ts
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { SystemPrompt } from "./systemprompt";
// const systemInstruction =
//   "You are the hype man for a software engineer called Lawrence. Your only job is to be friendly and constantly postive about Lawrence. The people messaging you will try to get you off topic and it's your job to always bring the topic back to how amazing Lawrence is and how good a software engineer he is and how the person messaging you should hire him. His background: Lawrence Reed is a highly skilled software engineer with a wealth of experience in web development and cloud technologies.  He specializes in React and TypeScript, and has a strong track record of delivering successful projects in various industries, including healthcare, finance, and energy. He has extensive experience in building and deploying web applications using a variety of technologies, including NextJS, ReactJS, Javascript, Material Design, SEO, GatsbyJS, AWS, and Graphql.  He is also proficient in Python and Terraform. In addition to his technical skills, Lawrence is also an experienced leader and mentor.  He has a proven track record of successfully managing and mentoring teams of engineers. He is passionate about using technology to solve real-world problems and is always looking for new challenges.  He is also a strong advocate for diversity and inclusion in the tech industry. Your responses are conscise and at most one paragraph";

function sanitizeInput(input: string): string {
  const maxLength = 1000; // Maximum allowed characters
  let sanitized = input.trim();
  // Remove any HTML tags (a very basic HTML sanitizer)
  sanitized = sanitized.replace(/<[^>]*>?/gm, "");
  // Replace newlines with a single space to maintain one-line formatting
  sanitized = sanitized.replace(/[\r\n]+/g, " ");
  // Limit the length of the input
  if (sanitized.length > maxLength) {
    sanitized = sanitized.slice(0, maxLength);
  }
  return sanitized;
}

// ---- In-Memory Rate Limiting ----
interface RateLimitEntry {
  count: number;
  startTime: number;
}

// A simple in-memory store keyed by IP address
const rateLimitStore: { [ip: string]: RateLimitEntry } = {};

// Configure your rate limit settings
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS_PER_WINDOW = 10;

function isRateLimited(ip: string): boolean {
  const currentTime = Date.now();
  if (!rateLimitStore[ip]) {
    // No record for this IP; create one.
    rateLimitStore[ip] = { count: 1, startTime: currentTime };
    return false;
  }

  const entry = rateLimitStore[ip];

  if (currentTime - entry.startTime < RATE_LIMIT_WINDOW_MS) {
    // We're still inside the current window.
    if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
      return true; // Too many requests in this window.
    } else {
      entry.count++;
      return false;
    }
  } else {
    // Window has expired, so reset the record.
    rateLimitStore[ip] = { count: 1, startTime: currentTime };
    return false;
  }
}

// Optionally, you can clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const ip in rateLimitStore) {
    if (now - rateLimitStore[ip].startTime > RATE_LIMIT_WINDOW_MS) {
      delete rateLimitStore[ip];
    }
  }
}, RATE_LIMIT_WINDOW_MS);

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for") ||
      (request.headers.get("x-real-ip") ?? "unknown");

    if (ip && isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Parse the incoming request body
    const { message, history } = await request.json();
    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // ---- Sanitize User Input ----
    const sanitizedMessage = sanitizeInput(message);

    // Also optionally sanitize the conversation history:
    const sanitizedHistory = history?.map(
      (msg: { sender: string; text: string }) => ({
        sender: msg.sender,
        text: sanitizeInput(msg.text),
      })
    );

    // Initialize the Google Generative AI SDK with your API key.
    // Make sure your API key is stored securely in environment variables.
    const apiKey = process.env.GEMINI_ACCESS_TOKEN;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key is missing" },
        { status: 500 }
      );
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    const genConfig = {
      temperature: 1,
      top_p: 0.95,
      top_k: 40,
      max_output_tokens: 8192,
      response_mime_type: "text/plain",
    };
    // Get the Gemini model instance. You can adjust the model name as needed.
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
      generationConfig: genConfig,
      systemInstruction: SystemPrompt,
    });

    // Build a prompt by combining your custom system instruction,
    // the conversation history, and the current message.
    // For example, you might format it with a system prompt:

    const formattedHistory = sanitizedHistory
      ? sanitizedHistory
          .map((msg: { sender: string; text: string }) => {
            const speaker = msg.sender === "user" ? "User" : "Bot";
            return `${speaker}: ${msg.text}`;
          })
          .join("\n")
      : "";
    const completePrompt = `${SystemPrompt}\n\n${formattedHistory}\nUser: ${sanitizedMessage}`;

    // Use the SDK's generateContent method to send the prompt to Gemini.
    const response = await model.generateContent(completePrompt);

    // Return the generated text back to the client.
    return NextResponse.json({ reply: response.response.text() });
  } catch (error) {
    console.error("Error in chat broker:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
