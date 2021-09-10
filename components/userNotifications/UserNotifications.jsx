import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBell, faTimesCircle } from "@fortawesome/free-regular-svg-icons"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { useContext, useEffect, useState } from 'react'
import { PikContext } from "../../states/PikState"
import styles from "./styles.module.scss"
import { useMutation } from '@apollo/client'
import Button from "../button/Button"
import { CREATE_COIN, DELETE_NOTIFICATION } from "../../lib/utils"

const UserNotifications = () => {
  const context = useContext(PikContext)
  const notifications = context.notifications.filter(item => item.closed == 0)
  const [isOpenNotifications, setIsOpenNotifications] = useState(false)
  const [deleteNotificationGraph] = useMutation(DELETE_NOTIFICATION);
  const [createCoin] = useMutation(CREATE_COIN);

  const reclamarCoins = (coins, idNotification) => {
    createCoin({
      variables: {
        id: idNotification
      }
    })
    context.customDispatch({ type: "RECLAMAR_COINS", payload: { coins } })
    deleteNotification(idNotification)
  }

  const deleteNotification = (idNotification) => {
    const notifications = [...context.notifications]
    notifications.find(item => item.id == idNotification).closed = "1"
    deleteNotificationGraph({ variables: { id: idNotification } })
    context.customDispatch({ type: "CHANGE_PROPERTY", payload: { property: "notifications", value: notifications } })
  }

  const handleNotification = (id) => {
    const _notifications = notifications.map((item) => {
      const isOpen = item.id == id ? true : false
      return {
        ...item,
        isOpen
      }
    })
    context.customDispatch({ type: "CHANGE_PROPERTY", payload: { property: "notifications", value: _notifications } })
  }

  return <ul className={`${styles.UserNotifications} UserNotifications`}>
    {notifications && notifications.map(({ coins, detail, id, isOpen }) => <ol className={isOpen ? styles.open : null}>
      {!!coins && <img className={styles.coin} src="/images/icons/moneda2.svg" />}
      <span onClick={() => handleNotification(id)}>
        {detail}
        {isOpen && <i>Hace 5 minutos</i>}
      </span>
      {!!coins && <Button color="blue" onClick={() => { reclamarCoins(coins, id) }}>Reclamar</Button>}
      {!coins && <div className={styles.content_close}>
        <FontAwesomeIcon onClick={() => deleteNotification(id)} icon={faTimes} />
      </div>
      }
    </ol>
    )}
    {
      notifications.length < 1 && <ol>
        <span>✅ Estas al día con tus notificaciones</span>
      </ol>
    }
  </ul >
}

export default UserNotifications