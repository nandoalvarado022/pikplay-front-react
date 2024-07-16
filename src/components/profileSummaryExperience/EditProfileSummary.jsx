import styles from './styles.module.scss'

import useSystemStore from '../../hooks/useSystem'
import Button from '../button/Button'
import CloseButton from '../closeButton/CloseButton'

const EditProfileSummary = (props) => {
	const { isEditProfile, setIsEditProfile } = props
	const { userLogged, setUserLogged } = useSystemStore()
	const { backgroundColor, backgroundImage } = userLogged
	const colors = [
		"linear-gradient(45deg, #3095b359, #dc1919b5)",
		"linear-gradient(45deg, #3095b359, #81127eb5)"
	]

	const backgrounds = [
		"/images/backgrounds/bg-gamer.jpg",
		"/images/backgrounds/anime.jpeg",
		"/images/backgrounds/dog-and-guy.png"
	]

	const handleChange = (data) => {
		setUserLogged(data);
	}

	return <div className={`${isEditProfile ? styles.active : ''} ${styles.EditProfileSummary}`}>
		<div className={styles.topLine} onClick={() => setIsEditProfile(false)}></div>
		{/* <CloseButton onClick={() => setIsEditProfile(false)} /> */}
		<div className={styles.borderColor}>
			<label htmlFor="">Color del borde</label>
			<div className={styles.items}>
				{colors.map(item => {
					return <div
						className={`${backgroundColor == item ? styles.selected : ''} ${styles.item}`}
						onClick={() => handleChange({ backgroundColor: item })}
						style={{ background: item }}></div>
				})}
			</div>
		</div>
		<hr />
		<div className={styles.backgroundImage}>
			<label>Fondo</label>
			<div className={styles.items}>
				{
					backgrounds.map(item => {
						return <div
							className={`${backgroundImage == item ? styles.selected : ''} ${styles.item}`}
							onClick={() => handleChange({ backgroundImage: item })}>
							<img src={item} alt="" />
						</div>
					})
				}
			</div>
		</div>
		{/* <div className={styles.actions}>
			<Button color="blue">Guardar</Button>
		</div> */}
	</div>
}

export default EditProfileSummary
