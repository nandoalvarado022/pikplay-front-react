import styles from "./imageProfile.module.scss"
import { useSelector } from 'react-redux'

const ImageProfile = (props) => {
  const { category, picture } = useSelector((state) => state.user)
  const { isOpenPreviewProfile, setIsOpenPreviewProfile } = props
  return <div id="content_image_profile_menu" onClick={() => setIsOpenPreviewProfile && setIsOpenPreviewProfile(!isOpenPreviewProfile)} className={`content_image ${styles.content_image} ${styles[category]}`}>
    <span className={styles.picture} style={{ "background-image": `url(${picture})` }} />
  </div>
}

export default ImageProfile
