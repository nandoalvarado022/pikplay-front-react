import React, { useEffect } from 'react'
const { motion } = require('framer-motion')
import Button from '../button/Button'
import confetti from 'canvas-confetti'
import styles from './styles.module.scss'
import {
  CREATE_COIN,
  DELETE_NOTIFICATION,
  formatNumber,
  GET_NOTIFICATIONS,
  loadAudio
} from '../../lib/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faCircle } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import { useLazyQuery, useMutation } from '@apollo/client'
import { useSelector, useDispatch } from 'react-redux'
import classNames from 'classnames'
import { Tooltip } from '@material-ui/core'
import moment from 'moment'
import Link from 'next/link'
import Router from 'next/router'
import CoinIcon from '../CoinIcon/CoinIcon'

moment.locale('es-CO')

const UserNotifications = () => {
  const user = useSelector((state) => state.user)
  const notifications = useSelector((state) => state.notifications) //.filter(item => item.closed == 0)
  const [deleteNotification] = useMutation(DELETE_NOTIFICATION, {
    onCompleted: ({ data, message, status }) => {
      if (status === 200) {
        getNotifications()
      }
    }
  })
  const [createCoin] = useMutation(CREATE_COIN)
  const dispatch = useDispatch()

  const reclamarCoins = async (coins, id_notification) => {
    const req_res = await createCoin({
      variables: {
        id: id_notification
      }
    })

    let { message, status } = req_res.data.createCoin
    toast(message)

    if (status == 200) {
      confetti()
      dispatch({ type: 'RECLAMAR_COINS', payload: { coins } }) // Coins UI
      toast(`Has recibido ${formatNumber(coins)} Pikcoins, ¡felicidades!`)
      handleDeleteNotification(id_notification) // Delete notificacion (BD and UI)
      getNotifications()
      return true
    }
  }

  const handleDeleteNotification = (id) => {
    notifications.find((item) => item.id == id).closed = '1'
    deleteNotification({ variables: { id, userId: user.id } }) // Delete notification BD
  }

  const [getNotifications] = useLazyQuery(GET_NOTIFICATIONS, {
    // Obteniendo notificaciones
    fetchPolicy: 'no-cache',
    polInterval: 5000,
    variables: {
      user: user?.id
    },
    context: {
      headers: {
        'Operation-Name': 'getNotifications'
      }
    },
    onCompleted: ({ getNotifications }) => {
      getNotifications &&
        dispatch({
          type: 'CHANGE_PROPERTY',
          payload: { property: 'notifications', value: getNotifications }
        })
    }
  })

  const handleNotification = async ({ coins, disabled, id, link, type }) => {
    if (coins && !disabled) {
      reclamarCoins(coins, id)
    } else {
      handleDeleteNotification(id)
    }
    if (link) Router.push(link)
  }

  useEffect(() => {
    getNotifications()
  }, [])

  const notificationsNotClosed = notifications.filter((item) => !item.closed)

  return (
    <ul className={`${styles.UserNotifications} UserNotifications`}>
      <h4>
        <motion.span>
          <FontAwesomeIcon icon={faBell} className='m-r-10' />
        </motion.span>
        Notificaciones
      </h4>
      {notifications &&
        notifications.map(
          ({
            closed: disabled,
            coins,
            created,
            detail,
            id,
            closed,
            link,
            type
          }) => {
            created = moment(created).fromNow()
            const srcNotificationImg =
              type === 'COUPON_GIFT_AVAILABLE'
                ? './images/type_notification/coupon_gift_available.png'
                : type === 'COMPLETED_PROFILE'
                  ? './images/type_notification/completed_profile.png'
                  : type === 'COINS_BY_PURCHASE'
                    ? './images/type_notification/coins_by_purchase.png'
                    : './images/type_notification/coins_by_purchase_completed.png'
            return (
              <Tooltip title={created} key={id}>
                <ol
                  // className={classNames(null, { [styles.closed]: disabled })}
                  // className={`${closed && styles.closed}`}
                  onClick={() =>
                    handleNotification({ coins, disabled, id, link, type })
                  }
                >
                  {/* {!disabled && <FontAwesomeIcon icon={faCircle} />} */}
                  <img
                    className={styles.img_notification}
                    src={srcNotificationImg}
                    alt='icon-notification'
                  />
                  <span>{detail}</span>
                  {coins && <CoinIcon isLabel={false} coins={coins} />}
                  {!coins && <div className={styles.content_close}></div>}
                </ol>
              </Tooltip>
            )
          }
        )}
    </ul>
  )
}

export default UserNotifications
