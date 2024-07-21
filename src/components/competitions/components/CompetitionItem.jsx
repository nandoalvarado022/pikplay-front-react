import styles from '../competitions.module.scss'

import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
const { motion } = require('framer-motion')

const CompetitionItem = ({ competition, ind, handleCompetitionClick }) => {
    const goToastNotAvailable = () => toast('Esta actividad ya ha pasado')

    return <motion.article
        className={`Card ${styles.CompetitionItem}`}
        key={ind}
        initial={{ y: '100%' }}
        onClick={() => competition.isActive ? handleCompetitionClick(competition.slug) : goToastNotAvailable}
        whileHover={{ scale: 1.1 }}
        animate={{ y: 0 }}>
        <h2>{competition.title}</h2>
        <div>
            Números disponibles:
            <span className={styles.availableNumbers}>
                {competition.availableNumbers}
            </span>
        </div>
        <p className={styles.seller}>
            <div>
                <img width={80} src={competition.seller.picture} />
            </div>
            <div>
                {/* <img width={200} style={{ right: competition.right }} src={competition.image} /> */}
                {competition.seller.name}
                <div className={styles.calification}>
                    {[1, 1, 1].map(item => <FontAwesomeIcon className='icon' icon={faStar} />)}
                </div>
                <div>Ha realizado 5 concursos en los últimos 3 meses</div>
            </div>
        </p>
    </motion.article>
}

export default CompetitionItem
