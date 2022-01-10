import React from 'react'
import Link from "next/link"
import Grow from "@material-ui/core/Grow"
import { format_number } from "../../lib/utils"
import { useQuery, gql } from '@apollo/client'
import styles from "./card.module.scss"
import Author from "./Author"

const Card = ({ accept_changues, apply_cashback, certificate, id: id_publication, is_new, tags, special_title, title, descuento = 0, description, image_link, slug, tipo_coleccion, destacada, user_name, user_picture, user_transactions, type, likes, price, sale_price, logDetalle, quantity } = {}) => {
  const usuario = typeof localStorage != "undefined" ? localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).email : null : null
  let like = null
  if (usuario) like = likes ? !!likes.find((like) => like == usuario) : false
  destacada = id_publication == 1 ? true : false
  const { loading, error, data } = useQuery(gql`{
    publications{
      title
    }
  }`)

  return <Grow key={id_publication} in={true} style={{ opacity: 1 }}>
    <Link href={slug ? "/publicacion/[id]" : "javascript:void(0)"} as={slug ? `/publicacion/${slug}` : "javascript:void(0)"}>
      <a className={id_publication == 1 ? styles.destacada_Card : ""}>
        {special_title && (<h3 className={styles.title_destacada}>{special_title}</h3>)}
        <div key={id_publication} className={`${styles.Card} ${destacada ? styles.destacada : ""}`} >
          <Author {...{ user_certificate: certificate, user_name, user_picture, user_transactions }} />
          <div className={styles.descripcion_imagen}>
            <div className={styles.content_imagen}>
              <div className={`${styles.tags} desktop`}>
                {!is_new && <span title="El articulo es de segunda mano" className={styles.condition}>Usado</span>}
                {/* Si aplica cashback */}
                {apply_cashback && <span title="Ganarás Pikcoins por hacer esta compra" className={styles.apply_cashback}>
                  <picture className={styles.coin} />
                  ¡Cashback!
                </span>}
                {accept_changues && <span className={styles.condition} title="El vendedor acepta productos como parte de pago o incluso cambiar el producto por otro de su interés">Acepto cambios</span>}
                {
                  tags && JSON.parse(tags).map((item, ind) => {
                    return (<span key={ind}>
                      {item.texto}
                    </span>
                    );
                  })
                }
              </div>

              {image_link && <img alt={title} className="image-front" src={`${image_link}`} />}
            </div>
            {
              <div className={styles.descripcion}>
                <h2>{title ? title : "Espacio para el título de la publicación"}</h2>
                {quantity && <p className={styles.quantity}>{quantity} unidades disponibles</p>}
                <div className={styles["likes-precio"]}>
                  <div className={styles.content_precio}>
                    {/* Precio tachado */
                      // Number(price) != 0 && <span className={styles.tachado}>
                      //   ${format_number(price)}
                      // </span>
                    }
                    {
                      // Precio sin tachar
                      Number(sale_price) != 0 &&
                      <React.Fragment>
                        <span className={styles.nuevoPrecio}>
                          ${format_number(sale_price)}
                        </span>
                      </React.Fragment>
                    }
                  </div>
                </div>
                <div className={`${styles.tags} mobile`}>
                  {!is_new && <span title="El articulo es de segunda mano" className={styles.condition}>Usado</span>}
                  {/* Si aplica cashback */}
                  {apply_cashback && <span title="Ganarás Pikcoins por hacer esta compra" className={styles.apply_cashback}>
                    <picture className={styles.coin} />
                    ¡Cashback!
                  </span>}
                  {accept_changues && <span className={styles.condition} title="El vendedor acepta productos como parte de pago o incluso cambiar el producto por otro de su interés">Acepto cambios</span>}
                  {
                    tags && JSON.parse(tags).map((item, ind) => {
                      return (<span key={ind}>
                        {item.texto}
                      </span>
                      );
                    })
                  }
                </div>
              </div >
            }
          </div >
        </div>
      </a>
    </Link >
  </Grow >
};

export default Card;
