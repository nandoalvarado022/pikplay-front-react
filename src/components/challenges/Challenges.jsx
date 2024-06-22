/* eslint-disable jsx-a11y/alt-text */
import styles from './challenges.module.scss'

import React, { useState, useEffect } from 'react'
import Skeleton from '@mui/material/Skeleton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import Button from '../button/Button'
import Image from 'next/image'
import { getChallengeUserSrv } from '../../services/challenge/challengeService'

const Challenges = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getChallengeUserSrv().then(data => {
      setData(data)
      setLoading(false)
    })
  }, [])

  const Item = (props) => {
    // debugger;
    const { data: { completed, detail, id, image, title } } = props
    if (!data) return <></>
    return <article key={id} className={`${styles.challenge}`}>
      {completed && <FontAwesomeIcon icon={faCheck} className={styles.challengeCompleteIcon} />}
      <picture className={styles.image}>
        <img className={styles.image} src={image} />
      </picture>
      <div className={styles.challengeDetails}>
        <h4 className={styles.challengeTitle}>{title}</h4>
        <div className={styles.progressContainer}>
          <span
            className={styles.progressBar}
            style={{
              width: `calc((100% * 12) / 40)`,
            }}></span>
          <span className={styles.progressScore}>
            12/40
          </span>
        </div>
        <p>{detail}</p>
        <p>
          {' '}
          Expires on: {''}
          <span className={styles.deadLine}>
            Miercoles
          </span>
        </p>
      </div>

      <div>
        <div className={styles.coins_wrapper}>
          {/* <Coins coins={prizeCoins} /> */}
        </div>
        <Button
          className={styles.btnReclamar}
          color='blue'>
          Reclamar
        </Button>
      </div>
    </article>
  }

  return (
    <section className={styles.ChallengeSection}>
      <div className={styles.challengeHeader}>
        <h3>¡Ve por más!</h3>
        <p>
          ¡Completa desafíos y gana muchos pikcoins! <br />
          Cada dia habrá nuevos desafíos.
        </p>
      </div>

      {loading
        ? new Array(3)
          .fill(null)
          .map((_, i) => (<Skeleton key={i} variant="rectangular" width='100%' height={120} className='Card' />))
        : data.map((data) => <Item {...{ data }} />,
        )}
    </section>
  );
}
export default Challenges
