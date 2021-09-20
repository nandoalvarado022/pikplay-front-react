// Descripción: Notificaciones generales en la aplicacion
import { faClosedCaptioning, faTimesCircle } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useContext } from "react"
import { PikContext } from "../../states/PikState"
import styles from "./notificacion.module.scss"

const Notification = ({ }) => {
    const context = useContext(PikContext)
    const isOpen = context.messageModal.id == "empty" ? false : true
    const { id = null, isHiddenButton, message: htmlMessage = null } = context?.messageModal
    const handleClose = () => {
        context.customDispatch({ type: "SET_MESSAGE", payload: null })
    }
    const isNotificationChecked = context.checkedNotifications && !context.checkedNotifications.find(item => item == id)

    return <div className={`${styles.Notificacion} ${(isOpen && isNotificationChecked) && styles.active} ID-${id}`}>
        <div className={styles.bg}></div>
        <div className={styles.content}>
            {htmlMessage}
            {!isHiddenButton &&
                <FontAwesomeIcon className={styles.close} icon={faTimesCircle} onClick={handleClose} />
            }
        </div>
    </div>
}

export default Notification