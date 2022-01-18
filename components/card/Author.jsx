import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckCircle, faHandshake, faStar } from "@fortawesome/free-regular-svg-icons"
import styles from "./author.module.scss"

const Author = ({ user = {} }) => {
    return <div className={`${styles.author} author`}>
        <img className={styles.user_picture} src={user?.picture} />
        <p title={user?.certificate ? "El usuario esta certificado, puedes confiar en esta oferta" : ""}>
            <h3>
                {user?.certificate != 0 && <FontAwesomeIcon icon={faCheckCircle} />}
                {user?.name}
            </h3>
            {user?.certificate && <span className={styles.stars}>
                <FontAwesomeIcon icon={faStar} /> 4,5
            </span>}
            {/* {user.transactions > 0 && <span className={styles.transactions}>
                <FontAwesomeIcon icon={faHandshake} />
                {user_transactions} ventas
            </span> */}
        </p>
    </div>
}

export default Author