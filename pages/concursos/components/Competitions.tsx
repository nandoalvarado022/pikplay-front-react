// @ts-nocheck

import React, { useState } from 'react'
import { useIAStore } from '../../../src/store/IA'
import CompetitionDetail from './Detail'
import styles from '../styles.module.scss'
import Button from '../../../src/components/button/Button'

const { motion } = require('framer-motion')

const competitionsList = [
  {
    availableNumbers: 10,
    author: {
      name: "Juan Perez",
    },
    image: "/images/others/ps5.png",
    title: "Rifa de Nintendo Switch Oled 2024 + 2 juegos a elección",
    right: "-80px"
  },
  {
    availableNumbers: 87,
    author: {
      name: "Juancho Fenix",
    },
    image: "/images/others/control-switch.png",
    title: "Control Joy-Con - Rojo Neón y Azul Neón",
    right: "-120px"
  }
]

const CompetitionsList = () => {
  const [competitionId, setCompetitionId] = useState<number>(0);
  const goToDetail = () => {
    setCompetitionId(1);
  }

  return <div className={styles.Detail}>
    {competitionId == 0
      ?
      <div>
        <div className={styles.competitionsList}>
          {
            competitionsList.map((competition, ind) => (
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
                  disponibles: {competition.availableNumbers}
                </div>
                <p>
                  Organizador: <br />
                  {competition.author.name}
                </p>
                <img width={200} style={{ right: competition.right }} src={competition.image} />
              </motion.article>
            ))}
        </div>
      </div>
      :
      <div>
        <Button color="blue" onClick={() => setCompetitionId(0)}>Volver</Button>
        <CompetitionDetail />
      </div>
    }
  </div>
}

type NumberBoxProps = {
  name: string;
  status: string;
}

export default CompetitionsList
