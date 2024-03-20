/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import styles from './styles.module.scss'

import React, { useRef } from 'react'
import Button from '../../button/Button'
import CoinsByBuy from '../../coinsByBuy/CoinsByBuy'
import Footer from '../../footer/Footer'
import Grow from '@mui/material/Grow'
import ImageGallery from 'react-image-gallery'
import { formatNumber } from '../../../lib/utils'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import Author from '../../card/Author'
import Product from '../../../interfaces/Product'
import useSystemStore from '../../../hooks/useSystem'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'

const DetalleProducto = ({
  apply_cashback,
  banner_bottom,
  datosPublicacion,
  descuento = 0,
  handleHablarVendedor,
  indice_item,
}) => {

  const {
    description,
    images,
    quantity,
    sale_price,
    slug,
    title,
    user: seller,
  } = datosPublicacion || {}
  const formattedImages = images.map(item => ({
    thumbnail: item.url,
    original: item.url,
  }))
  const ref_descripcion_imagen = useRef(null)
  const { userLogged } = useSystemStore()
  indice_item = indice_item ? indice_item : 1
    ; (sale_price == sale_price) == 0 || sale_price == '' ? null : sale_price

  return (
    <div key={indice_item} className={`Card ${styles.DetalleProducto}`}>
      <Grow key={indice_item} timeout={500} in={true} style={{ opacity: 1 }}>
        <div ref={ref_descripcion_imagen} className={styles.descripcion_imagen}>
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

            <div
              className={`${styles.Card} ${styles['productos-relacionados']}`}
            >
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
              <h1>{title}</h1>
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
                {!!sale_price && (
                  <span className={styles.nuevoPrecio}>
                    ${formatNumber(sale_price)}
                  </span>
                )}
              </div>

              <div className={`flex ${styles.compra_author}`}>
                <Button color='blue' onClick={handleHablarVendedor}>
                  {quantity > 0 && 'Lo quiero'}
                  {quantity == 0 && 'Reservar'}
                </Button>
                <div className={styles.content_author}>
                  <Author parentView='CardDetalleProducto' user={seller} />
                </div>
              </div>

              {!!seller?.certificate && sale_price && (
                <CoinsByBuy price={sale_price} />
              )}

              <div className={styles.description}>
                <p className={styles.title}>Descripción</p>
                <p className='font-a' dangerouslySetInnerHTML={{ __html: description }}>
                </p>
              </div>

              <p>
                Con esta compra obtendras 1500 EXP para subir a categoria Plata
              </p>

              <p>
                <a
                  className={`${styles.report} underline f-s-12`}
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
      <Footer />
    </div>
  )
}

export default DetalleProducto
