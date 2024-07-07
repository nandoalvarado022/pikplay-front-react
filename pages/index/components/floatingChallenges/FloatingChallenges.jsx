import styles from './styles.module.scss';

import React from 'react'
import CoinIcon from '../../../../src/components/coinIcon/CoinIcon'

const FloatingChallenges = () => {
    // Cuadro 
    return (
        <div className={styles.FloatingChallenges}>
            <div className={styles.description_content}>
                <span>
                    Comparte tu link de referido con 5 amigos
                </span>
                <div className={styles.progress_bar}>
                    0/5
                </div>
            </div>
            <div className={styles.coin_content}>
                <CoinIcon coins={1000} />
            </div>
        </div>
    );
}

export default FloatingChallenges;
