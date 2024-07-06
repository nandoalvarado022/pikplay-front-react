import styles from './styles.module.scss'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Login from '../login/Login'
import { useRouter } from 'next/router'
import Switch from '@mui/material/Switch'
import CoinIcon from '../coinIcon/CoinIcon'
import { IS_MOBILE } from '../../lib/variables'

import useSystemStore from '../../hooks/useSystem'
import { slugify } from '../../lib/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons'
const ProfileImage = dynamic(() => import('../profileImage/ProfileImage'), { ssr: false })

const PreviewUser = () => {
  const { userLogged, logout } = useSystemStore((state => state))
  const [isOpenPreviewProfile, setIsOpenPreviewProfile] = useState(false)
  const router = useRouter()
  const { picture, name } = userLogged

  const handleLogout = () => {
    logout()
    router.push('/?action=logout')
  }

  const handleClickImage = () => {
    setIsOpenPreviewProfile(!isOpenPreviewProfile)
  }

  return (
    <div
      className={`${styles.PreviewUser} PreviewUser ${isOpenPreviewProfile ? styles.actived : null}`}>
      {userLogged.uid ? (
        <div>
          <ProfileImage
            suppressHydrationWarning={true}
            className="previewUser"
            handleClickImage={IS_MOBILE ? handleClickImage : null}
            picture={picture}
          />
          <div className={styles.coins} id="PreviewProfile--Coins">
            <CoinIcon coins={10} />
            {/* <span className={styles.experience}>
              <FontAwesomeIcon icon={faHeartbeat} />
              <span>&nbsp;10/20.500</span>
            </span> */}
          </div>
          <div className={styles.bg_white}></div>
          <div className={styles.bg_black}>
            <ol>
              <Link href={`/perfil/${slugify(name)}`}>
                Mi cuenta
                <br />
                {/* <Coins /> */}
              </Link>
            </ol>
            <ol>
              <Link href='/usuario/me' as='/usuario/me'>
                Soy vendedor
                <br />
                {/* <Coins /> */}
              </Link>
            </ol>
            <ol>
              <Link href='/concursos' as='/concursos'>
                Actividades
              </Link>
            </ol>
            <ol>
              <Link href='/transacciones' as='/transacciones'>
                Transacciones
              </Link>
            </ol>
            <ol>
              <Link href='/publicaciones' as='/publicaciones'>
                Publicaciones
              </Link>
            </ol>
            <ol onClick={() => handleLogout()}>Salir</ol>
            <ol>Configuración</ol>
            <ol>
              Modo nocturno
              <span style={{ float: 'right', marginTop: '-10px' }}>
                <Switch
                  // checked={true}
                  // onChange={ }
                  color="primary"
                  name="checkedB"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              </span>
            </ol>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  )
}

export default PreviewUser
