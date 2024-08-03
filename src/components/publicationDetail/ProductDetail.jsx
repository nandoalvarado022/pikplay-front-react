/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import styles from './product-detail.module.scss'

import React, { useRef } from 'react'
import Button from '../button/Button'
import CoinsByBuy from '../coinsByBuy/CoinsByBuy'
import Footer from '../footer/Footer'
import Grow from '@mui/material/Grow'
import ImageGallery from 'react-image-gallery'
import { formatNumber } from '../../lib/utils'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import Author from '../card/Author'
import Product from '../../interfaces/Product'
import useSystemStore from '../../hooks/storeSystem'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons'
import { faMarker } from '@fortawesome/free-solid-svg-icons'
import { faMapMarker } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { Tooltip } from '@mui/material'
import CashbackTag from '../card/cashbackTag/CashbackTag'
import Articles from '../articles/Articles'
import { ArrowBackIosNew } from '@mui/icons-material'
import BottomSheets from '../bottomSheets/BottomSheets'

const ProductDetail = ({
  apply_cashback,
  banner_bottom,
  datosPublicacion,
  descuento = 0,
  handleHablarVendedor,
  indice_item,
  origin,
}) => {

  const {
    description,
    images,
    quantity,
    price,
    slug,
    title,
    user: seller,
    cashback_available,
  } = datosPublicacion || {}
  const formattedImages = images.map(item => ({
    thumbnail: item.url,
    original: item.url,
  }))
  const ref_descripcion_imagen = useRef(null)
  const { userLogged } = useSystemStore()
  indice_item = indice_item ? indice_item : 1
    ; (price == price) == 0 || price == '' ? null : price

  let buttonLabel, buttonLink;
  if ((origin || '').includes('concursos')) {
    buttonLabel = 'Volver a los concursos'
    buttonLink = origin
  } else buttonLabel = quantity > 0 ? 'Lo quiero' : 'Reservar'
  debugger

  return (
    <div key={indice_item} className={`${styles.ProductDetail}`}>
      <Grow key={indice_item} timeout={500} in={true} style={{ opacity: 1 }}>
        <div ref={ref_descripcion_imagen} className={`${styles.descripcion_imagen}`}>
          <div className="contentTitle">
            <Link href='/'>
              <ArrowBackIosNew className='icon backIcon' />
            </Link>
            <h1>
              {title}
              <Tooltip title='Marcar como Favorito'>
                <FontAwesomeIcon className='icon' icon={faHeart} style={{ marginLeft: '10px' }} />
              </Tooltip>
            </h1>
          </div>
          <div className={`Card ${styles.left}`}>
            <div className={styles.content_imagen}>
              <ImageGallery
                items={formattedImages}
                lazyLoad={false}
                showPlayButton={false}
                showBullets={false}
                showFullscreenButton={false}
              />
            </div>

            <div className={`${styles.Card} ${styles['productos-relacionados']}`}>
              {/* <h3 className="text-center">Productos que te pueden interesar</h3> */}
              {/* <div className="listadoRodadas">
              {["", "", ""].map((current, ind) => {
                const item = feed[ind]
                return <Card key={ind} special_title="Más vendido" destacada={true} doc_id={item.id} permitirLink={true} {...item} coleccion={item.coleccion} indice_item={ind} />
              })}
            </div> */}
            </div>
          </div>

          <div className={styles.descripcion}>
            <div className={`Card ${styles.Card}`}>
              {/* {!!user.is_admin && (
                <Link href={'/publicacion/' + slug + '/editar'}>
                  <a className='underline'>Editar</a>
                </Link>
              )} */}
              {/* Si aplica cashback */}
              {apply_cashback && (
                <span
                  title='Ganarás Pikcoins por hacer esta compra'
                  className={styles.apply_cashback}
                >
                  <picture className={styles.coin} />
                  ¡Cashback!
                </span>
              )}

              <div className={styles.content_precio}>
                {descuento > 0 && (
                  <span className='descuento logDetalle'>
                    {' '}
                    -{descuento}%{' '}
                  </span>
                )}
                {!!price && (
                  <span className={styles.nuevoPrecio}>
                    ${formatNumber(price)}
                  </span>
                )}
                {cashback_available && <CashbackTag />}
              </div>

              <div className={`flex ${styles.compra_author}`}>
                <BottomSheets isBottomSheets backgroundBlocked={false}>
                  <div className={styles.content_comprar}>
                    <Button color='link'>
                      Preguntar sobre <br />este producto
                    </Button>
                    {!buttonLink && <Button realistic color='blue' onClick={handleHablarVendedor}>
                      {buttonLabel}
                    </Button>}
                    {buttonLink && <Link href={buttonLink}>
                      <Button realistic color='blue'>
                        {buttonLabel}
                      </Button>
                    </Link>}
                  </div>
                </BottomSheets>
                <div className={styles.content_author}>
                  <Author parentView='CardDetalleProducto' user={seller} />
                </div>
              </div>

              {!!seller?.certificate && price && (
                <CoinsByBuy price={price} />
              )}

              <p className={styles.beneficsPostBought}>
                Con esta compra obtendras <span>1.500 EXP</span>
                y ademas <span className={styles.cashback}>1.500 Pikcoins</span>
              </p>

              <p>
                <FontAwesomeIcon className='icon' icon={faMapMarker} style={{ marginRight: '10px' }} />
                Solo entrega en tienda fisica
              </p>

              <div className={styles.description}>
                <p className={styles.title}>Sobre este producto</p>
                <p className='font-a' dangerouslySetInnerHTML={{ __html: description }}>
                </p>
              </div>
              <Articles />
              <p>
                <a
                  className={`${styles.report} underline`}
                  href='https://api.whatsapp.com/send?phone=573187414972&text=Quiero reportar una publicación de pikplay.co'
                  target='_BLANK'
                  rel="noreferrer">
                  <ChatBubbleOutlineIcon />
                  &nbsp;
                  Reportar publicación
                </a>
              </p>
            </div>
          </div>
        </div>
      </Grow>
      {banner_bottom && (
        <div>
          <img
            alt='Banner publicitario del seller'
            className={`${styles.banner_bottom} block-center`}
            src={banner_bottom}
          />
        </div>
      )}
      {/* <Footer /> */}
    </div>
  )
}

export default ProductDetail
