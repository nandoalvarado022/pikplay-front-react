import styles from './challenges.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import Button from '../button/Button'
import Image from 'next/image'
import CoinIcon from '../coinIcon/CoinIcon'

const ItemChallenge = (props) => {
    const { data } = props
    const { data: {
        buttonText,
        completed,
        coins,
        detail,
        height,
        id,
        image,
        reward,
        rewardImage,
        starsEffect,
        target,
        title,
        width,
    } } = props
    if (!data) return <></>
    const maxCharacteres = 50
    const isDescriptionExtended = (detail.trim().length) > maxCharacteres
    const shortedDetail = isDescriptionExtended ? detail.substring(0, maxCharacteres) : false

    return <article key={id} className={`${!completed ? 'dark' : ''} ${starsEffect ? 'starsFallingDown' : ''} ${styles.challenge}`}>
        {/* <picture className={styles.image}>
            <img className={styles.image} src={image} />
        </picture> */}
        <div className={styles.challengeDetails}>
            <h4 className={`shadow-text ${styles.challengeTitle}`}>
                {title}
                {/* {completed && <FontAwesomeIcon icon={faCheck} className={`icon ${styles.challengeCompleteIcon}`} />} */}
            </h4>
            {target > 1 && <div className={styles.progressContainer}>
                <span className={styles.progressBar}
                    style={{ width: `calc((100% * 1) / 5)` }}></span>
                <span className={`${styles.progressScore} shadow-text`}>
                    1/5
                </span>
            </div>}
            <p className={styles.challengeDescription}>
                {isDescriptionExtended ? shortedDetail : detail}
                {isDescriptionExtended ? '...' : ''}
            </p>
            {/* <p>
                {' '}
                Expires on: {''}
                <span className={styles.deadLine}>
                    Miercoles
                </span>
            </p> */}
        </div>

        <div className={styles.rewardsContent}>
            <b className='shadow-text'>Recompensas</b>
            {reward == 'coins' && <div className={styles.coins}>
                <CoinIcon coins={coins} multicoin />
            </div>}
            {reward != 'coins' && <div className={`shine animatedZoom ${styles.rewardImage}`}>
                <Image src={rewardImage} alt={reward} width={width} height={height} />
            </div>}
            <Button
                realistic
                className={styles.btnReclamar}
                color='blue'>
                {buttonText ? buttonText : 'Reclamar'}
            </Button>
        </div>
    </article>
}

export default ItemChallenge
