/* eslint-disable react/prop-types */
import React from 'react'
import styles from './imageProfile.module.scss'
import { useSelector } from 'react-redux'

const ImageProfile = (props) => {
  const { height, width } = props
  const { category, picture } = useSelector((state) => state.user)
  const { handleClickImage } = props
  return (<div
    className={`content_image ${styles.content_image} ${styles[category]}`}
    id="content_image_profile_menu"
    onClick={handleClickImage}
    style={{
      height,
      width
    }}
  >
    <span
      className={`${styles.picture} ${styles.star}`}
      style={{
        backgroundImage: `url(${picture})`,
        height,
        width
      }}
    // whileHover={{ rotate: [0, 15, - 15, 5, 0] }}
    />
  </div>)
}

export default ImageProfile
