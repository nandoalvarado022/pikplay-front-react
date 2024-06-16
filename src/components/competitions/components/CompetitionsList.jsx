import styles from '../styles.module.scss'

import React, { useEffect, useState } from 'react'
import CompetitionDetail from './CompetitionDetail'
import CompetitionItem from './CompetitionItem'
import Marquee from './Marquee'

const CompetitionsList = ({ competitions, handleCompetitionClick }) => {
  return <div className={styles.CompetitionsList}>
    {/* Competitions: {JSON.stringify(competitions)} */}
    <div className={styles.content}>
      <div className={styles.ads}>
        <div className={styles.item} onClick={() => handleCompetitionClick({ id: 1 })}>
          <img src="/images/banners/banner-02.png" />
        </div>
        <div className={styles.item}>
          <img src="/images/banners/banner-04.png" />
        </div>
      </div>
      <div className={styles.news}>
        <span>Últimos movimientos:</span>
        <Marquee />
      </div>
      <div className={`${styles.list} flex`}>
        <div className={`${styles.active}`}>
          <h3>ACTIVOS</h3>
          {competitions && competitions
            .filter(item => item.isActive == true)
            .map((competition, ind) => (
              <CompetitionItem {...{ ind, competition, handleCompetitionClick }} />
            ))}
        </div>
        <div className={`${styles.done}`}>
          <h3>PASADOS</h3>
          {/* {competitions && competitions
            .filter(item => item.isActive == false)
            .map((competition, ind) => (
              <CompetitionItem {...{ ind, competition, handleCompetitionClick }} />
            ))} */}
        </div>
      </div>
    </div>
  </div>
}

export default CompetitionsList
