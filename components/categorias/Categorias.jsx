import React, { useState } from "react"
import Link from "next/link"
import Login from "../login/Login"
import styles from "./categorias.module.scss"
import { getCategories, slugify } from "../../lib/utils"
import PreviewUser from "../previewUser/PreviewUser"
import ImageProfile from '../../pages/perfil/ImageProfile'
import { useSelector } from "react-redux"

const Categorias = (props) => {
  const user = useSelector((state) => state.user)
  const { notifications = [], scroll } = props
  const [isOpenPreviewProfile, setIsOpenPreviewProfile] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const _notifications = notifications.filter(item => item.closed == 0)

  return <div className={styles.Categorias}>
    <ul>
      {/* <li filter="game">
        <Link scroll={scroll} href="/">
          Ver todo
        </Link>
      </li> */}
      <li className={styles["crear-publicacion"]} >
        <Link href="/publicacion/crear" as="/publicacion/crear">
          <a>
            {/* <img src="/images/icons/mas.svg" alt="Crear publicacion" /> */}
            Vender
          </a>
        </Link>
      </li>
      {
        getCategories().map((category) => {
          const image = category.image ? category.image : "/images/icons/" + category.id + ".png"
          return <li filter="game">
            <Link scroll={scroll} href="/category/[id]" as={"/category/" + slugify(category.name)}>
              <a>
                <img src={image} alt={category.name} />
                {category.name}
              </a>
            </Link>
          </li>
        })
      }

      {
        user.id != 0 ? <React.Fragment>
          <li>
            <ImageProfile {...{ isOpenPreviewProfile, setIsOpenPreviewProfile }} />
            <span className={styles.notyQuantity}>
              {_notifications.length}
            </span>
            <PreviewUser {...{ isOpenPreviewProfile, setIsOpenPreviewProfile }} />
          </li>
        </React.Fragment>
          :
          <Login />
      }
    </ul>
  </div >
}

export default Categorias
