import styles from './ia.module.scss'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Button from '../button/Button'
import ReactTyped from "react-typed"
import CoinIcon from '../coinIcon/CoinIcon'
import { formatNumber } from '../../lib/utils'
import { useIAStore } from './IAstore'
import IACharacter from './IACharacter'
import { motion } from "framer-motion"

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

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 1 // Tiempo para que cada elemento hijo empiece a salir
            }
        }
    };

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
                    <motion.div
                        animate="visible"
                        className={styles.buttons}
                        initial="hidden"
                        variants={container}
                    >
                        {IAOptions}
                    </motion.div>
                </div>
            </div>
            <IACharacter {...{ IAExpression, setIsvisible }} />
        </div>
    </div>
}

export default IA
