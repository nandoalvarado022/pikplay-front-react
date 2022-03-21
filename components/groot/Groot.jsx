import styles from './styles.module.scss'

const Groot = () => {
    return <div className={styles.Groot}>
        <img src="/images/characters/groot.png" alt="Imagen de groot" />
        <p>
            Seleccionados por el <span>editor</span>
        </p>
    </div>
}

export default Groot
