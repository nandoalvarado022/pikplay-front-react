import styles from '../competitions.module.scss'

import React, { useEffect, useState } from 'react'
import CompetitionItem from './CompetitionItem'
import Marquee from './Marquee'
import Joyride from 'react-joyride'

const CompetitionsList = ({ competitions }) => {
  const steps = [{
    target: '#activitiesList',
    content: 'Te presentamos los concursos Activos!, aquí podras participar para ganar consolas, juegos y mucho más!',
  },
  {
    target: '#adsItems',
    content: 'Esto es un acceso directo a los concursos más vistos, no te los pierdas!',
  }]

  return <div className={styles.CompetitionsList}>
    {/* <Joyride
      showProgress
      showSkipButton
      steps={steps}
      styles={{
        options: {
          zIndex: 10000,
        },
      }} /> */}
    {/* Competitions: {JSON.stringify(competitions)} */}
    <div className={styles.content}>
      <div id="adsItems" className={styles.ads}>
        <div className={styles.item}>
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
          {competitions && competitions
            .filter(item => item.isActive == true)
            .map((competition, ind) => (
              <CompetitionItem {...{ ind, competition }} />
            ))}
        </div>
      </div>
    </div>
  </div>
}

export default CompetitionsList
