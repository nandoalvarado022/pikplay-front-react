const { motion } = require("framer-motion")
import Link from "next/link"
import PreviewUser from "../previewUser/PreviewUser"
import styles from "./menuMovil.module.scss"
import { useSelector } from "react-redux"

const MenuMovil = () => {
  const user = useSelector((state) => state.user)
  return <div className={styles.MenuMovil}>
    <ol>
      <Link href="/publicacion/crear" as="/publicacion/crear">
        <motion.a className={styles.vender}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}>
          <img style={{ height: '38px' }} src="https://icons.veryicon.com/png/o/miscellaneous/very-thin-linear-icon/camera-310.png" alt="" />
        </motion.a>
      </Link>
    </ol>
    <ol>
      <Link href="/categoria/[id]" as="/categoria/nintendo-switch">
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}>
          <img src="/images/icons/nintendo.svg" alt="Nintendo switch" />
        </motion.a>
      </Link>
    </ol>
    <ol>
      <PreviewUser />
    </ol>
    <ol>
      <Link href="/categoria/[id]" as="/categoria/playstation">
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}>
          <img src="/images/icons/play.svg" alt="Playstation" />
        </motion.a>
      </Link>
    </ol>
    <ol>
      <motion.a target="_BLANK" href="https://api.whatsapp.com/send?phone=573054202450&text=Escribe%20aqu%C3%AD%20tu%20pregunta"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.8 }}>
        <img src="https://www.iconpacks.net/icons/1/free-whatsapp-icon-103-thumb.png" />
      </motion.a>
    </ol>
  </div>
}

export default MenuMovil
