import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPercentage } from "@fortawesome/free-solid-svg-icons"
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons"
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons"
import Link from "next/link"
import { useState } from "react"
import ImageProfile from "../../pages/perfil/ImageProfile"
import PreviewUser from "../previewUser/PreviewUser"
import UserNotifications from "../userNotifications/UserNotifications"
import styles from "./menuMovil.module.scss"
import { useSelector } from "react-redux"

const MenuMovil = () => {
  const user = useSelector((state) => state.user)
  const [isOpenPreviewProfile, setIsOpenPreviewProfile] = useState(false)
  return <div className={styles.MenuMovil}>
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
      <PreviewUser />
    </ol>
    <ol>
      <Link href="/category/[id]" as="/category/playstation">
        <a>
          <img src="/images/icons/play.svg" alt="Playstation" />
        </a>
      </Link>
    </ol>
    <ol>
      <a target="_BLANK" href="https://api.whatsapp.com/send?phone=573052665725&text=Escribe%20aqu%C3%AD%20tu%20pregunta">
        <FontAwesomeIcon icon={faWhatsapp} />
      </a>
    </ol>
  </div>
}

export default MenuMovil
