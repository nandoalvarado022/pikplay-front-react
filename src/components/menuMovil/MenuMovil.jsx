/* eslint-disable @next/next/no-img-element */
import styles from './menuMovil.module.scss'

import React from 'react'
import Link from 'next/link'
import PreviewUser from '../previewUser/PreviewUser'
import useSystemStore from '../../hooks/useSystem'
import { useIAStore } from '../ia/IAstore'
// import { useSelector } from 'react-redux'

const { motion } = require('framer-motion')

const MenuMovil = () => {
  // const user = useSelector(state => state.user)
  const { userLogged } = useSystemStore((state => state))
  const {
    setIsvisible,
  } = useIAStore((state => state))

  return (
    <div className={styles.MenuMovil}>
      <ol className={styles.mainOption}>
        <Link href='/publicacion/crear' as='/publicacion/crear'>
          <motion.a
            legacyBehavior
            className={styles.vender}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}>
            <img
              style={{ height: '38px' }}
              src='https://icons.veryicon.com/png/o/miscellaneous/very-thin-linear-icon/camera-310.png'
              alt='Publicar articulo'
            />
            <div className='f-s-10'>VENDER</div>
          </motion.a>
        </Link>
      </ol>
      <ol className={styles.mainOption}>
        <Link href='/categoria/[id]' as='/categoria/nintendo-switch'>
          <motion.a legacyBehavior whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }}>
            <img style={{ height: '28px' }} src='/images/icons/nintendo.svg' alt='Nintendo switch' />
            <div className='f-s-10'>NINTENDO</div>
          </motion.a>
        </Link>
      </ol>
      <ol className={styles.mainOption}>
        <PreviewUser />
      </ol>
      <ol className={styles.mainOption}>
        <Link href='/categoria/[id]' as='/categoria/playstation'>
          <motion.a legacyBehavior whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }}>
            <img src='/images/icons/play.svg' alt='Playstation' />
            <div className='f-s-10'>XBOX</div>
          </motion.a>
        </Link>
      </ol>
      <motion.ol
        className={styles.mainOption}
        onClick={() => setIsvisible(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.8 }}>
        <a>
          <img src='/images/ia/4.svg' />
          <div className='f-s-10'>AYUDA</div>
        </a>
      </motion.ol>
    </div>
  )
}

export default MenuMovil
