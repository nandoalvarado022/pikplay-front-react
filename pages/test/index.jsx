import styles from './test.module.scss'

import React, { useEffect } from 'react'

const Test = () => {
  useEffect(() => {

  }, [])

  return <div className={styles.Test}>
    <div className={styles.content}>
      <iframe src="https://pikplay.co" />
    </div>
  </div>
}

export default Test
