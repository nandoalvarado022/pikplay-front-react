/* eslint-disable jsx-a11y/alt-text */
import styles from './layout.module.scss'

import React from 'react'
import Link from 'next/link'
import Loading from '../loading/Loading'
import classNames from 'classnames'
import IA from '../ia/IA'
import Image from 'next/image'
import Button from '../button/Button'
import Categories from '../categories/Categories'
import MenuMovil from '../menuMovil/MenuMovil'
import CustomHeader from '../customHeader/CustomHeader.tsx'
import Notification from '../previewNotifications/index.jsx'
import Subcategories from '../subcategories/Subcategories'
import { IS_MOBILE } from '../../lib/variables'
import { ToastContainer } from 'react-toastify'

const Body = ({ children, isReady, userLogged, notifications }) => {
  return <>
    <main
      className={classNames('App font-a', {
        [styles.main]: true,
        [styles.AppComponent]: true,
        [styles.ready]: isReady,
      })}
    >
      <CustomHeader />
      {false && (
        <div className={styles.announcement}>
          Actualmente estamos en una versión piloto
        </div>
      )}
      <ToastContainer autoClose={5000} hideProgressBar={true} />
      <Categories scroll={false} />
      <Subcategories />
      <Link href='/articulo/pikcoins-que-son-y-como-redimir-cupones'>
        <div className={styles.wrapperBanner}>
          <Image src='/images/banners/banner-regalos-descuentos-pikcoins.svg' fill={true} layout='fill' />
        </div>
      </Link>
      {IS_MOBILE && <MenuMovil />}
      {children}
      <a
        className='a_whatsapp'
        href='https://api.whatsapp.com/send?phone=573054202450&text=Hola Pikplay, tengo una consulta sobre los servicios que ofrecen a los Gamers en Colombia'
        target='_BLANK'
        rel="noreferrer"
      >
        <button className={styles['btn-whatsapp']}>
          <Image
            className={styles['we-are-here']}
            src='/images/others/we-are-here.svg'
            height={40}
            width={40}
          />
          <Image
            alt='Hablar con un asesor vía Whatsapp'
            src='/images/icons/whatsapp.png'
            height={40}
            width={40}
          />
        </button>
      </a>
      <IA />
    </main>
    <div className='avisoCookies font-c'>
      Pikajuegos utiliza cookies para medir el uso del sitio web,
      ofrecerte publicidad relacionada con tus intereses y habilitar
      funciones de redes sociales. Para más información y ajustar tu
      configuración de cookies, haz clic aquí.
      <p>
        {/* <Button
          className='blue small m-l-10'
          text='Aceptar'
          onClick=''
        /> */}
      </p>
    </div>
  </>
}

export default Body
