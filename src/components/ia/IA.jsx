import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Button from '../button/Button'
import ReactTyped from "react-typed"
import CoinIcon from '../coinIcon/CoinIcon'
import { formatNumber } from '../../lib/utils'
import { useIAStore } from './IAstore'
import styles from './styles.module.scss'
import IACharacter from './IACharacter'

const IA = (props) => {
    const {
        isVisible,
        IAMessage,
        setIAMessage,
        IAOptions,
        setIAOptions,
        handleUserMessage,
        setIsvisible,
        IAExpression,
        containerHeight,
        IAHTMLMessage,
        IAHTMLSecondMessage
    } = useIAStore((state => state))

    return <div className={`${styles.IAElement} ${!isVisible ? styles.hide : null} `}>
        <div className={styles.box}>
            <div className={styles.title}>
                <b>Pikplay Colombia</b> ¡Hola!
                <div className={styles.hide} onClick={() => setIsvisible(false)}>x</div>
            </div>
            <div className={styles.text}>
                {/* style={{ height: containerHeight }} */}
                <div className={styles.list}>
                    {IAHTMLMessage && IAHTMLMessage}
                    {IAMessage && <p className={styles.IAMessage}>{IAMessage}</p>}
                    {IAHTMLSecondMessage && IAHTMLSecondMessage}
                    <div className={styles.buttons}>
                        {IAOptions}
                    </div>
                </div>
            </div>
            <IACharacter {...{ IAExpression, setIsvisible }} />
        </div>
    </div>
}

export default IA
