/* eslint-disable @next/next/no-img-element */
import styles from './menuMovil.module.scss'

import React from 'react'
import Link from 'next/link'
import PreviewUser from '../previewUser/PreviewUser'
import useSystemStore from '../../hooks/storeSystem'
import { useIAStore } from '../ia/IAstore'
import { faWarehouse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseDamage } from '@fortawesome/free-solid-svg-icons'
import { faCampground } from '@fortawesome/free-solid-svg-icons'
import { faGamepad } from '@fortawesome/free-solid-svg-icons'
// import { useSelector } from 'react-redux'

const { motion } = require('framer-motion')

const MenuMovil = () => {
  // const user = useSelector(state => state.user)
  const { userLogged } = useSystemStore((state => state))
  const {
    handleUserMessage,
  } = useIAStore((state => state))

  return (
    <div className={styles.MenuMovil}>
      <ol className={styles.mainOption}>
        <Link href='/categoria/[id]' as='/categoria/playstation'>
          <motion.a legacyBehavior whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }}>
            <img src='/images/icons/play.svg' alt='Playstation' />
            {/* <div className='f-s-10'>XBOX</div> */}
          </motion.a>
        </Link>
      </ol>
      <ol className={styles.mainOption}>
        <Link href='/categoria/[id]' as='/categoria/nintendo-switch'>
          <motion.a legacyBehavior whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }}>
            <img style={{ height: '28px' }} src='/images/icons/nintendo.svg' alt='Nintendo switch' />
            {/* <div className='f-s-10'>NINTENDO</div> */}
          </motion.a>
        </Link>
      </ol>
      <ol className={styles.mainOption}>
        <PreviewUser />
      </ol>
      <ol className={styles.mainOption}>
        <Link href='/' as='/'>
          <motion.a
            legacyBehavior
            className={styles.vender}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}>
            <img
              style={{ height: '38px' }}
              src='/images/icons/retro-2.svg'
              alt='Publicar articulo'
            />
            {/* <div className='f-s-10'>VENDER</div> */}
          </motion.a>
        </Link>
      </ol>
      <motion.ol
        className={styles.mainOption}
        onClick={() => handleUserMessage('welcome')}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.8 }}>
        <a>
          <img src='/images/ia/4.svg' />
          {/* <div className='f-s-10'>AYUDA</div> */}
        </a>
      </motion.ol>
    </div>
  )
}

export default MenuMovil
