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
const challenges = [
	{
		id: '42d',
		title: 'Buy a product',
		description: '',
		targetPoints: 1,
		currentPoints: 1,
		prizeCoins: 30,
		finished: true,
		deadLine: '17 Sep'
	},
	{
		id: '42z',
		title: 'Invite 5 friends',
		description: '',
		targetPoints: 5,
		currentPoints: 4,
		prizeCoins: 40,
		finished: false,

		deadLine: '17 Sep'
	},
	{
		id: '34k',
		title: 'Share on instagram or twitter',
		description: '',
		targetPoints: 1,
		currentPoints: 1,
		prizeCoins: 15,
		finished: true,

		deadLine: '17 Sep'
	},
	{
		id: '34f',
		title: 'Buy 10 products in one week',
		description: '',
		targetPoints: 10,
		currentPoints: 4,
		prizeCoins: 80,
		finished: false,
		deadLine: '17 Sep'
	}
]
const Challenges = () => {
	const { data, loading, error } = useQuery(GET_CHALLENGES, {
		variables: {
			limit: 4
		},
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
			{new Array(4).fill(null).map((_, i) => (
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
				: challenges.map(
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
