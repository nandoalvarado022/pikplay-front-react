import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckCircle, faHandshake, faStar } from "@fortawesome/free-regular-svg-icons"
import styles from "./author.module.scss"

const Author = ({ user_certificate, user_name, user_picture, user_transactions }) => {
    return <div className={`${styles.author} author`}>
        <img className={styles.user_picture} src={user_picture} />
        <p title={user_certificate ? "El usuario esta certificado, puedes confiar en esta oferta" : ""}>
            <h3>
                {user_certificate && <FontAwesomeIcon icon={faCheckCircle} />}
                {user_name}
            </h3>
            {user_certificate && <span className={styles.stars}>
                <FontAwesomeIcon icon={faStar} /> 4,5
            </span>}
            {user_transactions > 0 && <span className={styles.transactions}>
                <FontAwesomeIcon icon={faHandshake} />
                {user_transactions} ventas
            </span>
            }
        </p>
    </div>
}

export default Author