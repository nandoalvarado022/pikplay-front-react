import Zoom from '@material-ui/core/Zoom';
import styles from "./author.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Tooltip } from "@material-ui/core"
import { faCheckCircle, faStar } from "@fortawesome/free-solid-svg-icons"

const Author = ({ user = {} }) => {
    return <Tooltip TransitionComponent={Zoom} title="Información del vendedor">
        <div className={`${styles.author} author`}>
            <img alt={`Imagen de ${user?.name}`} className={styles.user_picture} src={user?.picture} />
            <p title={user?.certificate ? "El usuario esta certificado, puedes confiar en esta oferta" : ""}>
                <h3>
                    {user?.name}
                </h3>
                {!!user?.certificate && <div className={styles.stars}>
                    <FontAwesomeIcon icon={faStar} />
                    <span>
                        4,5
                    </span>
                </div>}
                {user?.transactions > 0 && <div className={styles.transactions}>
                    <FontAwesomeIcon icon={faCheckCircle} />
                    <span>
                        {user?.transactions} ventas completadas
                    </span>
                </div>}
            </p>
        </div>
    </Tooltip>
}

export default Author