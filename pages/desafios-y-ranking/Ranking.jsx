import styles from "./ranking.module.scss"

import React, { useEffect, useState } from "react"
import { getRankingSrv } from "../../src/services/ranking/rankingService"
import CoinIcon from "../../src/components/coinIcon/CoinIcon"
import ProfileImage from "../../src/components/profileImage/ProfileImage"
import PreviewUser from "../../src/components/previewUser/PreviewUser"
import ProfileSummaryExperience from "../../src/components/profileSummaryExperience/ProfileSummaryExperience"

const Ranking = () => {
    let ind = 0
    const [data, setData] = useState([])
    useEffect(() => {
        getRankingSrv().then(resp => {
            setData(resp)
        })
    }, [])

    return <div className={styles.RankingComponent}>
        <div className={styles.list}>
            {data?.list && data.list.map((userInfoData) => {
                ind++;
                return <div className={`${styles.me} ${styles.item}`}>
                    <div className={styles.number}>{ind}</div>
                    <ProfileSummaryExperience {...{ userInfoData }} showDetails />
                </div>
            })}
        </div>
    </div>
}

export default Ranking
