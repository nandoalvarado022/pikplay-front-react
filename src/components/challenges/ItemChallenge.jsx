import styles from './challenges.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import Button from '../button/Button'
import Image from 'next/image'
import CoinIcon from '../coinIcon/CoinIcon'

const ItemChallenge = (props) => {
    const { data } = props
    const { data: {
        completed,
        detail,
        height,
        id,
        image,
        reward,
        rewardImage,
        target,
        title,
        width,
    } } = props
    if (!data) return <></>
    return <article key={id} className={`${styles.challenge}`}>
        {/* <picture className={styles.image}>
            <img className={styles.image} src={image} />
        </picture> */}
        <div className={styles.challengeDetails}>
            <h4 className={`shadow-text ${styles.challengeTitle}`}>
                {title}
                {completed && <FontAwesomeIcon icon={faCheck} className={styles.challengeCompleteIcon} />}
            </h4>
            {target > 1 && <div className={styles.progressContainer}>
                <span
                    className={styles.progressBar}
                    style={{ width: `calc((100% * 1) / 5)` }}></span>
                <span className={`${styles.progressScore} shadow-text`}>
                    1/5
                </span>
            </div>}
            <p className={styles.challengeDescription}>
                {detail}
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
                <CoinIcon coins={14} />
            </div>}
            {reward != 'coins' && <div className={`shine ${styles.rewardImage}`}>
                <Image src={rewardImage} alt={reward} width={width} height={height} />
            </div>}
            <Button
                className={styles.btnReclamar}
                color='blue'>
                Reclamar
            </Button>
        </div>
    </article>
}

export default ItemChallenge
