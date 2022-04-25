const { motion } = require("framer-motion")
import Button from "../button/Button"
import confetti from "canvas-confetti"
import styles from "./styles.module.scss"
import { CREATE_COIN, DELETE_NOTIFICATION, format_number, GET_NOTIFICATIONS, loadAudio } from "../../lib/utils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBell } from "@fortawesome/free-solid-svg-icons"
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import { useSelector, useDispatch } from "react-redux"
import classNames from "classnames"
import { Tooltip } from "@material-ui/core"
import moment from "moment"
import Link from "next/link"

moment.locale('es-CO');

const UserNotifications = () => {
  const user = useSelector((state) => state.user)
  const notifications = useSelector((state) => state.notifications) //.filter(item => item.closed == 0)
  const [deleteNotification] = useMutation(DELETE_NOTIFICATION)
  const [createCoin] = useMutation(CREATE_COIN)
  const dispatch = useDispatch()

  const reclamarCoins = async (coins, id_notification) => {
    const req_res = await createCoin({
      variables: {
        id: id_notification
      }
    })

    const res = req_res.data.createCoin
    if (res == 401) {
      toast("Acción no permitida")
      return false
    }

    if (res == 400) {
      const message = <div>Alcanzaste el límite diario de <b>Pikcoins</b> a recibir, intentalo mañana </div>
      toast(message)
      return false
    }

    confetti()
    dispatch({ type: "RECLAMAR_COINS", payload: { coins } }) // Coins UI
    toast(`Has recibido ${format_number(coins)} Pikcoins, ¡felicidades!`)
    handleDeleteNotification(id_notification) // Delete notificacion (BD and UI)
    getNotifications()
    return true
  }

  const handleDeleteNotification = (id) => {
    notifications.find(item => item.id == id).closed = "1"
    deleteNotification({ variables: { id, userId: user.id } }) // Delete notification BD
    getNotifications()
    // dispatch({ type: "CHANGE_PROPERTY", payload: { property: "notifications", value: notifications } })
  }

  const [getNotifications] = useLazyQuery(GET_NOTIFICATIONS, { // Obteniendo notificaciones
    fetchPolicy: "no-cache",
    // polInterval: 5000,
    variables: {
      user: user?.id
    },
    onCompleted: ({ getNotifications }) => {
      getNotifications && dispatch({ type: "CHANGE_PROPERTY", payload: { property: "notifications", value: getNotifications } })
    }
  })

  const handleNotification = async ({ coins, disabled, id }) => {
    if (coins && !disabled) {
      if (await reclamarCoins(coins, id)) handleDeleteNotification(id)
    } else {
      handleDeleteNotification(id)
    }
  }

  useEffect(() => {
    getNotifications()
  }, [])

  const notificationsNotClosed = notifications.filter(item => !item.closed)

  return <ul className={`${styles.UserNotifications} UserNotifications`}>
    <h4>
      <motion.span>
        <FontAwesomeIcon icon={faBell} className='m-r-10' />
      </motion.span>
      Notificaciones
    </h4>
    {notificationsNotClosed.length < 1 && <ol className="m-b-20">
      <span>Nada nuevo 😎</span>
    </ol>}
    {notifications && notifications.map(({ closed: disabled, coins, created, detail, id, isOpen, link }) => {
      link = link ? link : '#'
      created = moment(created).fromNow()

      return <Tooltip title={created}>
        <ol className={classNames(null, { [styles.closed]: disabled })} onClick={() => handleNotification({ coins, disabled, id })}>
          <Link href={link}>
            <a>
              <span>
                {detail}
              </span>
              {!coins && <div className={styles.content_close}>
              </div>
              }
            </a>
          </Link>
        </ol>
      </Tooltip>
    }
    )}
  </ul >
}

export default UserNotifications