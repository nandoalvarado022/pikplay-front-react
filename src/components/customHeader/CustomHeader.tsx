import styles from './custom_header.module.scss' // eslint-disable-line

import Author from '../card/Author'
import Button from '../button/Button'
import ChangeCity from './changeCity/ChangeCity'
import CountUp from 'react-countup'
import Link from 'next/link'
import PreviewUser from '../previewUser/PreviewUser'
import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import { IS_MOBILE } from '../../lib/variables'
// import recommended from '../../public/recommended'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { formatNumber, getCiudades, getFeed } from '../../lib/utils'
// import { useSelector } from 'react-redux'
import ImageGallery from 'react-image-gallery'
import { Alert } from '@mui/material';
import classNames from 'classnames'
import Skeleton from '@mui/material/Skeleton'
import SearchBox from './searchBox/SearchBox'
import useSearch from './searchBox/useSearch'
import Image from 'next/image'

const CustomHeader = () => {
  // const user = useSelector(state => state.user)
  const cities = getCiudades()
  // const city = user?.city
  const {
    handleCity,
    inputText,
    isLoading,
    results,
    setInputText,
    showSearchModal,
  } = useSearch()

  const images = [
    {
      original: '/images/banners/ps3-azul.jpeg',
      thumbnail: '/images/banners/ps3-azul.jpeg',
    },
    {
      original: '/images/banners/juanchofenix.jpeg',
      thumbnail: '/images/banners/juanchofenix.jpeg',
    },
  ]

  // const cityLabelSearch = cities.find(row => row.id == city) ? cities.find(row => row.id === city)?.label : null
  // const premiumResult = results.length > 0 ? results[0] : null

  return (
    <div id={styles.CustomHeader}>
      {/* <ChangeCity handleCity={handleCity} /> */}
      <ul>
        {(!IS_MOBILE || (IS_MOBILE && !showSearchModal)) && (
          <Link href='/'>
            <span>
              <Image
                alt='Logo de Pikplay'
                className={styles.logo}
                height={43}
                src='/images/logos/logo.svg'
                width={160}
              />
              {/* <div className={styles.slogan}>
                <span>
                  Compra y vende como <b>Gamer</b>
                </span>
              </div> */}
            </span>
          </Link>
        )}
        {/* TODO Descomentar cuando se implementen los productos */}
        {/* <SearchBox
          inputText={inputText}
          isLoading={isLoading}
          results={results}
          setInputText={setInputText}
        /> */}
      </ul>
    </div>
  )
}

export default CustomHeader
