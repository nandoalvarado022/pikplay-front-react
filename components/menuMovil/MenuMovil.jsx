import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPercentage } from "@fortawesome/free-solid-svg-icons"
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons"
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons"
import Link from "next/link"
import { useContext, useState } from "react"
import ImageProfile from "../../pages/perfil/ImageProfile"
import PreviewUser from "../previewUser/PreviewUser"
import UserNotifications from "../userNotifications/UserNotifications"
import styles from "./menuMovil.module.scss"
// import { PikContext } from "../../states/PikState"

const MenuMovil = () => {
  const context = useContext(PikContext)
  const [isOpenPreviewProfile, setIsOpenPreviewProfile] = useState(false)
  return <div className={styles.MenuMovil}>
    {context.user.id != 0 && <PreviewUser {...{ isOpenPreviewProfile, setIsOpenPreviewProfile }} />}
    <ol>
      <Link href="/publicacion/crear" as="/publicacion/crear">
        <a className={styles.vender}>
          <FontAwesomeIcon icon={faPlusSquare} />
        </a>
      </Link>
    </ol>
    <ol>
      <Link href="/category/[id]" as="/category/nintendo-switch">
        <a>
          <img src="/images/icons/nintendo.svg" alt="Nintendo switch" />
        </a>
      </Link>
    </ol>
    <ol onClick={() => setIsOpenPreviewProfile(!isOpenPreviewProfile)}>
      {context.user.id != 0 && <ImageProfile />}
      {context.user.id == 0 && <div onClick={() => document.getElementById("btnStart").click()}>
        <img src="/images/icons/user.png" alt="Login" />
      </div>}
    </ol>
    {/* <ol>
      {context.user.id != 0 && <UserNotifications />}
    </ol> */}
    <ol>
      <Link href="/category/[id]" as="/category/playstation">
        <a>
          <img src="/images/icons/play.svg" alt="Playstation" />
        </a>
      </Link>
    </ol>
    <ol>
      <a target="_BLANK" href="https://api.whatsapp.com/send?phone=573052665725&text=Escribe%20aqu%C3%AD%20tu%20pregunta">
        {/* <button className={styles["btn-whatsapp"]}> */}
        <FontAwesomeIcon icon={faWhatsapp} />
        {/* <img src="/images/icons/whatsapp.png" alt="Hablar con un asesor vía Whatsapp" /> */}
        {/* </button> */}
        {/* <label>Ayuda</label> */}
      </a>
    </ol>
  </div>
}

export default MenuMovil