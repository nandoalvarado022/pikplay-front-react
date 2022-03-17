import styles from "./imageProfile.module.scss"
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'

const ImageProfile = (props) => {
  const { category, picture } = useSelector((state) => state.user)
  const { handleClickImage } = props
  return <div id="content_image_profile_menu" onClick={handleClickImage} className={`content_image ${styles.content_image} ${styles[category]}`}>
    <motion.span whileHover={{ rotate: [0, 15, - 15, 5, 0] }} className={styles.picture} style={{ "backgroundImage": `url(${picture})` }} />
  </div>
}

export default ImageProfile
