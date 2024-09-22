import styles from './categoryBanner.module.scss'

import React from 'react'
import Link from 'next/link'
import { useEffect } from 'react'
import Image from 'next/image'

const CategoryBanner = ({ categoryId }) => {
  let image = '',
    link = '',
    text = ''
  switch (categoryId) {
    case 1:
      image = '/images/backgrounds/accesories.png'
      link = '/category/accesories'
      text = (
        <p>
          Los mejores <span className={styles.accesories}>Accesorios</span> para
          tu consola favorita
        </p>
      )
      break

    case 2:
      image = '/images/backgrounds/switch.jpeg'
      link = '/category/nintendo-switch'
      text = (
        <p>
          <span className={styles.switch}>Switch</span> para toda la familia
        </p>
      )
      break

    case 3:
      image = '/images/backgrounds/playstation.png'
      link = '/'
      text = (
        <p>
          Lo más jugado de{' '}
          <span className={styles.playstation}>Playstation</span>
        </p>
      )
      break

    case 4:
      image = '/images/backgrounds/xbox.png'
      link = '/'
      text = (
        <p>
          Universo <span className={styles.xbox}>XBOX</span>
        </p>
      )
      break

    case 5:
      image = '/images/backgrounds/geek.png'
      link = '/'
      text = (
        <p>
          Productos <span className={styles.xbox}>Geek</span>
        </p>
      )
      break

    case 6:
      image = '/images/backgrounds/pc-gamer.jpg'
      link = '/'
      text = (
        <p>
          PC <span className={styles.xbox}>Gamer</span>
        </p>
      )
      break

    case 7:
      image = '/images/backgrounds/anime.jpeg'
      link = '/'
      text = (
        <div>
          <p className={styles.anime}>
            <span>Anime Fans</span>
          </p>
          <video>
            Aquí va el video
          </video>
        </div>
      )
      break

    case 8:
      image = '/images/backgrounds/colombia-background.jpeg'
      link = '/'
      text = (
        <div>
          <p className={styles.anime}>
            Apoya lo<br />
            <span>Colombiano</span>
          </p>
          <video>
            Aquí va el video
          </video>
        </div>
      )
      break
  }

  useEffect(() => {
    // console.log('se ejecuto')
  }, [])

  return (
    <div className={styles.CategoryBanner}>
      <Link href={link} style={{ backgroundImage: `url(${image})` }}>
        {/* <Image
          layout='fill'
          className='object-center object-cover pointer-events-none'
          src={image}
          alt='Categoría' /> */}
        {text}
      </Link>
    </div>
  )
}

export default CategoryBanner
