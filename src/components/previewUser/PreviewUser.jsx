import styles from './styles.module.scss'

import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Login from '../login/Login'
import { useRouter } from 'next/router'
import Switch from '@mui/material/Switch'
import { styled } from '@mui/material/styles';
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
import { FormControlLabel } from '@mui/material'
const ProfileImage = dynamic(() => import('../profileImage/ProfileImage'), { ssr: false })

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

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
              <FormControlLabel
                control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
                label="Modo nocturno"
              />
              {/* <Switch
                    // checked={true}
                    // onChange={ }
                    color="primary"
                    name="checkedB"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  /> */}
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
