import styles from "./Footer.module.css";

const githubIcon =
  "https://www.nicepng.com/png/full/178-1787413_outsystems-now-on-github-github-logo-black-background.png";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <a href="https://github.com/WojciechLamperski">
        <img src={githubIcon} /> <p>Wojciech Lamperski</p>
      </a>

      <a href="https://github.com/szymonwislocki">
        <img src={githubIcon} /> <p>Szymon Wisłocki</p>
      </a>
      <a href="https://github.com/annavvis">
        <img src={githubIcon} /> <p>Anna Wiśniowska</p>
      </a>
      <a href="https://github.com/magdalena-zalewska">
        <img src={githubIcon} /> <p>Magdalena Zalewska</p>
      </a>
    </div>
  );
};

export default Footer;
