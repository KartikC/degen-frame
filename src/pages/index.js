import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
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
        <div className={styles.description}>
          <p>
            Get started by editing&nbsp;
            <code className={styles.code}>src/pages/index.js</code>
          </p>
          <div>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{" "}
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                className={styles.vercelLogo}
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
