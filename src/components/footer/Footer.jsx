import React from 'react'
import Link from 'next/link'
// import Categorias from "../categorias/Categorias"
import styles from './footer.module.scss'

const Footer = ({ filtrarRodadas }) => {
  return (
    <div className={styles.SideToSide}>
      <div className={styles.logo}>
        <Link href='/'>
          <img
            alt='Footer'
            width='200'
            className='pikajuegos desktop logo'
            src='/images/logos/logo.svg'
          />
        </Link>
      </div>
      <hr />
      <div>
        <h3>Artículos de interes</h3>
        <Link href='/articulo/conocenos'>
          Quienes somos
        </Link>
      </div>
      <hr />
      <div className={styles.aliados}>
        <h3>Aliados</h3>
        <div className={styles.list}>
          <a href='https://juanchofenix.pik.com.co/' target='_BLANK' rel="noreferrer">
            Juancho Fenix
          </a>
          <a href='https://www.instagram.com/pixelmaker123/' target='_BLANK' rel="noreferrer">
            PixelMaker
          </a>
        </div>
      </div>
      <hr />
      <div>
        <h3>Contáctanos</h3>
        <p>Estamos en Medellín Colombia</p>
      </div>
    </div>
  )
}

export default Footer
