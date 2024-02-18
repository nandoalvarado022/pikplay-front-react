import React, { useEffect, useState } from 'react'
import { useIAStore } from '../../ia/IAstore'
import { Tooltip } from '@mui/material'
import styles from '../styles.module.scss'
import { set } from 'nprogress'
import useCompetitions from '../hooks/useCompetitions'

const CompetitionDetail = () => {
  const {
    setIsvisible,
    handleUserMessage,
    setnumberChosen
  } = useIAStore((state => state))

  const { postCompetitionMember, getCompetitions, competitions } = useCompetitions()
  const quantityNumbers = 100;
  const [numbersList, setNumbersList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const numbersListTemplate = Array.from({ length: quantityNumbers }, (_, i) => i + 1).map((number) => (
    { name: '', status: 'available', isPaid: false, number: null }
  ))

  const handleClick = (number) => {
    setIsvisible(true)
    setnumberChosen(number)
    const options = { number, sellerPhone: '+573148567146', postCompetitionMember, competitionID: 3 }
    handleUserMessage('competition', options)
  }

  const settingTakenNumbers = (competitions) => {
    const _numbersList = [...numbersListTemplate]
    competitions.find(item => item.id == 3).members.map(item => { // TODO: get competition id from url
      _numbersList[item.number] = {
        ...item,
        status: 'blocked'
      }
    })
    setNumbersList(_numbersList)
    setIsLoading(false)
  }

  useEffect(() => {
    getCompetitions(3)
      .then(competitions => { // TODO: get competition id from url
        settingTakenNumbers(competitions)
      })

    const myInterval = setInterval(() => {
      getCompetitions(3)
        .then(competitions => { // TODO: get competition id from url
          settingTakenNumbers(competitions)
        })
    }, 10000)

    return () => {
      clearInterval(myInterval);
    };
  }, [])

  return <div className={styles.CompetitionDetail}>
    <div className={`Card ${styles.seller}`}>
      <div>Organiza: <b>BluePanther&apos;s</b></div>
    </div>
    <p className='Card'>
      <div>Premio: Playstation 5</div>
      <div>Liberacion de cupos el sábado a las 2PM</div>
      <div>Total cupos restantes: 34</div>
      <div>Valor de la boleta: $25.000</div>
    </p>
    <div className={styles.contentItems} style={{ display: 'flex', flexWrap: 'wrap' }}>
      {isLoading && <div>Cargando...</div>}
      {
        !isLoading && numbersList.map((item, ind) => (
          <Tooltip key={ind} title={`Reservar el número ${ind}`}>
            <div
              className={`${styles.item} ${styles[item.status]}`}
              onClick={() => handleClick(ind)}>
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
