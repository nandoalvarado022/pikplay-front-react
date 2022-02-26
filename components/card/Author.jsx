import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckCircle, faHandshake, faStar } from "@fortawesome/free-regular-svg-icons"
import styles from "./author.module.scss"

const Author = ({ user = {} }) => {
    return <div className={`${styles.author} author`}>
        <img alt={`Imagen de ${user?.name}`} className={styles.user_picture} src={user?.picture} />
        <p title={user?.certificate ? "El usuario esta certificado, puedes confiar en esta oferta" : ""}>
            <h3>
                {user?.name}
            </h3>
            {user?.certificate && <div className={styles.stars}>
                <FontAwesomeIcon icon={faStar} /> 4,5
            </div>}
            {user?.transactions > 0 && <div className={styles.transactions}>
                <FontAwesomeIcon icon={faCheckCircle} />
                {user?.transactions} ventas completadas
            </div>}
        </p>
    </div>
}

export default Author