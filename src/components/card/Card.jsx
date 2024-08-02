import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Grow from '@mui/material/Grow'
import { capitalize, formatNumber, getCiudades } from '../../lib/utils'
// import { useQuery, gql } from '@apollo/client'
import Author from './Author'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHeart,
  faHeartBroken,
  faShare,
} from '@fortawesome/free-solid-svg-icons'
import { Tooltip } from '@mui/material'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import Product from '../../interfaces/Product'
import styles from './card.module.scss'
import CoinIcon from '../coinIcon/CoinIcon'
import useSystemStore from '../../hooks/storeSystem'
import CashbackTag from './cashbackTag/CashbackTag'

const Card = (props) => {
  const {
    accept_changes,
    cashback_available,
    certificate,
    city,
    description,
    descuento = 0,
    destacada,
    following,
    handleFavorite,
    handleShare,
    icon_favorite = true,
    id: publicationId,
    images,
    image_1,
    is_new,
    likes,
    logDetalle,
    price,
    quantity,
    sale_price,
    slug,
    special_title,
    tags,
    tipo_coleccion,
    title,
    type,
    user,
    user_name,
    user_picture,
    user_transactions,
  } = props

  const usuario =
    typeof localStorage != 'undefined'
      ? localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')).email
        : null
      : null
  let like = null
  if (usuario) like = likes ? !!likes.find(like => like == usuario) : false
  const isDestacada = publicationId == 1 ? true : false
  const { loggedUser } = useSystemStore()
  const cities = getCiudades()
  const cityLabel = cities.find(item => item.id == city)?.label
  const countryLabel = capitalize(cities.find(item => item.id == city)?.pais)

  return (
    <Grow key={publicationId} in={true} style={{ opacity: 1 }}>
      <div
        key={publicationId}
        className={`${styles.Card} ${isDestacada ? styles.isDestacada : ''}`}>
        <div className={styles.descripcion_imagen}>
          <div className={styles.content_imagen}>
            {/* Image */}
            <Link
              as={slug ? `/publicacion/${slug}` : 'javascript:void(0)'}
              className={styles.image_wrapper}
              key={publicationId}
              href={slug ? '/publicacion/[id]' : 'javascript:void(0)'}
            >
              {
                images && images.length > 0 && images.map(image => (
                  <Image
                    objectFit='cover'
                    layout='fill'
                    src={image?.url}
                  />
                ))
              }
            </Link>
          </div>
          <div className={`tags ${styles.tags}`}>
            {!is_new && (
              <span
                title='El articulo es de segunda mano'
                className={styles.condition}>
                Usado
              </span>
            )}
            {/* Si aplica cashback */}
            {cashback_available && <CashbackTag />}
            {accept_changes && (
              <span
                className={styles.condition}
                title='El vendedor acepta productos como parte de pago o incluso cambiar el producto por otro de su interés'>
                Acepto cambios
              </span>
            )}
            {!!tags &&
              JSON.parse(tags).map((item, ind) => {
                return <span key={ind}>{item.texto}</span>
              })}
          </div>
          {
            <div className={styles.descripcion}>
              <div className={styles.icons}>
                <Tooltip title='Seguir publicación'>
                  <a>
                    <FontAwesomeIcon
                      icon={icon_favorite ? faHeart : faHeartBroken}
                      className={classNames(styles.faHeart, {
                        [styles.active]: following || !icon_favorite,
                      })}
                      onClick={() => {
                        loggedUser?.id != 0
                          ? handleFavorite({
                            variables: {
                              publication: publicationId,
                              user: loggedUser?.id,
                            },
                          })
                          : document.querySelector('#btnStart').click()
                      }}
                    />
                  </a>
                </Tooltip>
                <Tooltip title='Compartir en Facebook'>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=https://pikplay.co/publicacion/${slug}`}
                    rel="noreferrer"
                    target='_BLANK'>
                    <FontAwesomeIcon
                      icon={faShare}
                      className={styles.faShare}
                    />
                  </a>
                </Tooltip>
              </div>
              <Link
                as={slug ? `/publicacion/${slug}` : 'javascript:void(0)'}
                className={publicationId == 1 ? styles.destacada_Card : ''}
                href={slug ? '/publicacion/[id]' : 'javascript:void(0)'}>
                <h2>
                  {title ? title : 'Espacio para el título de la publicación'}
                </h2>
              </Link>
              {user?.name && <Author user={user} />}
              {/* <small className={styles.location}> // TODO Mostrar la ciudad
                {cityLabel}
                &nbsp;-&nbsp;
                {countryLabel}
              </small> */}
              <p className={styles.quantity}>{quantity} unidades disponibles</p>
              <div className={styles['likes-precio']}>
                <div className={styles.content_precio}>
                  {
                    // Precio
                    Number(price) != 0 && (
                      <React.Fragment>
                        <span className={styles.nuevoPrecio}>
                          ${formatNumber(price)}
                        </span>
                      </React.Fragment>
                    )
                  }
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </Grow>
  )
}

export default Card
