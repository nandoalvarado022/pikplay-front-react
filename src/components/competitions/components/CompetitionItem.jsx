import styles from '../competitions.module.scss'

import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import Button from '../../button/Button'
import { faDiceFive } from '@fortawesome/free-solid-svg-icons'
const { motion } = require('framer-motion')

const CompetitionItem = ({ competition, ind }) => {
  const goToastNotAvailable = () => toast('Esta actividad ya ha pasado')

  return <motion.article
    className={`Card ${styles.CompetitionItem}`}
    initial={{ y: '100%' }}
    key={ind}
    // onClick={() => competition.isActive ? handleCompetitionClick(competition.slug) : goToastNotAvailable}
    whileHover={{ scale: 1.1 }}
    animate={{ y: 0 }}
  >
    <h2>
      <Link href={`/concursos/${competition.slug}`}>{competition.title}</Link>
    </h2>
    <div>
      Números disponibles:
      <span className={styles.availableNumbers}>
        {competition.availableNumbers}
      </span>
    </div>
    <div className={styles.seller}>
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
    </div>
    <div className={styles.actions}>
      <Link href='/concursos/test-1'>
        <Button shine realistic color='yellow' className={styles.award}>Participar</Button>
      </Link>
      <Link href="/publicacion/nuevas-figuritas-de-kimetsu-no-yaiba-pregunta-por-tu-favorita?origin=/concursos">
        <Button shine realistic color='blue' className={styles.award}>Ver premio</Button>
      </Link>
    </div>
  </motion.article>
}

export default CompetitionItem
