import boyScientist from "@/img/boy-scientist.svg";
import girlScientist from "@/img/girl-scientist.svg";
import logoIF from "@/img/logo_horizontal_santosdumont-1.png";
import Image from "next/image";
import styles from "./Footer.module.css";

interface Footer {
  className?: string;
}

const Footer = (props: Footer) => {
  const className = props.className || "";
  return (
    <footer className={[styles.footer, className].join(" ")}>
      <Image
        className={styles.logoIF}
        src={logoIF}
        alt="Logo do IFSudesteMG Santos Dumont"
      />
      <span className={styles.address}>
        R. Dr. Constantino Horta, 363 - Quarto Depósito, Santos Dumont - MG,
        36246-320
      </span>
      <span className={styles.developer}>
        Website desenvolvido por: Professor Arthur Assuncao
      </span>
      <div className={styles.credits}>
        <span>
          <a href="http://www.freepik.com">
            Images Designed by pikisuperstar / Freepik
          </a>
        </span>
      </div>
      <div className={styles.imagesBg}>
        <Image
          className={styles.girlScientist}
          src={girlScientist}
          alt="Cientista"
        />
        <Image
          className={styles.boyScientist}
          src={boyScientist}
          alt="Cientista"
        />
      </div>
    </footer>
  );
};

export { Footer };
