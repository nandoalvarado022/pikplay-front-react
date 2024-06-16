import React, { useEffect, useState, useRef } from 'react'
import { useIAStore } from '../../ia/IAstore'
import { Checkbox, Divider, FormControlLabel, List, ListItem, ListItemText, Tooltip } from '@mui/material'
import styles from '../styles.module.scss'
import useCompetitions from '../hooks/useCompetitions'
import Button from '../../button/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import Marquee from './Marquee'
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons'
import { faGrinHearts } from '@fortawesome/free-solid-svg-icons'
import { formatNumber } from '../../../lib/utils'

const CompetitionDetail = (props) => {
  const {
    competitionDetail,
    // competitionMembers,
    setCompetitionDetail,
    // setCompetitionMembers,
  } = props

  const {
    handleUserMessage,
    setIsvisible,
    setNumberChosen,
  } = useIAStore((state => state))

  const {
    competitionMembers,
    competitions,
    deleteNotPaidNumbers,
    getCompetitions,
    isOnlyAvailableNumbers,
    postCompetitionMember,
    selectedNumber,
    setCompetitionMembers,
    setIsOnlyAvailableNumbers,
    setSelectedNumber,
  } = useCompetitions()

  useEffect(() => {
    console.log("competitionMembers on competitionDetail.jsx updated!");
    console.log(competitionMembers);
  }, [competitionMembers])

  var updatesQuantity = 0
  const MAX_REQUEST_UPDATE = 10
  const [updatingIn, setUpdatingIn] = useState(null)
  const [numbersList, setNumbersList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [availableNumbers, setAvailableNumbers] = useState(0)
  const [count, setCount] = useState(0);
  const refButtonUpdateDash = useRef()
  // const interval = useRef();
  const [timer, setTimer] = useState(0);
  const numbersListTemplate = Array.from({ length: competitionDetail.membersCapacity }, (_, i) => i + 1).map((number) => (
    { name: '', status: 'available', isPaid: false, number: null }
  ))

  const handleClick = (number) => {
    setIsvisible(true)
    // setnumberChosen(number)
    const options = {
      competitionID: competitionDetail.id,
      number,
      postCompetitionMember,
      sellerPhone: competitionDetail.seller.phone,
    }
    handleUserMessage('competition', options)
    setSelectedNumber(number)
  }

  const settingTakenNumbers = (members) => { // Seteando números tomados a not available
    const isOnlyAvailableNumbers = document.querySelector('#check_available_numbers').checked
    const _numbersList = [...numbersListTemplate]
    members.map(item => { // TODO: get competition id from url
      _numbersList[item.number] = {
        ...item,
        status: 'blocked',
        hidden: isOnlyAvailableNumbers ? true : false,
      }
    })
    setNumbersList(_numbersList)
    setIsLoading(false)
    // Seteando números disponibles
    const _availableNumbers = competitionDetail.membersCapacity - competitionMembers.length
    setAvailableNumbers(_availableNumbers)
  }

  const initVisualInterval = (myVisualInterval) => {
    let demo = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    myVisualInterval = setInterval(() => {
      const number = demo.shift()
      const newNumber = Number(Math.floor(Math.abs(number - 10)))
      console.log(newNumber)
      setUpdatingIn(newNumber == 0 ? '¡Tablero actualizado!' : newNumber + ' segundos...')
      if (demo.length == 0) clearInterval(myVisualInterval);
    }, 1000)
  }

  const handleUpodateDashboard = () => {
    getCompetitions(competitionDetail.slug, true)
      .then(competitionDetailUpdated => { // TODO: get competition id from url
        // setCompetitionDetail({ ...competitionDetailUpdated })
        setCompetitionMembers(competitionDetailUpdated.members)
        settingTakenNumbers(competitionDetailUpdated.members)
      }).catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    settingTakenNumbers(competitionDetail.members,)
    let myVisualInterval
    const myFetchInterval = setInterval(() => {
      updatesQuantity++
      console.log('updatesQuantity:', updatesQuantity)
      if (updatesQuantity >= MAX_REQUEST_UPDATE) {
        setUpdatingIn(null)
        clearInterval(myVisualInterval);
        clearInterval(myFetchInterval);
        return
      }
      initVisualInterval(myVisualInterval)
      refButtonUpdateDash.current.click()
    }, 10000)

    return () => {
      clearInterval(myVisualInterval);
      clearInterval(myFetchInterval);
    };
  }, [])

  return <div className={styles.CompetitionDetail}>
    {/* competitionDetail: {JSON.stringify(competitionDetail)} */}
    <div className={styles.left}>
      <div className={styles.news}>
        <span>Últimos movimientos:</span>
        <Marquee />
      </div>
      <button ref={refButtonUpdateDash} className={styles.btnUpdateDashboard} onClick={handleUpodateDashboard}>
        Actualizar tablero<br />
      </button>
      {updatingIn && <small>Automaticamente en {updatingIn}</small>}
      <div className={styles.controlAvailablenumbers}>
        <FormControlLabel
          control={
            <Checkbox id="check_available_numbers" value={isOnlyAvailableNumbers} onClick={(e) => settingTakenNumbers(competitionDetail.members)} />
          }
          label="Mostrar sólo números disponibles" />
      </div>
      <div className={`Card ${styles.contentItems}`} style={{ display: 'flex', flexWrap: 'wrap' }}>
        {
          numbersList.map((item, ind) => {
            return !item.hidden ? <Tooltip key={ind} title={`Reservar el número ${ind}`}>
              <div
                className={`${styles.item} ${styles[item.status]} ${selectedNumber == ind && styles.selected}`}
                onClick={() => item.status != 'blocked' ? handleClick(ind) : null}>
                <div>{ind}</div>
              </div>
            </Tooltip> : <></>
          })
        }
      </div>
    </div>

    <div className={`Card ${styles.seller}`}>
      <div className="flex">
        <div>
          <img src="https://pikplay-bucket.nyc3.cdn.digitaloceanspaces.com/users/1716992297692-bluepanther-image.jpeg" alt="" />
        </div>
        <p>
          <b>BluePanther&apos;s</b>
          <div className={styles.calification}>
            {[1, 1, 1].map(item => <FontAwesomeIcon className='icon' icon={faStar} />)}
          </div>
        </p>
      </div>

      <p className={`Card flex ${styles.description}`}>
        <div>
          <div>Premio: {competitionDetail?.award}</div>
          <div>Liberación de cupos el {competitionDetail?.dateReleaseQuotas}</div>
          <div>Total números disponibles:
            <span className={styles.availableNumbers}>
              {availableNumbers}
            </span>
          </div>
          <div>
            Valor de la boleta: ${formatNumber(competitionDetail?.price)}
          </div>
        </div>
      </p>
      <Divider />
      <h4>Operaciones de Administrador</h4>
      <div className={styles.actions}>
        <Button color="yellow" onClick={() => setCompetitionDetail({})}>
          Volver al listado de concursos
        </Button>
        <Button color="blue" onClick={deleteNotPaidNumbers}>
          Liberar números no pagados
        </Button>
        {/* <Button color="blue">
            <Link color="blue" href='/concursos/367267/config'>Administrar</Link>
          </Button> */}
      </div>
    </div>
  </div>
}

export default CompetitionDetail
