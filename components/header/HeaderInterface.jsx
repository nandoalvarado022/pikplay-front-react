import Newsletter from "../newsletter/Newsletter"
import styles from "./Header.module.scss"

const HeaderInterface = ({ active }) =>
  <React.Fragment>
    <Newsletter />
    <header id={styles.view_Header} className={active ? styles.active : null}>
      <a href="https://pik-play.com/">
        <img className={styles["logo-blanco"]} alt="Logo en blanco de Pik-Play" src="/images/logos/logo-cola.png" />
      </a>
      <nav className="f-l">
      </nav>
    </header>
  </React.Fragment>

export default HeaderInterface