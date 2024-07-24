import styles from './onboarding.module.scss'

import React, { useEffect } from 'react'
import Button from '../button/Button'
import Image from "next/image"
import { useIAStore } from '../ia/IAstore'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Onboarding = () => {
    const items = [
        {
            background: "https://i.pinimg.com/564x/f4/d4/b9/f4d4b991d2bccaf2202b8a07bae108de.jpg",
            html: <>
                ¿Que es <span className={styles.yellow}>Pikplay</span>?
            </>,
            image: "/images/ia/character-full.svg",
            isCompleted: true,
        },
        {
            background: "https://i.pinimg.com/564x/f4/d4/b9/f4d4b991d2bccaf2202b8a07bae108de.jpg",
            html: <>
                ¿Que son las <span className={styles.yellow}>Pikcoins?</span>
            </>,
            image: "/images/others/coins-onboarding.svg",
        },
        {
            background: "https://i.pinimg.com/564x/f4/d4/b9/f4d4b991d2bccaf2202b8a07bae108de.jpg",
            html: <>
                Alcanza la <span className={styles.green}>liga</span> más top
            </>,
            image: "/images/icons/liga-oro-hiervas.svg",
        },
        {
            background: "https://i.pinimg.com/564x/f4/d4/b9/f4d4b991d2bccaf2202b8a07bae108de.jpg",
            html: <>
                ¡Refiere y gana!
            </>,
            image: "/images/icons/gif.svg",
        }
    ]
    const {
        handleUserMessage,
    } = useIAStore((state => state))

    useEffect(() => {
        // handleUserMessage('onboarding', {})
    }, [])

    return <section className={`page ${styles.Onboarding}`}>
        <div className={styles.titleContent}>
            <div className={styles.background}></div>
            <h1>Onboarding
                <small>Abre cada tarjeta para conocer lo que tenemos para ti 🎁</small>
            </h1>
        </div>
        <div className={styles.items}>
            {items.map(item => <div className={styles.item} onClick={() => handleUserMessage('onboarding', {})}>
                {/* <Image className={styles.background} src={item.background} width={564} height={564} /> */}
                <div className={styles.black_bg}></div>
                <Image className={styles.image} src={item.image} width={200} height={200} />
                <div className={styles.html}>{item.html}</div>
                <span className={styles.isCompleted}>
                    {item.isCompleted && <CheckCircleIcon />}
                </span>
            </div>)}
        </div>

        <div className={styles.texts}>
            <div className={styles.background}></div>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sem nibh, feugiat eget nulla quis, tristique consequat lorem.
            </p>
            <p>
                In facilisis laoreet dapibus. Cras ornare purus eu sem malesuada, in fermentum purus varius. In neque erat, vehicula ut lectus quis, lacinia accumsan turpis. Sed urna tellus, consectetur ac tempor non, accumsan id ipsum.
            </p>
        </div>
    </section>
}

export default Onboarding
