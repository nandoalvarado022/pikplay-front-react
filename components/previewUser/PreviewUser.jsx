import React, { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { useSelector, useDispatch } from "react-redux"
import UserNotifications from '../userNotifications/UserNotifications'
import ImageProfile from '../../pages/perfil/ImageProfile'
import Login from "../login/Login"
import styles from "./styles.module.scss"

const PreviewUser = () => {
  const dispatch = useDispatch()
  const notifications = useSelector((state) => state.notifications)
  const [isOpenPreviewProfile, setIsOpenPreviewProfile] = useState(false)
  const isMobile = typeof window != "undefined" ? window.screen.width < 420 : false
	const router = useRouter()
  const user = useSelector((state) => state.user)
  const _notifications = notifications.filter(item => item.closed == 0)

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
    router.push('/#logout')
  }

  const handleClickImage = () => {
    setIsOpenPreviewProfile(!isOpenPreviewProfile)
  }

  return <div className={`${styles.PreviewUser} PreviewUser ${isOpenPreviewProfile ? styles.actived : null}`}>
    {
      user.id != 0 ? <React.Fragment>
        <ImageProfile handleClickImage={isMobile ? handleClickImage : null} />
        <span className={styles.notyQuantity}>
          {_notifications.length}
        </span>
        <div className={styles.bg_black}>
          {!isMobile && <UserNotifications />}
          <ol>
            <Link href="/perfil" as="/perfil">
              <a>
                Mi cuenta<br />
                {/* <Coins /> */}
              </a>
            </Link>
          </ol>
          <ol onClick={() => setIsOpenPreviewProfile(false)}>
            <Link href="/perfil#notificaciones" as="/perfil#notificaciones">
              Notificaciones
            </Link>
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
      </React.Fragment>
        :
        <Login />
    }
  </div>
}

export default PreviewUser
