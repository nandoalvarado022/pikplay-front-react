import styles from './styles.module.scss'

import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Login from '../login/Login'
import CoinIcon from '../coinIcon/CoinIcon'
import { IS_MOBILE } from '../../lib/variables'
import useSystemStore from '../../hooks/storeSystem'
import { Email } from '@mui/icons-material'
import { AlternateEmail } from '@mui/icons-material'
import NotificationsNewIcon from '../notificationsNewIcon/NotificationsNewIcon'
const ProfileImage = dynamic(() => import('../profileImage/ProfileImage'), { ssr: false })
const MenuMobileOptions = dynamic(() => import('./MenuMobileOptions'), { ssr: false })

const PreviewUser = () => {
  const { userLogged } = useSystemStore((state => state))
  const [isOpenPreviewProfile, setIsOpenPreviewProfile] = useState(false)
  const { picture, name, coins } = userLogged || {}

  const handleClickImage = () => {
    setIsOpenPreviewProfile(!isOpenPreviewProfile)
  }

  return (
    <div
      className={`${styles.PreviewUser} PreviewUser ${isOpenPreviewProfile ? styles.actived : null}`}>
      {userLogged?.uid ? (
        <div>
          <ProfileImage
            suppressHydrationWarning={true}
            className="previewUser"
            handleClickImage={IS_MOBILE ? handleClickImage : null}
            picture={picture} />
          <NotificationsNewIcon />
          <div className={styles.coins} id="PreviewProfile--Coins">
            <CoinIcon coins={coins} />
            {/* <span className={styles.experience}>
              <FontAwesomeIcon icon={faHeartbeat} />
              <span>&nbsp;10/20.500</span>
            </span> */}
          </div>
          <div className={styles.bg_white}></div>
          {isOpenPreviewProfile && <MenuMobileOptions />}
          <div className={styles.elementToCloseBgBlack} onClick={() => setIsOpenPreviewProfile(false)}></div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  )
}

export default PreviewUser
