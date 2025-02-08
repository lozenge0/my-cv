# Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3010](http://localhost:3010) with your browser to see the result.

To get the chatbot working you'll need to generate a gemini API Token and create a .env.local file like below:

```bash
GEMINI_ACCESS_TOKEN=XXXXXXXXXXXXXXXXXXXX
```

Where the X's are your token, no quote marks are necessary. When you deploy to Vercel you'll have to setup the same token as an environment variable.

You'll also want to change the system prompt and all the data that the project uses so that it's based upon you. To create the system prompt I first had an AI distill my CV (pdf version),
then I asked it to create one for an AI Hype Man, with a few tweaks to shorten the responses you too can have a grossly over enthusiatic AI Hype Man. Place the new prompt into the
`src/app/api/chat/systemprompt.ts` file.

Each core component under `src/components` directory has data related to the component that renders it, you'll want to make this specific to you.

You'll want to replace the CV with your own and in the Profile component (`src/components/Profile`) you can change the reference to your own file.

In assets (`src/assets`) directory, replace the `me.jpeg` file for your own image and name it the same or update the reference.

## Learn More

To learn more about the technologies used in this project, I highly advise checking out their documentation and talking with an LLM about aspects you wish to understand

- [React](https://react.dev/) - because we don't make websites like we used to
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [TailwindCSS](https://v2.tailwindcss.com/docs) - the CSS framework.
- [Gemini Flash](https://deepmind.google/technologies/gemini/flash/) - The chatbot is powered by Gemini (because it's free and I'm cheap)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

Again, I opted for Vercel because it has a free tier and I'm cheap, lol.
