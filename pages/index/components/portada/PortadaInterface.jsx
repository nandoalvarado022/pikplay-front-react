import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Footer from '../../../../src/components/footer/Footer'
import Card from '../../../../src/components/card/Card'
import Advertisements from '../../../../src/components/advertisements/Advertisements.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-regular-svg-icons'
// import { useLazyQuery } from '@apollo/client'
import { GET_FOLLOWED_PUBLICATIONS } from '../../../../src/lib/utils'
import FullScreenWidget from '../fullScreenWidget/FullScreenWidget'
import styles from './portada.module.scss'
import FloatingChallenges from '../floatingChallenges/FloatingChallenges.jsx'
import Author from '../../../../src/components/card/Author.jsx'
import Link from 'next/link.js'

const { IS_MOBILE } = '../../lib/variables'

const CategoryBanner = dynamic(
  () => import('../../../../src/components/categoryBanner/CategoryBanner.jsx'),
  { ssr: false },
)

const SpecialBanner = ({ category, popularyItem, starItem }) => {
  return (
    <div id={styles.SpecialBanner}>
      <div className={styles.box}>
        <div className={styles.title}>Lo más visto por los gamers</div>
        <Card key={popularyItem.id} permitirLink={true} {...popularyItem} />
      </div>
      <img
        src='/images/banners/banner-varios-juegos.png'
        alt='Juegos SSwitch en promoción'
      />
      <div className={styles.box}>
        <div className={styles.title}>Anuncio</div>
        <Card permitirLink={true} {...starItem} />
      </div>
    </div>
  )
}

let ModalLead = () => <div />

const PortadaInterface = ({
  category,
  handleFavorite,
  feed,
  popularyItem,
  setFeed,
  starItem,
}) => {
  const [showVideo, setShowVideo] = useState(false)
  const isOpen =
    typeof sessionStorage != 'undefined' &&
    JSON.parse(sessionStorage.getItem('notifications'))?.home
  const [showNotification, setShowNotification] = useState(!isOpen)
  const [showModalLead, setShowModalLead] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('user') == null) setShowVideo(true)
    // getFollowedPublications()

    // show modal lead
    if (!localStorage.getItem('modal_lead')) {
      setTimeout(() => {
        setShowModalLead(true)
      }, 5000)
    }

    ModalLead = dynamic(
      () => import('../../../../src/components/modalLoead/ModalLead'),
      { ssr: false },
    )
  }, [])

  // TODO cambiar llamado al servicio
  // const [getFollowedPublications, { data }] = useLazyQuery(
  //   GET_FOLLOWED_PUBLICATIONS,
  //   {
  //     fetchPolicy: 'no-cache',
  //     variables: {
  //       user: 61,
  //     },
  //     onCompleted: ({ getFollowedPublications }) => {
  //       if (getFollowedPublications.length > 0) {
  //         const _publications = feed ? [...feed] : []
  //         getFollowedPublications.forEach(item => {
  //           let element = _publications.find(p => p.id == item.id)
  //           if (element)
  //             _publications.find(p => p.id == item.id).following = true
  //         })
  //         setFeed(_publications)
  //       }
  //     },
  //   },
  // )

  const Products = () => {
    let previousCategory = null
    let currentCategory = null
    const adsAuthor = {
      name: "Hito Tienda Anime",
      picture: "https://pikplay-bucket.nyc3.cdn.digitaloceanspaces.com/users/hiropicture.jpg",
    }

    return <div className={styles.PortadaInterfaceComponent}>
      <div className={styles.main}>
        <div className='listadoRodadas'>
          {feed &&
            feed.map((item, ind) => {
              currentCategory = item.category_id
              const showCategoryBanner = previousCategory !== currentCategory
              if (showCategoryBanner) previousCategory = currentCategory

              return (
                <>
                  {showCategoryBanner && (
                    <CategoryBanner categoryId={currentCategory} />
                  )}
                  {/* {ind == 0 && <div className={styles.ads}>
                    <h3>
                      <p>
                        ¡Micro Hiro <span>Event!</span>
                      </p>
                      <span className={styles.store}>
                        <Author parentView='CardDetalleProducto' user={adsAuthor} />
                      </span>
                    </h3>
                    <video src="/videos/anuncio-hiro.mov" autoPlay controls />
                  </div>} */}
                  <Card {...{ handleFavorite, ...item }} />
                </>
              )
            })}
        </div>
      </div>
    </div>
  }

  const Maintenance = () => {
    return (
      <h3 style={{ textAlign: 'center' }}>
        <FontAwesomeIcon icon={faClock} style={{ marginRight: '10px' }} />
        Mantenimiento programado en progreso
      </h3>
    )
  }

  return (<>
    <section className='page'>
      {feed && feed.length < 1 && <Maintenance />}
      {!category && <Advertisements />}
      <Link className={styles.membresiaSellerBanner} href='/concursos' as='/concursos'>
        <img className={`shine`} src="/images/banners/banner_membresia_de_cortesia_seller.png" />
      </Link>
      <Link className={styles.videoPortada} href='/concursos' as='/concursos'>
        <video
          autoPlay
          className={styles.video}
          id='background-video'
          muted
          src='/videos/llegaron_los_concursos.mp4'
        />
      </Link>
      {/* Aquí se llama un video que esta en la carpeta public */}
      {/* <SpecialBanner {...{ category, popularyItem, starItem }} /> */}
      {/* <FullScreenWidget /> */}
      {showModalLead && <ModalLead />}
      <Products />
    </section>
    {/* <Footer /> */}
  </>
  )
}

export default PortadaInterface
