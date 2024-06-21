import styles from './styles_iacharacter.module.scss'

import React from 'react'

const IACharacter = (props) => {
	const { IAExpression, setIsvisible, className } = props
	return (
		<div className={`${styles.IACharacter} ${className ? styles[className] : ''}`} onClick={() => setIsvisible(true)}>
			<picture className={`${styles.head} ${styles[IAExpression]} `}>
			</picture>
			<div className={styles.circle}>
				<img className={styles.body} src="/images/ia/cuerpo.png" />
			</div>
		</div>
	)
}

export default IACharacter;
