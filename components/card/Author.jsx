import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckCircle, faHandshake, faStar } from "@fortawesome/free-solid-svg-icons"
import styles from "./author.module.scss"

const Author = ({ user = {} }) => {
    return <div className={`${styles.author} author`}>
        <img alt={`Imagen de ${user?.name}`} className={styles.user_picture} src={user?.picture} />
        <p title={user?.certificate ? "El usuario esta certificado, puedes confiar en esta oferta" : ""}>
            <small>Vendedor:</small>
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
}

export default Author