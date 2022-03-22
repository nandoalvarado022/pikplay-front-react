const { motion } = require("framer-motion")
import ImageProfile from "../../pages/perfil/ImageProfile"
import Link from "next/link"
import PreviewUser from "../previewUser/PreviewUser"
import UserNotifications from "../userNotifications/UserNotifications"
import styles from "./menuMovil.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPercentage } from "@fortawesome/free-solid-svg-icons"
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons"
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons"
import { useSelector } from "react-redux"
import { useState } from "react"

const MenuMovil = () => {
  const user = useSelector((state) => state.user)
  const [isOpenPreviewProfile, setIsOpenPreviewProfile] = useState(false)
  return <div className={styles.MenuMovil}>
    <ol>
      <Link href="/publicacion/crear" as="/publicacion/crear">
        <motion.a className={styles.vender}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}>
          <FontAwesomeIcon icon={faPlusSquare} />
        </motion.a>
      </Link>
    </ol>
    <ol>
      <Link href="/category/[id]" as="/category/nintendo-switch">
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}>
          <img src="/images/icons/nintendo.svg" alt="Nintendo switch" />
        </motion.a>
      </Link>
    </ol>
    <ol onClick={() => setIsOpenPreviewProfile(!isOpenPreviewProfile)}>
      <PreviewUser />
    </ol>
    <ol>
      <Link href="/category/[id]" as="/category/playstation">
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}>
          <img src="/images/icons/play.svg" alt="Playstation" />
        </motion.a>
      </Link>
    </ol>
    <ol>
      <motion.a target="_BLANK" href="https://api.whatsapp.com/send?phone=573052665725&text=Escribe%20aqu%C3%AD%20tu%20pregunta"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.8 }}>
        <FontAwesomeIcon icon={faWhatsapp} />
      </motion.a>
    </ol>
  </div>
}

export default MenuMovil
