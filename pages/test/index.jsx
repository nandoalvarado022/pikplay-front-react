import React, { useEffect } from 'react'
import { getEnvVariables } from '../../src/services/competition/competitionService'

const Test = () => {
  useEffect(() => {
    getEnvVariables()
      .then(data => {
        console.log(data);
      })
  }, [])

  return <div>
    Esta es una prueba
  </div>
}

export default Test
