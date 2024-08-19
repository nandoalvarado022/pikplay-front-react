import styles from './notificationsNewIcon.module.scss'

import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'

const NotificationsNewIcon = ({ style }) => {
    return <span className={`NotificationsNewIcon animatedZoom ${styles.NotificationsNewIcon}`} style={style}>
        <NotificationsActiveIcon className="icon" />
    </span>
}

export default NotificationsNewIcon
