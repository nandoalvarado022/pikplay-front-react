import React from 'react'

// import { goalImg } from '../../public/images/goals/lightning_bolt_2.jpg'
// import { closeChest } from './'
// import { openChest } from './open-chest.png'
import styles from './challenges.module.scss'
import { useQuery } from '@apollo/client'
import { GET_CHALLENGES } from '../../lib/utils.jsx'

import Box from '@material-ui/core/Box'
import Skeleton from '@material-ui/lab/Skeleton'
import Grid from '@material-ui/core/Grid'

const Challenges = () => {
	const { data, loading, error } = useQuery(GET_CHALLENGES, {
		context: {
			headers: {
				'Operation-Name': 'getChallenges'
			}
		},
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
			{loading && new Array(4).fill(null).map((_, i) => (
				<Skeleton
					key={i}
					variant='rect'
					width='100%'
					height={120}
					className='Card'
				/>
			))}
			{loading
				? new Array(4)
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
						finished
					}) => (
						<article key={id} className={`${styles.challenge} Card`}>
							<picture className=''>
								<img src='' alt='Thunder goal image' />
							</picture>
							<div className={styles.challengeDetails}>
								<h3 className={styles.challengeTitle}>{title}</h3>
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
							</div>
						</article>
					)
				)}
		</section>
	)
}
export default Challenges
