import styles from './styles.module.scss'

const ProfileImage = ({ className, handleClickImage }) => {
    return <picture className={`${styles.ProfileImage} ${styles[className]}`} onClick={handleClickImage}>
        <img src="/images/users/user1.jpg" />
    </picture>
}

export default ProfileImage
