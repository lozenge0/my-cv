import { Contact } from "@/components/Contact";
import DarkModeToggle from "@/components/DarkModeToggle";
import { Education } from "@/components/Education";
import { Experiences } from "@/components/Experience";
import { Hobbies } from "@/components/Hobbies";
import Profile from "@/components/Profile";
import Skills from "@/components/Skills";
import meImg from "@/assets/me.jpeg";

export default function Home() {
  return (
    <>
      <header className="fixed top-4 right-4 z-10">
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://www.lawrencereed.co.uk/" />

        {/* Open Graph / Facebook Meta Tags */}
        <meta
          property="og:title"
          content="Lawrence Reed – Full Stack Engineer CV"
        />
        <meta
          property="og:description"
          content="A professional portfolio showcasing Lawrence Reed's experience as a Full Stack Engineer."
        />
        <meta property="og:url" content="https://www.lawrencereed.co.uk/" />
        <meta property="og:image" content={meImg.src} />
        <meta property="og:type" content="website" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Lawrence Reed – Full Stack Engineer CV"
        />
        <meta
          name="twitter:description"
          content="Explore the CV and portfolio of Lawrence Reed, a Full Stack Engineer with expertise in cutting-edge software development."
        />
        <meta name="twitter:image" content={meImg.src} />

        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Lawrence Reed",
              url: "https://www.lawrencereed.co.uk/",
              sameAs: [
                "https://www.linkedin.com/in/lawrencereed",
                "https://github.com/lawrencereed",
              ],
              jobTitle: "Full Stack Engineer",
              alumniOf: {
                "@type": "EducationalOrganization",
                name: "University Name",
              },
              image: { meImg },
              description:
                "Lawrence Reed is an experienced Full Stack Engineer with expertise in software development.",
            }),
          }}
        />
        <DarkModeToggle />
      </header>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <Profile />
          <Skills />
          <Experiences />
          <Education />
          <Hobbies />
          <Contact />
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
      </div>
    </>
  );
}
