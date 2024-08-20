import styles from './styles.module.scss'

import React from 'react'

const Desktop = () => {
    return <div className={styles.Desktop}>
        <div className={styles.content_iframe}>
            <iframe src="/?device=desktop" />
        </div>
        <div className={styles.bottom}>

        </div>
    </div>
}

export default Desktop
