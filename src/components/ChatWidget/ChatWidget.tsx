"use client";

import { useState, useEffect, useRef } from "react";

// Define a type for messages
type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, text: "Hey, let's chat about Lawrence", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  // Create a ref for the message container
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Effect to scroll to bottom whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send the message to the server API and update the conversation
  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: "user",
    };

    // Append the new user message to the chat history
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Send both the latest message and the full conversation history
        body: JSON.stringify({
          message: userMessage.text,
          history: updatedMessages,
        }),
      });
      const data = await res.json();
      if (data.reply) {
        const botMessage: Message = {
          id: Date.now() + 1,
          text: data.reply,
          sender: "bot",
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        console.error("API Error:", data.error);
      }
    } catch (error) {
      console.error("Sending message failed:", error);
    }
  };

  return (
    <>
      {/* Chat bubble icon */}
      <div className="fixed bottom-4 right-4">
        {!open && (
          <button
            onClick={() => setOpen(true)}
            className="p-3 bg-violet-500 rounded-full text-white shadow-lg"
          >
            💬 Chat About Lawrence
          </button>
        )}
      </div>

      {/* Chat window overlay */}
      {open && (
        <div className="fixed bottom-4 right-4 w-80 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg flex flex-col">
          {/* Header */}
          <div className="p-2 border-b border-gray-300 dark:border-gray-700 flex justify-between items-center">
            <span className="font-semibold text-gray-800 dark:text-gray-100">
              Chat
            </span>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-600 dark:text-gray-400"
            >
              ✕
            </button>
          </div>

          {/* Chat messages area */}
          <div className="p-2 flex-1 overflow-y-auto max-h-[50vh] space-y-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-2 rounded-lg max-w-xs break-words ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white self-end"
                    : "bg-violet-500 dark:bg-violet-500 text-gray-100 dark:text-gray-100 self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {/* Dummy element to scroll into view */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="p-2 border-t border-gray-300 dark:border-gray-700">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Type your message..."
              className="w-full p-2 border rounded resize-none bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
              rows={2}
            />
            <button
              onClick={sendMessage}
              className="mt-2 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
