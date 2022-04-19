const { IS_MOBILE } = VARS
import Author from '../card/Author'
import Button from '../button/Button'
import ChangeCity from './changeCity/ChangeCity'
import CountUp from 'react-countup'
import Link from "next/link"
import PreviewUser from '../previewUser/PreviewUser'
import React, { useState, useEffect } from "react"
import TextField from "@material-ui/core/TextField"
import VARS from '../../lib/variables'
import recommended from '../../public/recommended'
import styles from "./styles.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons"
import { format_number, getCiudades, getFeed } from '../../lib/utils'
import { useSelector } from 'react-redux'
import ImageGallery from 'react-image-gallery'

const useDebounce = (value, wait = 0) => {
	const [debounceValue, setDebounceValue] = useState(value);
	useEffect(() => {
		const timeoutId = window.setTimeout(() => {
			setDebounceValue(value)
		}, wait)

		return () => {
			window.clearTimeout(timeoutId)
		}
	}, [value])
	return debounceValue
}

const Header = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [results, setResults] = useState([])
	const [showSearchModal, setShowSearchModal] = useState(false)
	const user = useSelector((state) => state.user)
	const [inputText, setInputText] = useState()
	const searchTerm = useDebounce(inputText, 1000)
	const cities = getCiudades()
	const city = user?.city

	const images = [
		{
			original: '/images/banners/ps3-azul.jpeg',
			thumbnail: '/images/banners/ps3-azul.jpeg',
		},
		{
			original: '/images/banners/juanchofenix.jpeg',
			thumbnail: '/images/banners/juanchofenix.jpeg',
		}
	];

	useEffect(() => {
		if (searchTerm) {
			setIsLoading(true)
			getFeed({ city, origin: 'searchBox', title: searchTerm }).then(results => {
				setResults(results)
				setIsLoading(false)
			})
				.catch(err => {
					setIsLoading(false)
				})
		}
	}, [searchTerm])

	const handleCity = (city) => {
		getFeed({ city, origin: 'cityChanged', title: searchTerm }).then(results => {
			setResults(results)
			setIsLoading(false)
		})
			.catch(err => {
				setIsLoading(false)
			})
	}

	return <div id={styles.Header}>
		<ul>
			<Link href="/">
				<span>
					<img alt="Logo de Pikplay" className={styles.logo} src="/images/logos/logo.svg" width={210} />
					<div className={styles.slogan}>
						<span>Compra y vende como <b>Gamer</b></span>
					</div>
				</span>
			</Link>

			{
				<div className={styles.content_buscador}>
					<div className={styles.content_Textfield}>
						<TextField autoComplete='off' className={styles.Textfield} disabled={isLoading} id='inpSearchButton' onFocus={e => setShowSearchModal(true)} onChange={e => setInputText(e.target.value)} fullWidth label={IS_MOBILE ? '¿Buscas algo?' : <span>
							<FontAwesomeIcon className="m-r-10" icon={faSearch} />
							¿Buscas algún videojuego?
						</span>} variant="standard" />
						<ChangeCity handleCity={handleCity} />
					</div>

					{
						showSearchModal && <div className={styles.results}>
							<FontAwesomeIcon className={styles.close_icon} icon={faPlus} onClick={() => setShowSearchModal(false)} />
							<section>
								{IS_MOBILE && <Button color='blue' onClick={() => setShowSearchModal(false)} style={{ float: 'left' }}>Volver</Button>}
								{results && <small>Se encontraron <CountUp end={results.length} /> resultados:</small>}
								<div className={styles['grid-container']}>
									{/* Resultado principal  */}
									{results && results.length > 0 && <Link href={`/publicacion/${results[0].slug}`}>
										<article className="primary pointer">
											<img className={styles.discount} src="/images/icons/discounts.png" />
											<img src={results[0].image_link} alt="" />
											<summary>
												<span>
													Llévalo por solo&nbsp;
													{!!results[0].sale_price && <price className={styles.price}>
														${format_number(results[0].sale_price)}
													</price>}
												</span>
												<h2>{results[0].title}</h2>
												<p>{results[0].title}</p>
											</summary>
										</article>
									</Link>
									}
								</div>
								{/* Listado de resultados */}
								<div className={styles.rows}>
									{
										results && results.map((item, ind) => {
											const link = `/publicacion/${item.slug}`
											if (ind > 0) return <Link href={link}>
												<article className={styles.row}>
													<img className={styles.product} src={item.image_link} alt="" />
													<div>
														<h2>{item.title}</h2>
														{!!item.sale_price && <price className={styles.price}>
															${format_number(item.sale_price)}
														</price>}
														{item.user && <Author parentView='HeaderSearch' user={item.user} />}
														<small className={styles.location}>
															{cities.find(row => row.id == item.city)?.label}
														</small>
													</div>
												</article>
											</Link>
										})
									}
								</div>
							</section>
							{/*  Sección recomendados */}
							<section className={styles.recommended}>
								<span>Contenido promocionado</span>
								<div className={styles.gallery}>
									<ImageGallery autoPlay={true} items={images} showThumbnails={false} showPlayButton={false} showFullscreenButton={false} showNav={false} />
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
