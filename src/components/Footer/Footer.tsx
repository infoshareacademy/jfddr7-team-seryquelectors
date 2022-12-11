import styles from "./Footer.module.scss";

const githubIcon = "https://www.nicepng.com/png/full/178-1787413_outsystems-now-on-github-github-logo-black-background.png";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <a className={styles.footer__button} href="https://github.com/WojciechLamperski">
        <img src={githubIcon} className={styles.footer__img} /> <p>Wojciech Lamperski</p>
      </a>
      <a className={styles.footer__button} href="https://github.com/szymonwislocki">
        <img className={styles.footer__img} src={githubIcon} /> <p>Szymon Wisłocki</p>
      </a>
      <a className={styles.footer__button} href="https://github.com/annavvis">
        <img className={styles.footer__img} src={githubIcon} /> <p>Anna Wiśniowska</p>
      </a>
      <a className={styles.footer__button} href="https://github.com/magdalena-zalewska">
        <img className={styles.footer__img} src={githubIcon} /> <p>Magdalena Zalewska</p>
      </a>
    </div>
  );
};

export default Footer;
