import Link from 'next/link'
import styles from './styles.module.scss'

const Groot = ({ categoryId }) => {
    let image, link, text
    switch (categoryId) {
        case 2:
            image = '/images/backgrounds/switch.jpeg'
            link = '/category/nintendo-switch'
            text = <p>
                <span className={styles.switch}>Switch</span> para toda la familia
            </p>
            break;

        case 3:
            image = '/images/backgrounds/playstation.png'
            link = '/'
            text = <p>
                Lo más jugado de <span className={styles.playstation}>Playstation</span>
            </p>
            break;

        case 4:
            image = '/images/backgrounds/xbox.png'
            link = '/'
            text = <p>
                Universo <span className={styles.xbox}>XBOX</span>
            </p>
            break;

        default:
            break;
    }
    return <div className={styles.Groot}>
        <Link href={link}>
            <a style={{backgroundImage: `url(${image}`}}>
                {text}
            </a>
        </Link>
    </div>
}

export default Groot
