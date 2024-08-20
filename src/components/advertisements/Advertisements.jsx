import styles from './advertisements.module.scss'

/* eslint-disable quotes */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronCircleLeft,
  faChevronCircleRight,
  faPlus,
} from '@fortawesome/free-solid-svg-icons'
// import { useMutation, useQuery } from '@apollo/client'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import {
  CREATE_COIN,
  DELETE_NOTIFICATION,
  getNotifications,
  GET_NOTIFICATIONS,
} from '../../lib/utils'
import confetti from 'canvas-confetti'
// import { useDispatch, useSelector } from 'react-redux'
import CountUp from 'react-countup'
import Articles from '../articles/Articles'
import useSystemStore from '../../hooks/storeSystem'
import Challenges from '../challenges/Challenges'

const Advertisements = () => {
  // const dispatch = useDispatch()
  // const { user } = useSelector(state => state)
  const { userLogged } = useSystemStore()
  const isMobile = typeof window != 'undefined' ? window.screen.width < 420 : false
  const [leftIndicator, setLeftIndicator] = useState(0)
  // const [deleteNotification] = useMutation(DELETE_NOTIFICATION)
  const [idNotification, setIdNotification] = useState(null)
  // const [createCoin] = useMutation(CREATE_COIN)
  const name = userLogged?.name ? userLogged.name : 'Invitado'
  const isProfileComplete = userLogged?.name && userLogged?.email && userLogged?.city
  // const isProfileComplete = true
  const [gotProfileCompletedCoins, setGotProfileCompletedCoins] =
    useState(false)
  const coins = 2500 // monedas que se le dara al usuario por completar el perfil
  const notifications = [] // useSelector(state => state.notifications).filter(item => item.closed === 0)
  const [showMainNoitificacion, setShowMainNoitificacion] = useState(true)

  // useQuery(GET_NOTIFICATIONS, {
  //     fetchPolicy: "no-cache",
  //     skip: context.user.id == 0,
  //     variables: {
  //         user: context.user.id
  //     },
  //     onCompleted: ({ getNotifications }) => {
  //     }
  // })

  useEffect(() => {
    if (!notifications) return
    const res = notifications.find(item => item.type == 'PROFILE_COMPLETED')
    if (res) {
      setIdNotification(res.id)
      setGotProfileCompletedCoins(res.closed == 0 ? false : true)
    }
  }, [notifications])

  const classButton = isProfileComplete && gotProfileCompletedCoins ? styles.disabled : ''

  const handleActions = value => {
    let _leftIndicator = leftIndicator + value
    if (_leftIndicator > 0 || _leftIndicator <= -1260) return
    setLeftIndicator(_leftIndicator)
  }

  return (
    <div className={styles.Advertisements}>
      <div className={`${styles.content}`}>

        {showMainNoitificacion && (
          <div className={`${styles.texts}`}>
            {/* <FontAwesomeIcon
              className="close_icon"
              icon={faPlus}
              onClick={() => setShowMainNoitificacion(false)}
            /> */}
            <div className={`${styles.text1} font-c`}>
              Hola,
              <div>
                <b className='font-a'>{name}</b>
              </div>
            </div>
            <div className={`${styles.text2} font-a`}>
              <p className={styles['contigo-somos']}>Contigo ya somos&nbsp;
                <span>
                  <b><CountUp end={165} /></b>
                </span> gamers en Pikplay.
              </p>
              <b>Recuerda</b>, puedes confiar en nuestros aliados certificados.
              Entregamos <b>garantía</b> por las compras que realices a estos, así que tu compra será confiable, rápida y segura.
            </div>
            <Challenges limit={1} />
          </div>
        )}
        {/* <Articles /> */}

        <div className={styles.ads}>
          {/* <Link
            href='/publicacion/[id]'
            as='/publicacion/preventa-fifa-22-juanchofenix-502'>
            <iframe
              width='560'
              height='315'
              src='https://www.youtube.com/embed/U_oewgFysiY'
              title='YouTube video player'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            ></iframe>
          </Link> */}
          {/* <p className={styles.description}>
                Lost Judgement es una entrega de acción y aventura desarrollada
                por Ryu Ga Gotoku Studio y publicada por Sega, estrenada el 21
                de septiembre de 2021 a nivel mundial.
              </p> */}
        </div>
      </div>
    </div>
  )
}

export default Advertisements
