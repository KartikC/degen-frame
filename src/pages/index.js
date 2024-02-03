import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import "@primer/css/markdown/index.scss";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [readmeContent, setReadmeContent] = useState("");

  // Fetch README content from GitHub
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/KartikC/degen-frame/main/README.md"
    )
      .then((response) => response.text())
      .then((text) => {
        setReadmeContent(text);
      })
      .catch((error) => console.error("Error fetching README:", error));
  }, []);

  return (
    <>
      <Head>
        <title>How degenerate are you?</title>
        <meta name="description" content="Reveal your degeneracy 🎩" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="fc:frame" content="vNext" />
        <meta
          property="fc:frame:image"
          content="https://degen-frame.vercel.app/default.png"
        />
        <meta property="og:image" content="/default.png" />
        <meta property="fc:frame:button:1" content="Reveal my degeneracy 🎩" />
        <meta
          property="fc:frame:post_url"
          content="https://degen-frame.vercel.app/api/og"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        {/* Render GitHub README here */}
        <div className="markdown-body">
          <ReactMarkdown>{readmeContent}</ReactMarkdown>
        </div>
      </main>
    </>
  );
}
