const { motion } = require("framer-motion")
import { useQuery } from '@apollo/client'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { GET_ARTICLES } from '../../lib/utils'
import styles from './styles.module.scss'

const Articles = () => {
    const { data } = useQuery(GET_ARTICLES, {
        variables: {
            limit: 4
        }
    })

    const handleClick = () => {
    }

    return <div id={styles.ArticlesComponent}>
        <div className={styles.arrows}>
            <FontAwesomeIcon icon={faArrowLeft} onClick={handleClick} />
            <FontAwesomeIcon icon={faArrowRight} onClick={handleClick} />
        </div>
        <section className={styles.list}>
            {
                data?.getArticles && data.getArticles.map(item => {
                    return <Link target="_BLANK" href={`/articulo/${item.slug}`}>
                        <motion.article
                            className='Card'
                            key={item.id}
                            // whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.8 }}>
                            <h1>{item.title}</h1>
                            <summary>{item.summary}</summary>
                            <span className={styles.image_card} dangerouslySetInnerHTML={{ __html: item.image_card }}></span>
                        </motion.article>
                    </Link>
                })
            }
        </section>
    </div>
}

export default Articles
