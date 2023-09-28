// Descripción: Notificaciones generales en la aplicacion
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styles from './notificacion.module.scss'
import { useSelector, useDispatch } from 'react-redux'

const Notification = ({}) => {
  const dispatch = useDispatch()
  const messageModal = useSelector(state => state.messageModal)
  const checkedNotifications = useSelector(state => state.checkedNotifications)
  const isOpen = messageModal.id == 'empty' ? false : true
  const {
    id = null,
    isHiddenButton,
    message: htmlMessage = null,
  } = messageModal
  const handleClose = () => {
    dispatch({ type: 'SET_MESSAGE', payload: null })
  }
  const isNotificationChecked =
    checkedNotifications && !checkedNotifications.find(item => item == id)

  return (
    <div
      className={`${styles.Notificacion} ${
        isOpen && isNotificationChecked && styles.active
      } ID-${id}`}
    >
      <div className={styles.bg}></div>
      <div className={styles.content}>
        {htmlMessage}
        {!isHiddenButton && (
          <FontAwesomeIcon
            className={styles.close}
            icon={faTimesCircle}
            onClick={handleClose}
          />
        )}
      </div>
    </div>
  )
}

export default Notification
