import React, { useEffect, useState } from 'react'
import { useIAStore } from '../../ia/IAstore'
import { Tooltip } from '@mui/material'
import styles from '../styles.module.scss'
import { set } from 'nprogress'
import useCompetitions from '../hooks/useCompetitions'
import Button from '../../button/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import Marquee from './Marquee'
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons'
import { faGrinHearts } from '@fortawesome/free-solid-svg-icons'

const CompetitionDetail = (props) => {
  const { setCompetitionId } = props
  const {
    setIsvisible,
    handleUserMessage,
    setnumberChosen
  } = useIAStore((state => state))

  const {
    postCompetitionMember,
    getCompetitions,
    competitions,
    selectedNumber,
    setSelectedNumber,
    deleteNotPaidNumbers,
  } = useCompetitions()
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
    setSelectedNumber(number)
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
      <div className="flex">
        <div>
          <img src="https://pikplay-bucket.nyc3.cdn.digitaloceanspaces.com/users/1716992297692-bluepanther-image.jpeg" alt="" />
        </div>
        <p>
          <b>BluePanther&apos;s</b>
          <div className={styles.calification}>
            {[1, 1, 1].map(item => <FontAwesomeIcon icon={faStar} />)}
          </div>
        </p>
      </div>
    </div>
    <div className="Card">
      <FontAwesomeIcon icon={faHeartbeat} />
    </div>
    <p className={`Card flex ${styles.description}`}>
      <div>
        <div>Premio: Playstation 5</div>
        <div>Liberación de cupos el sábado a las 2PM</div>
        <div>Total números disponibles:
          <span className={styles.availableNumbers}>34</span>
        </div>
        <div>Valor de la boleta: $25.000</div>
      </div>
      <div className={styles.actions}>
        <Button color="yellow" onClick={() => setCompetitionId(0)}>
          Volver al listado de concursos
        </Button>
        <Button color="blue" onClick={deleteNotPaidNumbers}>
          Liberar números no pagados
        </Button>
        {/* <Button color="blue">
            <Link color="blue" href='/concursos/367267/config'>Administrar</Link>
          </Button> */}
      </div>
    </p>
    <div className={styles.news}>
      <span>Últimos movimientos:</span>
      <Marquee />
    </div>
    <div className={styles.contentItems} style={{ display: 'flex', flexWrap: 'wrap' }}>
      {isLoading && <div>Cargando...</div>}
      {
        !isLoading && numbersList.map((item, ind) => (
          <Tooltip key={ind} title={`Reservar el número ${ind}`}>
            <div
              className={`${styles.item} ${styles[item.status]} ${selectedNumber == ind && styles.selected}`}
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
