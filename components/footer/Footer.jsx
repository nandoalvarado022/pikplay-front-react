import Link from "next/link"
// import Categorias from "../categorias/Categorias"
import styles from "./footer.module.scss"

const Footer = ({ filtrarRodadas }) => {
  return (<div className={styles.SideToSide}>
    <div className={styles.logo}>
      <Link href="/">
        <img alt="Footer" width="200" className="pikajuegos desktop logo" src="/images/logos/logo.png" />
      </Link>
    </div>
    <hr />
    <div>
      <h3>Artículos de interes</h3>
      <Link href="/start">
        <a>
          Quienes somos
        </a>
      </Link>
    </div>
    <hr />
    <div>
      <h3>Aliados verificados</h3>
      <a href="https://juanchofenix.pik.com.co/">
        Juancho Fenix
      </a>
    </div>
    <hr />
    <div>
      <h3>Contáctanos</h3>
      <p>
        Estamos en Medellín Colombia
      </p>
    </div>
  </div>
  );
};

export default Footer