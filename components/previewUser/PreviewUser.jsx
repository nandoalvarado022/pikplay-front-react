import Router from "next/router"
import Link from "next/link"
import React from "react"
import Coins from './Coins'
import styles from "./styles.module.scss"
import UserNotifications from '../userNotifications/UserNotifications'
import { useSelector, useDispatch } from "react-redux"

const PreviewUser = (props) => {
  const dispatch = useDispatch()
  const notifications = useSelector((state) => state.notifications)
  const user = useSelector((state) => state.user)
  const { isOpenPreviewProfile, setIsOpenPreviewProfile } = props
  const isMobile = typeof window != "undefined" ? window.screen.width < 420 : false

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
    Router.push('/?logout')
  }

  return <div className={`${styles.PreviewUser} PreviewUser ${isOpenPreviewProfile ? styles.actived : null}`}>
    {!isMobile && <UserNotifications />}
    <ol>
      <Link href="/perfil" as="/perfil">
        <a>
          Mi cuenta<br />
          <Coins />
        </a>
      </Link>
    </ol>
    <ol onClick={() => setIsOpenPreviewProfile(false)}>
      <Link href="/perfil#notificaciones" as="/perfil#notificaciones">
        Notificaciones
      </Link>
      {isMobile && <span className={styles.notyQuantity}>
        {notifications.length}
      </span>}
    </ol>
    <ol>
      <Link href="/transacciones" as="/transacciones">
        Transacciones
      </Link>
    </ol>
    <ol>
      <Link href="/publicaciones" as="/publicaciones">
        <a>Publicaciones</a>
      </Link>
    </ol>
    <ol onClick={() => handleLogout()}>
      Salir
    </ol>
  </div>
}

export default PreviewUser
