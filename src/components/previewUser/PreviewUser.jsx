import styles from './styles.module.scss'

import React, { useState, useEffect } from 'react'
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
import Image from 'next/image'
import { faTools } from '@fortawesome/free-solid-svg-icons'
import { faFantasyFlightGames } from '@fortawesome/free-brands-svg-icons'
import { faGamepad } from '@fortawesome/free-solid-svg-icons'
import { faMonero } from '@fortawesome/free-brands-svg-icons'
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons'
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons'
import { faDiceD6 } from '@fortawesome/free-solid-svg-icons'
import { faDiceFive } from '@fortawesome/free-solid-svg-icons'
import { faStore } from '@fortawesome/free-solid-svg-icons'
import { faAlignRight } from '@fortawesome/free-solid-svg-icons'
import { faCity } from '@fortawesome/free-solid-svg-icons'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
const ProfileImage = dynamic(() => import('../profileImage/ProfileImage'), { ssr: false })

const PreviewUser = () => {
  const { userLogged, logout } = useSystemStore((state => state))
  const [isOpenPreviewProfile, setIsOpenPreviewProfile] = useState(false)
  const router = useRouter()
  const { picture, name, coins } = userLogged

  const handleLogout = () => {
    logout()
    router.push('/?action=logout')
  }

  const handleClickImage = () => {
    setIsOpenPreviewProfile(!isOpenPreviewProfile)
  }

  return (
    <div
      className={`${styles.PreviewUser} PreviewUser ${isOpenPreviewProfile ? styles.actived : null}`}
    >
      {userLogged.uid ? (
        <div>
          <ProfileImage
            suppressHydrationWarning={true}
            className="previewUser"
            handleClickImage={IS_MOBILE ? handleClickImage : null}
            picture={picture}
          />
          <div className={styles.coins} id="PreviewProfile--Coins">
            <CoinIcon coins={coins} />
            {/* <span className={styles.experience}>
              <FontAwesomeIcon icon={faHeartbeat} />
              <span>&nbsp;10/20.500</span>
            </span> */}
          </div>
          <div className={styles.bg_white}></div>
          <div id="bg_black" className={styles.bg_black}>
            <ol>
              <Link href={`/perfil/${slugify(name)}`}>
                Mi cuenta
                <div className={styles.coinContent}>
                  <CoinIcon coins={coins} />
                </div>
              </Link>
            </ol>
            <ol>
              <Link href={`/desafios-y-ranking`}>
                <FontAwesomeIcon icon={faGamepad} />
                {/* <Image className={styles.icon} src="/images/icons/ranking.png" width={20} height={20} /> */}
                Desafios y Ranking
              </Link>
            </ol>
            <ol>
              <Link href='/usuario/me' as='/usuario/me'>
                <FontAwesomeIcon icon={faStore} />
                Soy vendedor
                <br />
                {/* <Coins /> */}
              </Link>
            </ol>
            <ol>
              <Link href='/concursos' as='/concursos'>
                <FontAwesomeIcon icon={faDiceFive} />
                Actividades
              </Link>
            </ol>
            <ol>
              <Link href='/transacciones' as='/transacciones'>
                <FontAwesomeIcon icon={faMoneyBill} />
                Transacciones
              </Link>
            </ol>
            <ol>
              <Link href='/publicaciones' as='/publicaciones'>
                Mis Publicaciones
              </Link>
            </ol>
            <ol>
              <a>
                <FontAwesomeIcon icon={faTools} />
                Configuración
              </a>
            </ol>
            <ol>
              <a>
                <FontAwesomeIcon icon={faCity} />
                Modo nocturno
                <span style={{ marginLeft: '20px' }}>
                  <Switch
                    // checked={true}
                    // onChange={ }
                    color="primary"
                    name="checkedB"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                </span>
              </a>
            </ol>
            <ol onClick={() => handleLogout()}>
              <a>
                <FontAwesomeIcon icon={faPowerOff} />
                Salir
              </a>
            </ol>
          </div>
          <div className={styles.elementToCloseBgBlack} onClick={() => setIsOpenPreviewProfile(false)}></div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  )
}

export default PreviewUser
