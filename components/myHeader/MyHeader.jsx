import { useRouter } from "next/router"
import Link from "next/link"
import React, { useState, useEffect } from "react"
import { useAsyncAbortable } from 'react-async-hook'
import TextField from "@material-ui/core/TextField"
import useConstant from 'use-constant'
import AwesomeDebouncePromise from 'awesome-debounce-promise'
import { getFeed } from '../../lib/utils'
import PreviewUser from '../previewUser/PreviewUser'
import VARS from "../../lib/variables"
const { IS_MOBILE } = VARS
import styles from "./styles.module.scss"

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
	const { inputText, setInputText, search } = useSearchStarwarsHero()
	const router = useRouter()
	const [textSearch, setTextSearch] = useState("")
	const [results, setResults] = useState([])
	const [showSearchBox, setShowSearchBox] = useState(false)

	useEffect(() => {
		if (window.screen.width > 420) setShowSearchBox(true)
	}, [])

	function onTagsChange(event, values) {
		const slug = products.publications.find((x) => x.title == values).slug;
		router.push("/publicacion/" + slug);
	}

	useEffect(() => {
		const delayDebounceFn = setTimeout(async () => {
			// await getPublications()
		}, 3000)

		return () => clearTimeout(delayDebounceFn)
	}, [])

	return <div id={styles.Header}>
		<ul>
			<Link href="/">
				<span style={{ textAlign: "left" }}>
					<img alt="Logo de Pikplay" className={styles.logo} src="/images/logos/logo.png" alt="" />
					<div className={styles.slogan}>
						<span>Compra y vende como <b><i>Gamer</i></b></span>
					</div>
				</span>
			</Link>

			{
				<div onBlur={() => setTimeout(() => setInputText(''), 200)} className={styles.content_buscador}>
					<TextField className={styles.Textfield} onFocus={e => setInputText(e.target.value)} onChange={e => setInputText(e.target.value)} fullWidth label={IS_MOBILE ? '¿Buscas algo?' : "Nintendo switch, ps5, controles de xbox"} variant="outlined" />
					{
						search.result && search.result.length > 0 && <div className={styles.results}>
							<div className={styles.rows}>
								{
									search.result.map(item => {
										const link = `/publicacion/${item.slug}`
										return <Link href={link}>
											<article className={styles.row}>
												<img src={item.image_link} alt="" />
												<div>
													<a>{item.title}</a>
													<span className={styles.platform}>
														Playstation 4
													</span>
												</div>
											</article>
										</Link>
									})
								}
							</div>
						</div>
					}
					{!IS_MOBILE && <PreviewUser />}
				</div>
			}
		</ul>
	</div>
}

export default Header
