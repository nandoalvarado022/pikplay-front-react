import React from 'react'

import styles from './challenges.module.scss'
import { useQuery } from '@apollo/client'
import { GET_CHALLENGES } from '../../lib/utils.jsx'
import Coins from '../previewUser/Coins'

import Skeleton from '@material-ui/lab/Skeleton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  {faCheck}  from '@fortawesome/free-solid-svg-icons'


const Challenges = () => {
	const { data, loading } = useQuery(GET_CHALLENGES, {
		context: {
			headers: {
				'Operation-Name': 'getChallenges'
			}
		}
	})
	

	return (
		<section className={styles.ChallengeSection}>
			<div className={styles.challengeHeader}>
				<h3>¡Ve por más!</h3>
				<p>
					¡Completa desafíos y gana muchos pikcoins! <br />
					Cada dia habrá nuevos desafíos.
				</p>
			</div>
		
			{loading
				? new Array(3)
						.fill(null)
						.map((_, i) => (
							<Skeleton
								key={i}
								variant='rect'
								width='100%'
								height={120}
								className='Card'
							/>
						))
				: data.getChallenges.map(
						({
							id,
							title,
							targetPoints,
							currentPoints,
							prizeCoins,
							deadLine,
							image,
							description,
							finished
						}) => (
							<article key={id} className={`${styles.challenge}`}>
							
								{finished && <FontAwesomeIcon icon={faCheck} className={styles.challengeCompleteIcon} />}

								<picture className='' dangerouslySetInnerHTML={{ __html: image }}>
									
								</picture>
								<div className={styles.challengeDetails}>
									<h3 className={styles.challengeTitle}>{title}</h3>
									<p>{description}</p>
									<div className={styles.progressContainer}>
										<span
											className={styles.progressBar}
											style={{
												width: `calc((100% * ${currentPoints}) / ${targetPoints})`
											}}
										></span>
										<span className={styles.progressScore}>
											{currentPoints}/{targetPoints}
										</span>
									</div>
									<p>
										{' '}
										Expires on: {''}
										<span className={styles.deadLine}>{deadLine}</span>
									</p>
								</div>
								<div className={styles.prizeCoins}>
									<span>{prizeCoins}</span>
									<span>pikcoins</span>
								{/* <Coins coins={prizeCoins}/> */}
								</div>
							</article>
						)
				  )}
		</section>
	)
}
export default Challenges
