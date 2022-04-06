const { motion } = require("framer-motion")
import { useQuery, gql } from '@apollo/client'
import Link from 'next/link'
import { GET_ARTICLES } from '../../lib/utils'
import styles from './styles.module.scss'

const Articles = () => {
    const { data } = useQuery(GET_ARTICLES, {
        variables: {
            limit: 2
        }
    })

    return <div id={styles.ArticlesComponent}>
        {
            data?.getArticles && data.getArticles.map(item => {
                return <Link target="_BLANK" href={`/articulo/${item.slug}`}>
                    <motion.article
                        className='Card'
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.8 }}
                    >
                        <h1>{item.title}</h1>
                        <summary>{item.summary}</summary>
                        <div className={styles.image_card} dangerouslySetInnerHTML={{ __html: item.image_card }}></div>
                    </motion.article>
                </Link>
            })
        }
    </div>
}

export default Articles
