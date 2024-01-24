import React, { useEffect } from 'react'
import { Link, Tooltip } from '@mui/material'
import Zoom from '@mui/material/Zoom'
import { animatePrince } from '../../../src/lib/utils'
import classNames from 'classnames'
import CoinIcon from '../coinIcon/CoinIcon'
import Insignias from '../insignias/Insignias'
import Insignia from '../insignias/Insignia'
import ProfileImage from '../profileImage/ProfileImage'
import styles from './styles.module.scss'

const ProfileSummaryExperience = (props) => {
    const { gainExperience } = props
    const gainedCoins = 5
    const currentUserCoins = 10

    useEffect(() => {
        const element = document.querySelector('.ProfileSummaryExperience .number-coins')
        const fromNumber = element?.innerHTML
        const targetNumber = currentUserCoins + gainedCoins
        animatePrince(element, targetNumber, fromNumber)
    }, [])

    return (
        <div className={classNames("ProfileSummaryExperience", { [styles.ProfileSummaryExperience]: true })}>
            <div>
                <div className={styles.full_name}>
                    <span>Nandosqui</span>
                    <div className={styles.icons}>
                        <Tooltip title="Plataforma más utilizada">
                            <img width={40} className={styles.platform} src="/images/icons/ps-icon.png" />
                        </Tooltip>
                        <Insignia data={{ id: "second", name: "On fire" }} />
                    </div>
                </div>
                <div className={styles.box}>
                    <div className={styles.bg}></div>
                    <div className={styles.left}>
                        <ProfileImage />
                        <br />
                        <div className={styles.experience_status}>
                            <ExperienceBar />
                        </div>
                        <CoinIcon coins={10} textColor="white" />
                        <Insignias />
                    </div>
                    <div className={styles.right}>

                        <div className={styles.fields}>
                            <span className={styles.label}>
                                <div className={styles.name}>Categoria</div>
                                Bronce
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

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileSummaryExperience

const ExperienceBar = () => {
    const widthBar = "55%";
    useEffect(() => {
        document.querySelector('.ExperienceBar .indicator').style.width = widthBar
    }, [])

    return (
        <div className={classNames("ExperienceBar", { [styles.ExperienceBar]: true })}>
            <div className={styles.bar}>
                <div className={classNames("indicator", { [styles.indicator]: true })}>
                    <label>
                        <span className='number'>154</span>
                        &nbsp;/ 1000 EXP
                    </label>
                </div>
            </div>
        </div>
    )
}