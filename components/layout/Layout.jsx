const { IS_MOBILE } = VARS
import Button from "../button/Button"
import Categorias from "../categorias/Categorias"
import Head from "next/head"
import MenuMovil from "../menuMovil/MenuMovil"
import MyHeader from "../myHeader/MyHeader"
import NProgress from "nprogress"
import Notification from "../notification";
import React from "react"
import Router from "next/router"
import Subcategories from '../subcategories/Subcategories'
import VARS from "../../lib/variables"
import styles from "./layout.module.scss"
import toastr from "toastr"
import { ToastContainer } from "react-toastify"
import { initGA, logPageView } from "../../public/analytics"
import { register } from "next-offline/runtime"

toastr.options.timeOut = 10000

Router.onRouteChangeStart = (url) => {
  NProgress.start();
}
Router.onRouteBeforeHistoryChange = (url) => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const options = {
  items: 1,
  nav: true,
  rewind: true,
  autoplay: true
};

const events = {
  onDragged: function (event) { },
  onChanged: function (event) { }
}

class Layout extends React.Component {
  // static contextType = PikContext
  club_short_name = null
  state = {
    growMenu: false,
    imagen_club_usuario: false,
    step: 0,
    swAdd: false,
    tenemosCookies: true
  }

  tenemosCookies = () => {
    this.setState({ tenemosCookies: true });
    localStorage.setItem("tenemosCookies", true);
  }

  handleAdd = () => {
    this.setState((state) => ({
      swAdd: !state.swAdd,
      growMenu: !state.growMenu,
    }));
  }

  handlePlay() {
    document.getElementById("btnStart").click()
  }

  componentDidMount() {
    const context = this.context;
    // context.getNotifications()
    register();
    if (localStorage.getItem("user")) {
      this.club_short_name = JSON.parse(localStorage.getItem("user"))
        .club_short_name
        ? JSON.parse(localStorage.getItem("user")).club_short_name
        : null;
    }

    const handleAnterior = () => {
      if (this.context.guide_step == 1) return
      this.context.customDispatch({ type: "CHANGE_PROPERTY", payload: { property: "guide_step", value: this.context.guide_step - 1 } })
      document.querySelectorAll(".guide_images").forEach((element) => element.classList.remove("show"))
      const element = document.querySelector(`#img_guide_step_${this.context.guide_step - 1}`)
      if (element) element.classList.add("show")
    }

    const handleSiguiente = () => {
      if (this.context.guide_step == 2) return
      this.context.customDispatch({ type: "CHANGE_PROPERTY", payload: { property: "guide_step", value: this.context.guide_step + 1 } })
      document.querySelectorAll(".guide_images").forEach((element) => element.classList.remove("show"))
      const element = document.querySelector(`#img_guide_step_${this.context.guide_step + 1}`)
      if (element) element.classList.add("show")
    }

    const message = {
      id: "postRegistro", message: <div>
        {/* <h3 style={{ "fontWeight": 100, color: "white" }}>
          <b style={{ color: "white" }}>Bienvenido,</b>
          &nbsp;{this.context.user.name}
        </h3> */}
        <img style={{ maxHeight: "calc(100vh - 200px)", margin: "0 auto" }} className="guide_images show" id="img_guide_step_1" src="/images/banners/guia/1.png" alt="Completar perfil" />
        <img className="guide_images" id="img_guide_step_2" src="/images/banners/guia/2.png" alt="Completar perfil" />
        <button onClick={handleAnterior}>anterior</button>
        <button onClick={handleSiguiente}>siguiente</button>
      </div>

    }

    // Pending
    // this.context.customDispatch({ type: "SET_MESSAGE", payload: { message } })

    // Notificaciones push
    const script = document.createElement("script");
    script.src = "../../indigital/sdk.min.js";
    script.async = true;
    script.onload = () => {
      indigitall.init({
        appKey: "206e8272-19eb-4ef5-a935-22ab1a9ee5df",
        workerPath: "../../indigital/worker.min.js",
        requestLocation: true,
      });
    };
    document.body.appendChild(script);

    if (localStorage.getItem("user")) {
      this.setState({
        logueado: true,
      });
    }

    if (!localStorage.getItem("tenemosCookies")) {
      this.setState({
        tenemosCookies: false,
      });
    }

    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();

    if (
      localStorage.getItem("user") &&
      JSON.parse(localStorage.getItem("user")).hasOwnProperty("club_imagen")
    ) {
      this.setState({
        imagen_club_usuario: JSON.parse(localStorage.getItem("user"))
          .club_imagen,
      });
    }
  }

