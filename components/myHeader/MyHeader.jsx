const { IS_MOBILE } = VARS
import AwesomeDebouncePromise from 'awesome-debounce-promise'
import CountUp from 'react-countup'
import Link from "next/link"
import PreviewUser from '../previewUser/PreviewUser'
import React, { useState, useEffect } from "react"
import TextField from "@material-ui/core/TextField"
import VARS from '../../lib/variables'
import recommended from '../../public/recommended'
import stories from '../../public/stories'
import styles from "./styles.module.scss"
import useConstant from 'use-constant'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { format_number, getFeed } from '../../lib/utils'
import { useAsyncAbortable } from 'react-async-hook'
import { useRouter } from "next/router"

const searchStarwarsHero = async (text, abortSignal) => {
	const results = await getFeed({ title: text })
	return results
}

const useSearchStarwarsHero = () => {
	// Handle the input text state
	const [inputText, setInputText] = useState('');

	// Debounce the original search async function
	const debouncedSearchStarwarsHero = useConstant(() =>
		AwesomeDebouncePromise(searchStarwarsHero, 300)
	)

	const search = useAsyncAbortable(
		async (abortSignal, text) => {
			// If the input is empty, return nothing immediately (without the debouncing delay!)
			if (text.length === 0) {
				return [];
			}
			// Else we use the debounced api
			else {
				const res = debouncedSearchStarwarsHero(text, abortSignal);
				return res
			}
		},
		// Ensure a new request is made everytime the text changes (even if it's debounced)
		[inputText]
	);

	// Return everything needed for the hook consumer
	return {
		inputText,
		setInputText,
		search,
	};
}

const Header = () => {
	const [isLoading, setIsLoading] = useState(false)
	const { inputText, setInputText, search } = useSearchStarwarsHero()
	const router = useRouter()
	const [textSearch, setTextSearch] = useState('')
	const [results, setResults] = useState([])
	const [showSearchBox, setShowSearchBox] = useState(false)

	useEffect(() => {
		if (window.screen.width > 420) setShowSearchBox(true)
	}, [])

	return <div id={styles.Header}>
		<ul>
			<Link href="/">
				<span style={{ textAlign: "left" }}>
					<img alt="Logo de Pikplay" className={styles.logo} src="/images/logos/logo.png" />
					<div className={styles.slogan}>
						<span>Compra y vende como <b><i>Gamer</i></b></span>
					</div>
				</span>
			</Link>

			{
				<div onBlur={() => setTimeout(() => setInputText(''), 200)} className={styles.content_buscador}>
					<TextField className={styles.Textfield} disabled={isLoading} onFocus={e => setInputText(e.target.value)} onChange={e => setInputText(e.target.value)} fullWidth label={IS_MOBILE ? '¿Buscas algo?' : <span>
						<FontAwesomeIcon className="m-r-10" icon={faSearch} />
						Nintendo switch, ps5, controles de xbox
					</span>} variant="standard" />
					{
						search.result && search.result.length > 0 && <div className={styles.results}>
							<section>
								<small>
									Se encontraron <CountUp end={search.result.length} /> resultados:
								</small>
								<div className={styles['grid-container']}>
									{search.result && search.result.length > 0 && <div className="primary">
										<img className={styles.discount} src="/images/icons/discounts.png" />
										<img src={search.result[0].image_link} alt="" />
										<summary>
											<span>
												Llévalo por solo&nbsp;
												<price>$12.500</price>
											</span>
											<h2>{search.result[0].title}</h2>
											<p>{search.result[0].title}</p>
										</summary>
									</div>}
								</div>
								<div className={styles.rows}>
									{
										search.result.map(item => {
											const link = `/publicacion/${item.slug}`
											return <Link href={link}>
												<article className={styles.row}>
													<img src={item.image_link} alt="" />
													<div>
														<h2>{item.title}</h2>
														{!!item.sale_price && <price className={styles.price}>
															${format_number(item.sale_price)}
														</price>}
													</div>
												</article>
											</Link>
										})
									}
								</div>
							</section>

							<section className={styles.recommended}>
								<h3>Recomendados</h3>
								<div className={styles.rows}>
									{
										recommended.map(item => {
											const link = `/publicacion/${item.slug}`
											return <Link href={link}>
												<article className={styles.row}>
													<div>
														<h2>{item.title}</h2>
														{/* <span className={styles.platform}>
														Playstation 4
													</span> */}
													</div>
													<img src={item.image_link} alt="" />
												</article>
											</Link>
										})
									}
									{
										stories.map(item => {
											return <article>
												<h3>Por: {item.author}</h3>
												<img src={item.image} alt={`Imagen de historia de ${item.author}`} />
											</article>
										})
									}
								</div>
							</section>
						</div>
					}
					{!IS_MOBILE && <PreviewUser />}
				</div>
			}
		</ul>
	</div>
}

export default Header
