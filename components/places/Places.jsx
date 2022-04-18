import { faStore } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tooltip } from '@material-ui/core'
import styles from './styles.module.scss'

export default Places = () => {
    const places = [{
        name: 'Centro Comercial Monterrey',
        nickname: 'CC. Monterrey'
    }]
    return <div className={styles.Places}>
        {places.map(item => {
            return <article>
                <Tooltip title={item.name}>
                    <FontAwesomeIcon icon={faStore} />
                    <span>{item.nickname}</span>
                </Tooltip>
            </article>
        })}
    </div>
}
