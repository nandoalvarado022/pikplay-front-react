import React, { useEffect, useState } from 'react'
import Insignia from './Insignia'
import styles from './insignias.module.scss'

const data = {
  insignias: [
    { id: 'first', name: 'Primera compra' },
  ]
}

const Insignias = (props) => {
  const { title, favoriteInsignia } = props
  const dataInsignias = [
    { id: "daily-login", image: "/images/icons/calendar-hierva.svg", name: "Ingreso diario", hidden: false },
    { id: "liga-oro", image: "/images/icons/liga-oro-hiervas.svg", name: "Liga Oro", hidden: false }
  ]
  const [insignias, setInsignias] = useState(dataInsignias)

  useEffect(() => {
    setTimeout(() => {
      // const newInsignia = { id: 'second', name: 'Segunda compra', isNew: true }
      if (favoriteInsignia) {
        const insigniasFormatted = dataInsignias.map(item => (item.hidden = item.id != favoriteInsignia, item))
        debugger;
        setInsignias(insigniasFormatted)
      }
    }, 1000)
  }, [])

  return (
    <div className={styles.Insignias}>
      <h4>{title}</h4>
      <div className={styles.list}>
        {
          insignias.map(item => {
            return !item.hidden ? <Insignia data={item} key={item.id} /> : <></>
          })
        }
      </div>
    </div>
  )
}

export default Insignias
