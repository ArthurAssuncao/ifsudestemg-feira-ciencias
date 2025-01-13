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
    </footer>
  );
};

export { Footer };
