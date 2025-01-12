import logoFeiraCiencias from "@/img/logo-feira-animated.svg";
import Image from "next/image";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header>
      <Image
        className={styles.logoFeira}
        src={logoFeiraCiencias}
        alt="Logo da Feira de Ciências"
        priority
      />
    </header>
  );
};

export { Header };
