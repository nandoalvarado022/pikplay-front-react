import React, { useEffect, useState } from 'react'
import Button from '../button/Button'
import Categorias from '../categorias/Categorias'
import Head from 'next/head'
import MenuMovil from '../menuMovil/MenuMovil'
import MyHeader from '../myHeader/MyHeader.tsx'
import NProgress from 'nprogress'
import Notification from '../previewNotifications/index.jsx'
import Router from 'next/router'
import Subcategories from '../subcategories/Subcategories'
import { IS_MOBILE } from '../../lib/variables'
import styles from './layout.module.scss'
import toastr from 'toastr'
import { ToastContainer } from 'react-toastify'
import { initGA, logPageView } from '../../../public/analytics'
import { register } from 'next-offline/runtime'
import Link from 'next/link'
import Loading from '../loading/Loading'
import classNames from 'classnames'
import IA from '../ia/IA'
import { useSystemStore } from '../../hooks/useSystem.js'

toastr.options.timeOut = 10000

Router.onRouteChangeStart = url => {
  NProgress.start()
}
Router.onRouteBeforeHistoryChange = url => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

const Layout = (props) => {
  const [isReady, setIsReady] = useState(false)
  const { children, descripcion, image, title, url } = props
  const { env, setValue } = useSystemStore((state => state))

  useEffect(() => {
    (setValue && !env && props?.env) && setValue('env', props?.env);
    register()
    if (!window.GA_INITIALIZED) {
      initGA()
      window.GA_INITIALIZED = true
    }
    logPageView()
  }, () => {
    setTimeout(() => {
      setIsReady(true)
    }, 1000)
  });

  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
        <meta property='title' content={title} />
        <meta property='og:title' content={title} />
        <meta name='description' content={descripcion} />
        <meta property='og:description' content={descripcion} />
        <meta property='og:image' content={image} />
        <meta name='url' content={url} />
        <meta name='og:url' content={url} />
        <meta name='og:site_name' content='Pikplay' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0'
        />
        <meta name='theme-color' content='#476E95' />
        <meta
          name='google-site-verification'
          content='4IqXj9YLrm5eo3s_c3cTKcAqBwUhCf8qgJgL2sLtJko'
        />
        <meta name='twitter:description' content={descripcion} />
        <meta name='keywords' value='' />
        <meta name='country' content='COL' />
        <meta name='author' content='pikplay.co' />
        <meta name='copyright' content='pikplay.co' />
        <meta name='language' content='es-CO'></meta>
        <meta httpEquiv='ScreenOrientation' content='autoRotate:disabled' />
        {/* Global site tag (gtag.js) - Google Ads: 941382150 */}
        <link rel='alternate' href={url} hrefLang='es-CO' />
        <link rel='canonical' href={url} />
        <link
          rel='icon'
          type='image/png'
          href='/images/logos/logo48x48.png'
        />
        <link rel='manifest' href={`/manifest.json`} />
        <link rel="stylesheet" href="/font-awesome-4.7.0/css/font-awesome.min.css"></link>
        <script
          type='text/javascript'
          src='https://checkout.epayco.co/checkout.js'
        ></script>
        {() => {
          window.dataLayer = window.dataLayer || []
          function gtag() {
            dataLayer.push(arguments)
          }
          gtag('js', new Date())
          gtag('config', 'AW-941382150')
          gtag('event', 'conversion', {
            send_to: 'AW-941382150/e71oCMvon-0BEIa08cAD',
          })
        }}
        ()
      </Head>
      <body
        className={classNames('App font-a', {
          [styles.AppComponent]: true,
          [styles.ready]: isReady,
        })}
      >
        <div className="content_enviroment">Enviroment: {env}</div>
        <main className={styles.main}>
          <MyHeader />
          {false && (
            <div className={styles.announcement}>
              Actualmente estamos en una versión piloto
            </div>
          )}
          <ToastContainer autoClose={5000} hideProgressBar={true} />
          <Categorias scroll={false} />
          <Subcategories />
          <div className={styles.wrapperBanner}>
            <Link href='/articulo/pikcoins-que-son-y-como-redimir-cupones'>
              <a>
                <img src='/images/banners/banner-regalos-descuentos-pikcoins.svg' />
              </a>
            </Link>
          </div>
          {IS_MOBILE && <MenuMovil />}
          {/* <Notification isOpen={this.context.showNotification} /> */}
          {children}
          <a
            target='_BLANK'
            className='a_whatsapp'
            href='https://api.whatsapp.com/send?phone=573054202450&text=Hola Pikplay, tengo una consulta sobre los servicios que ofrecen a los Gamers en Colombia'
          >
            <button className={styles['btn-whatsapp']}>
              <img
                className={styles['we-are-here']}
                src='/images/others/we-are-here.svg'
              />
              <img
                src='/images/icons/whatsapp.png'
                alt='Hablar con un asesor vía Whatsapp'
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
            <Button
              className='blue small m-l-10'
              text='Aceptar'
              onClick=''
            />
          </p>
        </div>
      </body>
    </React.Fragment>
  )
}

export default Layout
