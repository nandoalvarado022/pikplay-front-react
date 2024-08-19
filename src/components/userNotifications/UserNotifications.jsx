import styles from './styles.module.scss'
import React, { useEffect, useState } from 'react'
import Button from '../button/Button'
import confetti from 'canvas-confetti'
import {
  CREATE_COIN,
  DELETE_NOTIFICATION,
  formatNumber,
  GET_NOTIFICATIONS,
  loadAudio,
} from '../../lib/utils'
import { getNotificationsSrv } from '../../services/user/userService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faCircle } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
// import { useLazyQuery, useMutation } from '@apollo/client'
// import { useSelector, useDispatch } from 'react-redux'
import classNames from 'classnames'
import { Tooltip } from '@mui/material'
import moment from 'moment'
import Link from 'next/link'
import Router from 'next/router'
import CoinIcon from '../coinIcon/CoinIcon'
import AwardsSummary from '../awardsSummary/AwardsSummary'
import useSystemStore from '../../hooks/storeSystem.js'
import Image from 'next/image.js'

const { motion } = require('framer-motion')

moment.locale('es-CO')

const UserNotifications = () => {
  const { userLogged, notifications, setStoreValue } = useSystemStore((state => state))
  // const user = useSelector(state => state.user)
  // const notifications = useSelector(state => state.notifications) //.filter(item => item.closed == 0)
  // const [deleteNotification] = useMutation(DELETE_NOTIFICATION, {
  //   onCompleted: ({ data, message, status }) => {
  //     if (status === 200) {
  //       getNotifications()
  //     }
  //   },
  // })
  // const [createCoin] = useMutation(CREATE_COIN)
  // const dispatch = useDispatch()

  // const reclamarCoins = async (coins, idNotification) => {
  //   const reqRes = await createCoin({
  //     variables: {
  //       id: idNotification,
  //     },
  //   })

  //   const { message, status } = reqRes.data.createCoin
  //   toast(message)

  //   if (status === 200) {
  //     confetti()
  //     dispatch({ type: 'RECLAMAR_COINS', payload: { coins } }) // Coins UI
  //     toast(`Has recibido ${formatNumber(coins)} Pikcoins, ¡felicidades!`)
  //     handleDeleteNotification(idNotification) // Delete notificacion (BD and UI)
  //     getNotifications()
  //     return true
  //   }
  // }

  // const handleDeleteNotification = id => {
  //   notifications.find(item => item.id === id).closed = '1'
  //   deleteNotification({ variables: { id, userId: user.id } }) // Delete notification BD
  // }

  const handleDeleteNotification = () => { }

  const getNotifications = () => {
    if (userLogged.uid) {
      getNotificationsSrv()
        .then(res => {
          setStoreValue('notifications', res.data)
        });
    }
  }

  const handleNotification = async ({ coins, disabled, id, link, type }) => {
    if (coins && !disabled) {
      // reclamarCoins(coins, id)
      setStoreValue('isAwardSummaryModalOpen', true)
    } else {
      handleDeleteNotification(id)
    }
    if (link) Router.push(link)
  }

  useEffect(() => {
    getNotifications()
  }, [])

  return (
    <div className={`${styles.UserNotifications} UserNotifications`}>
      <div className={styles.options}>
        <motion.span>
          <FontAwesomeIcon icon={faBell} className='m-r-10 icon' />
          Mis notificaciones
        </motion.span>
        <span>Marcar todas como leídas</span>
      </div>
      <ul>
        {notifications && notifications.map(
          ({
            closed: disabled,
            coins,
            created,
            detail,
            id,
            closed,
            link,
            type,
          }) => {
            created = moment(created).fromNow()
            const srcNotificationImg =
              type === 'COUPON_GIFT_AVAILABLE'
                ? '/images/type_notification/coupon_gift_available.png'
                : type === 'COMPLETED_PROFILE'
                  ? '/images/type_notification/completed_profile.png'
                  : type === 'COINS_BY_PURCHASE'
                    ? '/images/type_notification/coins_by_purchase.png'
                    : '/images/type_notification/coins_by_purchase_completed.png'
            return (
              // <Tooltip title={created} key={id}>
              <ol
                className={classNames(null, { [styles.read]: disabled })}
                key={id}
                onClick={() =>
                  !disabled && handleNotification({ coins, disabled, id, link, type })
                }
              >
                {/* {!disabled && <FontAwesomeIcon icon={faCircle} />} */}
                <Image
                  alt='icon-notification'
                  className={styles.img_notification}
                  height={35}
                  src={srcNotificationImg}
                  width={48}
                />
                <span>{detail}</span>
                {coins && <CoinIcon isLabel={false} coins={coins} />}
                {!coins && <div className={styles.content_close}></div>}
              </ol>
              // </Tooltip>
            )
          },
        )}
      </ul>
    </div>
  )
}

export default UserNotifications