  render() {
    const { descripcion, image, title, url } = this.props

    return <React.Fragment>
      <Head>
        <title>{title}</title>
        <meta property="title" content={title} />
        <meta property="og:title" content={title} />
        <meta name="description" content={descripcion} />
        <meta property="og:description" content={descripcion} />
        <meta property="og:image" content={image} />
        <meta name="url" content={url} />
        <meta name="og:url" content={url} />
        <meta name="og:site_name" content="Pikplay" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0" />
        <meta name="theme-color" content="#476E95" />
        <meta name="google-site-verification" content="4IqXj9YLrm5eo3s_c3cTKcAqBwUhCf8qgJgL2sLtJko" />
        <meta name="twitter:description" content={descripcion} />
        <meta name="keywords" value="" />
        <meta name="country" content="COL" />
        <meta name="author" content="pikplay.co" />
        <meta name="copyright" content="pikplay.co" />
        <meta name="language" content="es-CO"></meta>
        <meta httpEquiv="ScreenOrientation" content="autoRotate:disabled" />
        {/* Global site tag (gtag.js) - Google Ads: 941382150 */}
        <link rel="alternate" href={url} hrefLang="es-CO" />
        <link rel="canonical" href={url} />
        <link rel="icon" type="image/png" href="/images/logos/logo48x48.png" />
        <link rel="manifest" href={`/manifest.json`} />
        {() => {
          window.dataLayer = window.dataLayer || [];
          function gtag() { dataLayer.push(arguments); }
          gtag('js', new Date());
          gtag('config', 'AW-941382150');
          gtag('event', 'conversion', { 'send_to': 'AW-941382150/e71oCMvon-0BEIa08cAD' });
        }}()
      </Head>

      <body className="App font-a">
        <MyHeader />
        {false && <div className={styles.announcement}>Actualmente estamos en una versión piloto</div>}
        <main className={styles.principal}>
          <ToastContainer autoClose={5000} hideProgressBar={true}  />
          <Categorias scroll={false} />
          <Subcategories />
          {IS_MOBILE && <MenuMovil />}
          <Notification isOpen={this.context.showNotification} />
          {this.props.children}
          <a target="_BLANK" className="a_whatsapp" href="https://api.whatsapp.com/send?phone=573054202450&text=Hola Pikplay, tengo una consulta sobre los servicios que ofrecen a los Gamers en Colombia">
            <button className={styles["btn-whatsapp"]}>
              <img className={styles["we-are-here"]} src="/images/others/we-are-here.svg" />
              <img src="/images/icons/whatsapp.png" alt="Hablar con un asesor vía Whatsapp" />
            </button>
          </a>
        </main>
        {!this.state.tenemosCookies && (
          <div className="avisoCookies font-c">
            Pikajuegos utiliza cookies para medir el uso del sitio web,
            ofrecerte publicidad relacionada con tus intereses y habilitar
            funciones de redes sociales. Para más información y ajustar tu
            configuración de cookies, haz clic aquí.
            <p>
              <Button className="blue small m-l-10" text="Aceptar" onClick={this.tenemosCookies} />
            </p>
          </div>
        )}
      </body>
    </React.Fragment>
  }
}

export default Layout
