import styles from "./Header.module.css";
import logo from "./kanban.svg";
import Image from "next/image";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <div className={styles.line1}></div>
        <div className={styles.line2}></div>
        <div className={styles.line3}></div>
        <Image
          src={logo}
          alt="logo"
          width={113}
          height={25}
          className={styles.logoImage}
        ></Image>
      </div>
    </div>
  );
};

export default Header;
