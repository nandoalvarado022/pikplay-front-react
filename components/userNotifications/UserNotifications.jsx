import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { useEffect } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import confetti from "canvas-confetti"
import { useSelector, useDispatch } from "react-redux"
import { CREATE_COIN, DELETE_NOTIFICATION, GET_NOTIFICATIONS, loadAudio } from "../../lib/utils"
import Button from "../button/Button"
import styles from "./styles.module.scss"

const UserNotifications = () => {
  const user = useSelector((state) => state.user)
  const notifications = useSelector((state) => state.notifications).filter(item => item.closed == 0)
  const [deleteNotification] = useMutation(DELETE_NOTIFICATION)
  const [createCoin] = useMutation(CREATE_COIN)
  const dispatch = useDispatch()

  const reclamarCoins = async (coins, idNotification) => {
    const req_res = await createCoin({
      variables: {
        id: idNotification
      }
    })
    const res = req_res.data.createCoin
    if (res == 401) {
      alert("Accion no permitida")
      return
    }
    if (res == 400) {
      const message = { id: 0, message: <div>Alcanzaste el límite diario de <b>Pikcoins</b> a recibir, intentalo mañana </div> }
      dispatch({ type: "SET_MESSAGE", payload: { message } })
      return
    }
    confetti()
    dispatch({ type: "RECLAMAR_COINS", payload: { coins } })
    deleteNotification({ notifications, idNotification, userId: user.id })
  }

  const handleDeleteNotification = (id) => {
    debugger
    notifications.find(item => item.id == idNotification).closed = "1"
    deleteNotification({ variables: { id: idNotification, user_request: userId } })
    dispatch({ type: "CHANGE_PROPERTY", payload: { property: "notifications", value: notifications } })
  }

  const [getNotifications] = useLazyQuery(GET_NOTIFICATIONS, { // Obteniendo notificaciones
    fetchPolicy: "no-cache",
    // polInterval: 5000,
    variables: {
      user: user.id
    },
    onCompleted: ({ getNotifications }) => {
      getNotifications && dispatch({ type: "CHANGE_PROPERTY", payload: { property: "notifications", value: getNotifications } })
    }
  })

  const handleNotification = (id) => {
    const _notifications = notifications.map((item) => {
      const isOpen = item.id == id ? true : false
      return {
        ...item,
        isOpen
      }
    })
    dispatch({ type: "CHANGE_PROPERTY", payload: { property: "notifications", value: _notifications } })
  }

  useEffect(() => {
    getNotifications()
  }, [])

  return <ul className={`${styles.UserNotifications} UserNotifications`}>
    {notifications && notifications.map(({ coins, detail, id, isOpen }) => <ol className={isOpen ? styles.open : null}>
      {!!coins && <img className={styles.coin} src="/images/icons/moneda2.svg" />}
      <span onClick={() => handleNotification(id)}>
        {detail}
        {isOpen && <i>Hace 5 minutos</i>}
      </span>
      {!!coins && <Button color="blue" onClick={() => { reclamarCoins(coins, id) }}>Reclamar</Button>}
      {!coins && <div className={styles.content_close}>
        <FontAwesomeIcon onClick={() => handleDeleteNotification(id)} icon={faTimes} />
      </div>
      }
    </ol>
    )}
    {
      notifications.length < 1 && <ol>
        <span>✅ &nbsp;Estas al día con tus notificaciones</span>
      </ol>
    }
  </ul >
}

export default UserNotifications