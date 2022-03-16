import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock } from "@fortawesome/free-regular-svg-icons"
import Card from '../card/Card'
import Footer from '../footer/Footer'
import styles from "./portada.module.scss"
import { useEffect, useState } from 'react';
import HolaJuanito from "../holaJuanito/HolaJuanito"

const SpecialBanner = ({ category, popularyItem, starItem }) => {
  if (!category && popularyItem && starItem) {
    return <div id={styles.SpecialBanner}>
      <div className={styles.box}>
        <div className={styles.title}>Lo más visto por los gamers</div>
        <Card key={popularyItem.id} permitirLink={true} {...popularyItem} />
      </div>
      <img src="/images/banners/banner-varios-juegos.png" alt="Juegos SSwitch en promoción" />
      <div className={styles.box}>
        <div className={styles.title}>Anuncio</div>
        <Card key={starItem.id} permitirLink={true} {...starItem} />
      </div>
    </div>
  } else {
    switch (category) {
      case "playstation":
        return <div className={styles['playstation-banner']}>
          <img alt="Banner playstation" className="block-center" src="https://www.combogamer.com/wp-content/uploads/2014/05/ps4-launch-banner.png" />
        </div>
      case "nintendo-switch":
        return <div className={styles['switch-banner']}>
          <img alt="Banner nintendo switch" className="block-center" src="https://switchplayer.net/wp-content/uploads/2017/03/Nintendo-Switch-List-Banner-1-820x171.png" />
        </div>
      default:
        return <div></div>
    }
  }
}

const PortadaInterface = ({ category, feed, popularyItem, starItem }) => {
  const [showVideo, setShowVideo] = useState(false)
  const isOpen = typeof sessionStorage != "undefined" && JSON.parse(sessionStorage.getItem("notifications"))?.home
  const [showNotification, setShowNotification] = useState(!!!isOpen)

  useEffect(() => {
    if (localStorage.getItem("user") == null) setShowVideo(true)
    setTimeout(() => {
      document.querySelectorAll("video").forEach(item => {
        item.play()
      })
    }, 2000)
  }, [])

  return <React.Fragment>
    {(feed && feed.length < 1) && <h3 style={{ textAlign: "center" }}>
      <FontAwesomeIcon icon={faClock} style={{ marginRight: "10px" }} />
      Mantenimiento programado en progreso
    </h3>}
    {!category && <HolaJuanito />}
    {
      // showVideo && <div className={styles.videoContent}>
      //   <video onClick={handlePlay} className="block-center" src="/videos/video1.mp4" />
      // </div>
    }
    <SpecialBanner {...{ category, popularyItem, starItem }} />
    <div className={styles.view_Rodadas}>
      <div className={styles.main}>
        <div className="listadoRodadas">
          {feed && feed.map((item, ind) => {
            return <React.Fragment>
              <Card special_title="Más vendido" {...item} />
            </React.Fragment>
          })}
        </div>
      </div>
    </div>
    <Footer />
  </React.Fragment>
}

export default PortadaInterface