import React, { useEffect } from 'react'

import styles from './styles.module.scss'

const Test = () => {

  useEffect(() => {
    const numb = document.querySelector(".numb");
    let counter = 0;
    setInterval(() => {
      if (counter == 100) {
        clearInterval();
      } else {
        counter += 1;
        numb.textContent = counter + "%";
      }
    }, 80);
  }, [])

  return (<>
    <div className={styles.circular}>
      <div className={styles.inner}></div>
      <div className={styles.outer}></div>
      <div className={`numb ${styles.numb}`}>
        0 %
      </div>
      <div className={`${styles.circle}`}>
        <div className={`${styles.dot}`}>
          <span></span>
        </div>
        <div className={`${styles.bar}`}>
          <div className={`${styles.progress}`}></div>
        </div>
        <div className={`${styles.bar} ${styles.right}`}>
          <div className={`${styles.progress}`}></div>
        </div>
      </div>
    </div>
  </>
  )
}

export default Test
