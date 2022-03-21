import Link from 'next/link'
import styles from './styles.module.scss'

const Groot = ({ ind }) => {
    let image, link, text
    switch (ind) {
        case 3:
            image = '/images/characters/super-mario.png'
            link = '/category/nintendo-switch'
            text = <p>
                <span className={styles.switch}>Switch</span> para toda la familia
            </p>
            break;

        case 6:
            image = '/images/characters/super-mario.png'
            link = '/'
            text = <p>
                Lo más jugado de <span className={styles.playstation}>Playstation</span>
            </p>
            break;

        case 9:
            image = '/images/characters/super-mario.png'
            link = '/'
            text = <p>
                Universo <span className={styles.xbox}>XBOX</span>
            </p>
            break;

        default:
            break;
    }
    return <div className={styles.Groot}>
        <img alt={text} src={image} />
        <Link href={link}>
            <a>
                {text}
            </a>
        </Link>
    </div>
}

export default Groot
