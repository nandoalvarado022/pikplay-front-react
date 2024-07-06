/* eslint-disable jsx-a11y/alt-text */
import styles from './challenges.module.scss'

import React, { useState, useEffect } from 'react'
import Skeleton from '@mui/material/Skeleton'
import { getChallengeUserSrv } from '../../services/challenge/challengeService'
import ItemChallenge from './ItemChallenge'

const Challenges = ({ limit }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getChallengeUserSrv(null, { limit }).then(data => {
      setData(data)
      setLoading(false)
    })
  }, [])

  return (
    <section className={styles.ChallengeSection}>
      {/* <div className={styles.challengeHeader}>
        <h3>¡Ve por más!</h3>
        <p>
          ¡Completa desafíos y gana muchos pikcoins! <br />
          Cada dia habrá nuevos desafíos.
        </p>
      </div> */}

      {loading
        ? new Array(3)
          .fill(null)
          .map((_, i) => (<Skeleton key={i} variant="rectangular" width='100%' height={120} className='Card' />))
        : data && data.map((data) => <ItemChallenge {...{ data }} />,
        )}
    </section>
  );
}
export default Challenges
