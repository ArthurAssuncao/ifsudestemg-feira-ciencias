import { FeiraCienciasResultado } from "@/components/FeiraCienciasResultado";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "@/styles/Home.module.css";
import styles from "@/styles/Home.module.css";
import Head from "next/head";

// thanks to: https://dev.to/mursalfk/effortless-data-management-connecting-google-sheets-to-your-reactjs-project-n96

export default function Home() {
  return (
    <div className={styles.nextBody}>
      <Head>
        <title>
          Feira de Ciências 2025 - Resultado - IFSudesteMG Santos Dumont
        </title>
        <meta
          name="description"
          content="Resultado da feira de ciências 2025 do IFSudesteMG Santos Dumont"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="google-site-verification"
          content="Y9T0DuNRgLw-rvMvZ4wOyeop9iL6KNiWGfTV3fsXhdk"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main className={styles.content}>
        <h1 className={styles.title}>Resultado - Edição 2025</h1>

        <FeiraCienciasResultado />
      </main>

      <Footer className={styles.footer} />
    </div>
  );
}
