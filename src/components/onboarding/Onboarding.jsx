import styles from './onboarding.module.scss'

import React, { useEffect } from 'react'
import Button from '../button/Button'
import Image from "next/image"
import { useIAStore } from '../ia/IAstore'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import useSystemStore from '../../hooks/storeSystem'
import { motion } from 'framer-motion'

const Onboarding = () => {
  const { setStoreValue } = useSystemStore()
  const items = [
    {
      background: "https://i.pinimg.com/564x/f4/d4/b9/f4d4b991d2bccaf2202b8a07bae108de.jpg",
      html: <>¿Que es <span className={styles.yellow}>Pikplay</span>?</>,
      image: "/images/ia/character-full.svg",
      isCompleted: true,
      messageCode: 'onboarding',
    },
    {
      background: "https://i.pinimg.com/564x/f4/d4/b9/f4d4b991d2bccaf2202b8a07bae108de.jpg",
      html: <>¿Que son las <span className={styles.yellow}>Pikcoins?</span></>,
      image: "/images/others/coins-onboarding.svg",
      messageCode: "pikcoins",
    },
    {
      background: "https://i.pinimg.com/564x/f4/d4/b9/f4d4b991d2bccaf2202b8a07bae108de.jpg",
      html: <>Alcanza la <span className={styles.green}>liga</span> <br />más top</>,
      image: "/images/icons/liga-oro-hiervas.svg",
      messageCode: "ranking",
    },
    {
      background: "https://i.pinimg.com/564x/f4/d4/b9/f4d4b991d2bccaf2202b8a07bae108de.jpg",
      html: <>¡Refiere y gana!</>,
      image: "/images/icons/gif.svg",
      messageCode: "referrals",
      imageStyle: { width: 70, height: 81 }
    },
    {
      background: "https://i.pinimg.com/564x/f4/d4/b9/f4d4b991d2bccaf2202b8a07bae108de.jpg",
      html: <>Te ayudamos en<br /> tus integraciones</>,
      image: "/images/icons/addi-logo.png",
      messageCode: "b2b/integrations",
      imageStyle: { width: 100, height: 100 }
    },
    {
      background: "https://i.pinimg.com/564x/f4/d4/b9/f4d4b991d2bccaf2202b8a07bae108de.jpg",
      html: <>Espacio personalizado para tus productos</>,
      image: "/images/icons/buid-your-brand.png",
      messageCode: "b2b/your-products",
    },
  ]

  const {
    handleUserMessage,
  } = useIAStore((state => state))

  useEffect(() => {
    // handleUserMessage('onboarding', {})
    setStoreValue('isOnboardingProcess', true)
  }, [])

  return <section className={`page ${styles.Onboarding}`}>
    <div className={styles.titleContent}>
      <div className={styles.background}></div>
      <h2>Conócenos
        <small>Abre cada tarjeta para conocer lo que tenemos para ti 🎁</small>
      </h2>
    </div>
    <div className={styles.items}>
      {
        items.map((item, ind) => {
          const { height, width } = item?.imageStyle || {}
          return <motion.div
            className={`${styles.item} ${ind < 1 && styles.active}`}
            onClick={() => handleUserMessage(item.messageCode, {})}
            whileHover={{ scale: 1 }}
            whileTap={{ scale: 0.7 }}>
            {/* <Image className={styles.background} src={item.background} width={564} height={564} /> */}
            <div className={styles.black_bg}></div>
            <Image className={styles.image} src={item.image} width={width || 200} height={height || 200} />
            <div className={styles.html}>{item.html}</div>
            {/* <span className={styles.isCompleted}>
            {item.isCompleted && <CheckCircleIcon />}
            </span> */}
          </motion.div>
        }
        )}
    </div>

    <div className={styles.texts}>
      <div className={styles.background}></div>
      <p>
        La idea inicial de <b>Pikplay Latam</b> sigue siendo reducir los fraudes en la compra y venta de consolas y videojuegos de manera online.
      </p>
      <p>
        Por ello en Pikplay solo encontraras <b>Aliados certificados</b>. 
        <br />Tiendas que han sido estudiadas y validadas por nuestro equipo. Tienen nuestro total respaldo y confianza.
      </p>
    </div>

    <div className={styles.aliados}>
      <h2>Aliados</h2>
      <div className={styles.items}>
        <div className="Card">
          <img src='/images/users/bluepanther.jpg' />
          <p>
            <b>Bluepanther</b>
            <div>Gaming</div>
            Medellín, Colombia
          </p>
        </div>
        <div className="Card">
          <img src='/images/users/hiro.jpeg' />
          <p>
            <b>Hiro</b>
            <div>Anime, Cosplay</div>
            Barranquilla, Colombia
          </p>
        </div>
      </div>
    </div>
  </section>
}

export default Onboarding
