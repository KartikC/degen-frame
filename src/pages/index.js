import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import styled from "styled-components";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const inter = Inter({ subsets: ["latin"] });

const MarkdownContent = styled.div`
  display: flex; /* Use flexbox to center children */
  justify-content: center; /* Center children horizontally */
  align-items: center; /* Center children vertically */
  min-height: 100vh; /* Minimum height of the viewport */
  padding: 20px;
  background-color: #f0f0f0;
  color: #1a1a1a;
  border-radius: 8px;
  font-family: Arial, sans-serif;
  line-height: 1.6;
  background-color: #f0f0f0; /* Lighter background */
  color: #1a1a1a; /* Darker text color */
  padding: 20px;
  border-radius: 8px;
  font-family: Arial, sans-serif;
  line-height: 1.6;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #333; /* Even darker color for headers */
    margin-top: 24px;
    margin-bottom: 16px;
    font-weight: 600;
  }

  p {
    margin-top: 0;
    margin-bottom: 16px;
  }

  a {
    color: #0366d6;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  code {
    padding: 0.2em 0.4em;
    margin: 0;
    font-size: 90%;
    background-color: rgba(27, 31, 35, 0.1);
    border-radius: 6px;
  }

  pre {
    padding: 16px;
    overflow: auto;
    font-size: 90%;
    line-height: 1.45;
    background-color: #f6f8fa;
    border-radius: 6px;
  }

  /* Add more styles as needed */
`;

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
      <main>
        <MarkdownContent>
          <div style={{ maxWidth: "800px", width: "100%" }}>
            <ReactMarkdown>{readmeContent}</ReactMarkdown>
          </div>
        </MarkdownContent>
      </main>
    </>
  );
}
