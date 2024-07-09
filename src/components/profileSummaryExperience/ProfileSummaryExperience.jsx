import styles from './styles.module.scss'

import React, { useEffect, useState } from 'react'
import { Link, Tooltip } from '@mui/material'
import Zoom from '@mui/material/Zoom'
import { animatePrince, formatNumber } from '../../lib/utils'
import classNames from 'classnames'
import CoinIcon from '../coinIcon/CoinIcon'
import Insignias from '../insignias/Insignias'
import Insignia from '../insignias/Insignia'
import ProfileImage from '../profileImage/ProfileImage'
import useSystemStore from '../../hooks/useSystem'
import { getExperiencesSrv } from '../../services/user/userService'
import Character from '../ia/IACharacter'
import PreviewCharacter from '../ia/IACharacter'
import { useIAStore } from '../ia/IAstore'

const ProfileSummaryExperience = (props) => {
  const { isUserLogued, userInfoData, showDetails } = props
  const gainedCoins = 5
  const currentUserCoins = 10
  const { userLogged } = useSystemStore()
  const {
    backgroundColor,
    exp,
    insignia,
    name,
    picture,
    coins,
  } = isUserLogued ? userLogged : userInfoData

  useEffect(() => {
    const element = document.querySelector('.ProfileSummaryExperience .number-coins')
    const fromNumber = element?.innerHTML
    const targetNumber = currentUserCoins + gainedCoins
    animatePrince(element, targetNumber, fromNumber)
  }, [])

  const {
    IAExpression,
  } = useIAStore((state => state))

  return (
    <div className={classNames("ProfileSummaryExperience", { [styles.ProfileSummaryExperience]: true })}>
      <div>
        <div className={styles.full_name}>
          <span>{name}</span>
          {/* <div className={styles.icons}>
            <Tooltip title="Plataforma más utilizada">
              <img width={40} className={styles.platform} src="/images/icons/ps-icon.png" />
            </Tooltip>
          </div> */}
        </div>
        <div className={styles.box} style={{ background: backgroundColor }}>
          <div className={styles.bg}></div>
          <div className={styles.left}>
            <ProfileImage picture={picture} />
            <br />
            <div className={styles.experience_status}>
              <ExperienceBar {...{ exp }} />
            </div>
            <Insignias title="Insignia Favorita" favoriteInsignia={insignia} />
          </div>
          {showDetails && <div className={styles.right}>
            <div className={styles.fields}>
              <span className={styles.label}>
                <div className={styles.name}>Categoria</div>
                Bronce
              </span>
              <span className={styles.label}>
                <div className={styles.name}>Pikcoins</div>
                <CoinIcon coins={coins} />
              </span>
              <span className={styles.label}>
                <div className={styles.name}>Nivel</div>
                21
              </span>
              <span className={styles.label}>
                <div className={styles.name}>Compras</div>
                5
              </span>
              <span className={styles.label}>
                <div className={styles.name}>Ventas</div>
                2
              </span>
              <span className={styles.label}>
                <div className={styles.name}>Antiguedad</div>
                4 meses
              </span>
              <Tooltip TransitionComponent={Zoom} title="Última conexión">
                <span className={styles.label}>
                  <div className={styles.name}>U.C.</div>
                  Ayer
                </span>
              </Tooltip>
            </div>
          </div>}
        </div>
      </div>
    </div>
  )
}

export default ProfileSummaryExperience

const ExperienceBar = (props) => {
  const { exp } = props;
  const [currentExp, setCurrentExp] = useState(exp)
  const [widtBar, setWidthBar] = useState("0%")

  useEffect(() => {
    // getExperiencesSrv()
    //   .then(data => {
    //     const { expTotal } = data
    //     setCurrentExp(expTotal)
    //     const widthBar = (expTotal / 10000) * 100;
    //     setWidthBar(widthBar + "%")
    //   });
    const widthBar = (exp / 1000) * 100;
    setWidthBar(widthBar + "%")
  }, [])

  return (
    <div className={classNames("ExperienceBar", { [styles.ExperienceBar]: true })}>
      <div className={styles.bar}>
        <div className={classNames("indicator", { [styles.indicator]: true })} style={{ width: widtBar }}>
          <label>
            <span className='number'>{formatNumber(currentExp)}</span>
            &nbsp;/ 1.000 EXP
          </label>
        </div>
      </div>
    </div>
  )
}