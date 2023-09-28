import React, { useState } from 'react'
const { IS_MOBILE } = VARS
import ImageProfile from '../imageProfile/ImageProfile'
import Link from 'next/link'
import Login from '../login/Login'
import UserNotifications from '../userNotifications/UserNotifications'
import VARS from '../../lib/variables'
import styles from './styles.module.scss'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'

const PreviewUser = () => {
  const dispatch = useDispatch()
  const notifications = useSelector(state => state.notifications)
  const [isOpenPreviewProfile, setIsOpenPreviewProfile] = useState(false)
  const router = useRouter()
  const user = useSelector(state => state.user)
  const _notifications = notifications.filter(item => item.closed == 0)

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
    router.push('/?action=logout')
  }

  const handleClickImage = () => {
    setIsOpenPreviewProfile(!isOpenPreviewProfile)
  }

  return (
    <div
      className={`${styles.PreviewUser} PreviewUser ${
        isOpenPreviewProfile ? styles.actived : null
      }`}
    >
      {user.id != 0 ? (
        <React.Fragment>
          <ImageProfile
            handleClickImage={IS_MOBILE ? handleClickImage : null}
          />
          <span className={styles.notyQuantity}>{_notifications.length}</span>
          <div className={styles.bg_white}></div>
          <div className={styles.bg_black}>
            {!IS_MOBILE && <UserNotifications />}
            <ol>
              <Link href='/perfil' as='/perfil'>
                <a>
                  Mi cuenta
                  <br />
                  {/* <Coins /> */}
                </a>
              </Link>
            </ol>
            <ol>
              <Link href='/usuario/me' as='/usuario/me'>
                <a>
                  Soy vendedor
                  <br />
                  {/* <Coins /> */}
                </a>
              </Link>
            </ol>
            <ol>
              <Link href='/transacciones' as='/transacciones'>
                Transacciones
              </Link>
            </ol>
            <ol>
              <Link href='/publicaciones' as='/publicaciones'>
                <a>Publicaciones</a>
              </Link>
            </ol>
            <ol onClick={() => handleLogout()}>Salir</ol>
          </div>
        </React.Fragment>
      ) : (
        <Login />
      )}
    </div>
  )
}

export default PreviewUser
