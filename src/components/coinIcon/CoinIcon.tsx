import styles from './styles.module.scss'

import React, { useEffect, useRef, useState } from 'react'
import { formatNumber } from '../../../src/lib/utils'
import classNames from 'classnames'

interface CoinsProps {
  coins?: number
  isLabel?: boolean // Mostrar en texto "Pikcoins"
  hideNumber?: boolean
  multicoin?: boolean
  textColor?: string
}

const CoinIcon = ({ coins, isLabel, hideNumber, multicoin, textColor }: CoinsProps) => {
  const [isAnimate, setIsAnimate] = useState(false)
  coins = 100 //coins ? coins : useSelector(state => state.coins)
  const prevCountCoins = useRef()

  useEffect(() => {
    // prevCountCoins.current = coins
  })

  const previousCoins = prevCountCoins.current ? prevCountCoins.current : 0

  useEffect(() => {
    // getCoins()
  }, [])

  const animate = () => {
    setIsAnimate(true)
    setTimeout(() => {
      setIsAnimate(false)
    }, 2000)
  }

  const animateValue = (start, end, duration) => {
    let startTimestamp = null
    const step = timestamp => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      // setCoins(Math.floor(progress * (end - start) + start))
      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }
    window.requestAnimationFrame(step)
  }

  useEffect(() => {
    const initialCoins = 0
    animateValue(previousCoins, initialCoins, 1000)
    animate()
  }, [])

  return (
    <div
      className={classNames("Coins", {
        [styles.Coins]: true,
        [styles.animated]: isAnimate
      }
      )}
      onMouseEnter={animate}>
      <picture className={styles.coin} />
      {multicoin && <picture className={`${styles.coin} ${styles.multicoin}`} />}
      {!hideNumber && <div
        className={`f-s-14 ${styles.number} number`}
        style={{ color: textColor ? textColor : '#e5961d' }}>
        {formatNumber(coins)}
      </div>
      }

      {isLabel && <label
        style={{ color: textColor ? textColor : '#e5961d' }}>Pikcoins</label>}
    </div>
  )
}

export default CoinIcon
