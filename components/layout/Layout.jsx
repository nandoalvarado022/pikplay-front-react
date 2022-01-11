import Link from 'next/link'
import Notification from "../notification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons"
import { register } from "next-offline/runtime"
import toastr from "toastr"
import Button from "../button/Button"
import { initGA, logPageView } from "../../public/analytics"
import Router from "next/router"
import NProgress from "nprogress"
import React from "react"
import Header from "../header/Header"
import LogoBuscador from "../logoBuscador/LogoBuscador"
import styles from "./layout.module.scss"
import Categorias from "../categorias/Categorias"
import MenuMovil from "../menuMovil/MenuMovil"
import Subcategories from '../subcategories';
import Head from './Head';

toastr.options.progressBar = true;
toastr.options.timeOut = 5000;

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
    const isMobile = typeof window != "undefined" ? window.screen.width < 420 : false
    const props = this.props
    const { meta_descripcion, meta_title, meta_image } = this.props
    let { meta_url, is_partner, partner } = this.props

    return <React.Fragment>
      {/* <Header />  */}
      <body className="App font-a">
        {/* <Header {...props} /> */}
        <LogoBuscador partner={is_partner ? partner : null} />
        <audio />
        <main className={styles.principal}>
          <Categorias scroll={false} />
          <Subcategories />
          {/* {isMobile && <MenuMovil />} */}
          <Notification isOpen={this.context.showNotification} />
          {props.children}
          <a target="_BLANK" className="a_whatsapp" href="https://api.whatsapp.com/send?phone=573052665725&text=Escribe%20aqu%C3%AD%20tu%20pregunta">
            <button className={styles["btn-whatsapp"]}>
              <span>En cualquier momento puedes escribirnos para solucionar tus dudas</span>
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