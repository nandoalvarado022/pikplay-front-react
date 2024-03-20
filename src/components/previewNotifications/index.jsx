// Descripción: Notificaciones generales en la aplicacion
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import React from 'react'
import UserNotifications from '../userNotifications/UserNotifications'
import { IS_MOBILE } from '../../lib/variables'
import styles from './styles.module.scss'
import useSystemStore from '../../hooks/useSystem'

const Notification = () => {
  const { notifications } = useSystemStore((state => state))
  return (<div className={`${styles.PreviewNotifications}`}>
    <i className="fa fa-bell-o" aria-hidden="true"></i>
    <span className={styles.notyQuantity}>{notifications?.length || 0}</span>
    <div className={styles.bg_black}>
      <UserNotifications />
    </div>
    <div
      className={`${styles.Notificacion}`}>
      <div className={styles.bg}></div>
      <div className={styles.content}>
        <i className="fa fa-bell-o" aria-hidden="true"></i>
      </div>
    </div>
  </div>
  )
}

export default Notification
