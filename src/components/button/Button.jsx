import styles from './button.module.scss'

import React from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { Button as ButtonMat } from '@mui/material'

const Button = ({
  animation,
  border,
  children,
  className,
  color,
  databutton,
  disabled,
  isLink,
  id,
  onClick,
  outline,
  style,
}) => {
  className = `${className} ${animation ? styles.animation : null}`

  return (
    <motion.button
      className={`
      ${styles.btn} 
      ${border ? styles.border : null}
      ${styles[color]}
      ${className}
      ${outline ? styles.outline : null}
      ${isLink ? styles.link : null}
    `}
      databutton={databutton}
      id={id}
      onClick={disabled ? null : onClick}
      style={style}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
    >
      <ButtonMat>{children}</ButtonMat>
    </motion.button>
  )
}

export default Button
