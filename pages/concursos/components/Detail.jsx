import React, { useEffect, useState } from 'react'
import { useIAStore } from '../../../src/store/IA'
import { Tooltip } from '@mui/material'
import styles from '../styles.module.scss'
import { set } from 'nprogress'

const CompetitionDetail = () => {
  const {
    setIsvisible,
    handleUserMessage
  } = useIAStore((state => state))

  const quantityNumbers = 100;
  const [numbersList, setNumbersList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const handleClick = (number) => {
    setIsvisible(true)
    handleUserMessage('competition')
  }

  useEffect(() => {
    const numbersListTemplate = Array.from({ length: quantityNumbers }, (_, i) => i + 1).map((number) => (
      { name: '', status: 'available', isPaid: false, number: null }
    ));
    const _numbersList = [...numbersListTemplate]
    fetch('http://localhost/api', {
      headers: {
        'operation-name': 'competitionDetail',
      }
    })
      .then(data => data.json())
      .then(({ data }) => {
        data.map(item => {
          _numbersList[item.number] = item
        })
        setNumbersList(_numbersList)
        setIsLoading(false)
      })
  }, [])

  return <div className={styles.CompetitionDetail}>
    <p>
      <div>Organiza: <b>BluePanther's</b></div>
      <div>Premio: Playstation 5</div>
      <div>Liberacion de cupos el sábado a las 2PM</div>
      <div>Total cupos restantes: 34</div>
      <div>Valor de la boleta: $25.000</div>
    </p>
    <div className={styles.contentItems} style={{ display: 'flex', flexWrap: 'wrap' }}>
      {isLoading && <div>Cargando...</div>}
      {
        !isLoading && numbersList.map((item, ind) => (
          <Tooltip title={`Reservar el número ${ind}`}>
            <div
              className={`${styles.item} ${styles[item.status]}`}
              onClick={handleClick}
            >
              <div>{ind}</div>
              {/* <div>{item?.user?.name}</div> */}
              {/* <div>{item.isPaid && 'Pagado'}</div> */}
            </div>
          </Tooltip>
        ))
      }
    </div>
  </div>
}

export default CompetitionDetail
