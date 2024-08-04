import styles from './challenges.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import Button from '../button/Button'
import Image from 'next/image'
import CoinIcon from '../coinIcon/CoinIcon'
import useSystemStore from '../../hooks/storeSystem'
import Router from 'next/router'

const ItemChallenge = (props) => {
  const { data } = props
  const { userLogged, setStoreValue } = useSystemStore(state => state)
  const { data: {
    buttonText,
    isCompleted,
    coins,
    detail,
    height,
    id,
    image,
    linkBeforeCompleted,
    buttonAfterCompleted,
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
  const labelButton = "Obtener recompensa"

  const handleReclamar = () => {
    userLogged.uid
      ? isCompleted
        ? setStoreValue('isAwardsSummaryModalOpen', true)
        : Router.push(linkBeforeCompleted)
      : document.querySelector('#btnStart').click()
  }

  return <article key={id} className={`${!isCompleted ? 'dark' : ''} ${starsEffect ? 'starsFallingDown' : ''} ${styles.challenge}`}>
    {/* <picture className={styles.image}>
            <img className={styles.image} src={image} />
        </picture> */}
    <div className={styles.challengeDetails}>
      <h4 className={`shadow-text ${styles.challengeTitle}`}>
        {title}
        {/* {isCompleted && <FontAwesomeIcon icon={faCheck} className={`icon ${styles.challengeCompleteIcon}`} />} */}
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
      <b className='shadow-text'>Recompensa</b>
      {reward == 'coins' && <div className={styles.coins}>
        <CoinIcon coins={coins} multicoin />
      </div>}
      {reward != 'coins' && <div className={`shine animatedZoom ${styles.rewardImage}`}>
        <Image src={rewardImage} alt={reward} width={width} height={height} />
      </div>}
      <Button
        shine
        realistic
        className={styles.btnReclamar}
        color='blue'
        onClick={handleReclamar}>
        {buttonText ? buttonText : labelButton}
      </Button>
    </div>
  </article>
}

export default ItemChallenge
