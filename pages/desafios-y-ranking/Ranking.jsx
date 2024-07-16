import styles from "./ranking.module.scss"

import React, { useEffect, useState } from "react"
import { getRankingSrv } from "../../src/services/ranking/rankingService"
import CoinIcon from "../../src/components/coinIcon/CoinIcon"
import ProfileImage from "../../src/components/profileImage/ProfileImage"
import PreviewUser from "../../src/components/previewUser/PreviewUser"
import ProfileSummaryExperience from "../../src/components/profileSummaryExperience/ProfileSummaryExperience"
import { Alert, FormControlLabel, Switch } from "@mui/material"
import { useIAStore } from "../../src/components/ia/IAstore"

const Ranking = () => {
    let ind = 0
    const [data, setData] = useState([])
    const {
        handleUserMessage,
        setIsvisible,
    } = useIAStore((state => state))

    useEffect(() => {
        getRankingSrv().then(resp => {
            setData(resp)
        })
    }, [])

    return <div className={styles.RankingComponent}>
        <Alert severity="info" icon={false} className={styles.alert}>
            El <b>Ranking de Temporada</b> termina el 12 Agosto
            <br /><smalll onClick={{}}>¿Quieres saber como funcionan el Ranking?</smalll>
        </Alert>
        <Alert severity="warning" icon={false} className={styles.alert} style={{ marginTop: '10px' }}>
            <FormControlLabel control={<Switch defaultChecked />} label="Mostrar solo mis referidos" />
            <smalll onClick={() => { handleUserMessage('referrals', {}); }}>¿Quieres saber como funcionan los Referidos?</smalll>
        </Alert>
        <div className={styles.list}>
            {data?.list && data.list.map((userInfoData) => {
                ind++;
                const { league } = userInfoData
                return <div className={`${styles.me} ${styles.item}`}>
                    <div className={`${styles[league]} ${styles.number}`}>{ind}</div>
                    <ProfileSummaryExperience {...{ userInfoData }} showDetails />
                </div>
            })}
        </div>
    </div>
}

export default Ranking
