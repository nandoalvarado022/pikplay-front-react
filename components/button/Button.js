import React from 'react'
import { Button as ButtonMat } from '@material-ui/core'
import styles from './button.module.scss'

export default function Button({ animation, disabled, id, children, color, className, onClick, databutton }) {
    className = `${className} ${animation ? styles.animation : null}`
    color = disabled ? 'disabled' : color
    return <ButtonMat id={id} databutton={databutton} onClick={disabled ? null : onClick} className={`${styles.btn} ${styles[color]} ${className}`}>
        <span className={styles.text}>{children}</span>
    </ButtonMat>

}