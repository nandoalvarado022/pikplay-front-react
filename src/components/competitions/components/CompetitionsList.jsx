import styles from '../styles.module.scss'

import React, { useEffect, useState } from 'react'
import { useIAStore } from '../../ia/IAstore'
import CompetitionDetail from './Detail'
import Button from '../../button/Button'
import useCompetitions from '../hooks/useCompetitions'

const { motion } = require('framer-motion')

const CompetitionsList = () => {
  const { competitions, getCompetitions } = useCompetitions()
  const [competitionId, setCompetitionId] = useState(0);

  const goToDetail = () => {
    setCompetitionId(1);
  }

  useEffect(() => {
    getCompetitions()
  }, [])

  return <div className={styles.Detail}>
    {competitionId == 0
      ?
      <div>
        <div className={styles.competitionsList}>
          {
            competitions && competitions.map((competition, ind) => (
              <motion.article
                className='Card'
                key={ind}
                initial={{ y: '100%' }}
                onClick={goToDetail}
                whileHover={{ scale: 1.1 }}
                animate={{
                  y: 0,
                }}
              >
                <h2>{competition.title}</h2>
                <div>
                  Números <br />
                  disponibles: {competition.available_numbers}
                </div>
                <p>
                  Organizador: <br />
                  {competition.seller.name}
                </p>
                <img width={200} style={{ right: competition.right }} src={competition.image} />
              </motion.article>
            ))}
        </div>
      </div>
      :
      <div>
        <CompetitionDetail />
        <Button color="blue" onClick={() => setCompetitionId(0)}>Volver</Button>
      </div>
    }
  </div>
}

export default CompetitionsList
