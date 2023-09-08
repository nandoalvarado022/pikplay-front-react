import React from 'react'
import { motion } from 'framer-motion'
import styles from './button.module.scss'
import { Button as ButtonMat } from '@material-ui/core'
import PropTypes from 'prop-types'

export default function Button ({
  animation,
  children,
  className,
  color,
  databutton,
  disabled,
  id,
  onClick,
  outline,
  style
}) {
  className = `${className} ${animation ? styles.animation : null}`
  color = disabled ? 'disabled' : color

  return (
    <motion.button
      className={`${styles.btn} ${styles[color]} ${className} ${outline ? styles.outline : null}`}
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

Button.propTypes = {
  animation: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.string,
  databutton: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  onClick: PropTypes.func,
  outline: PropTypes.bool,
  style: PropTypes.object
}
