import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Footer from "../footer/Footer"
import Button from "../button/Button"
import { DiscussionEmbed } from "disqus-react"
import ReactMarkdown from "react-markdown/with-html"
import Grow from "@material-ui/core/Grow"
import { format_number } from "../../lib/utils"
import ImageGallery from "react-image-gallery"
import { useEffect, useRef } from "react"
import styles from "./cardDetalleProducto.module.scss"
import React from "react"
import { faCheckCircle, faHandshake } from "@fortawesome/free-regular-svg-icons"
import Author from "./Author"

const CardProducto = ({ apply_cashback, banner_bottom, certificate, meta_url, title, descuento = 0, description = "", handleHablarVendedor, image_link, image_1, image_2, image_3, image_4, image_5, tipo_coleccion, indice_item, destacada, tipo_publicacion, likes, fecha, inventory, price, sale_price, setIsModalHablarVendedor, user_name, user_picture, user_transactions, quantity, warranty } = {}) => {
  const ref_descripcion_imagen = useRef(null)
  let images = []

  if (image_link) images.push({ original: image_link, thumbnail: image_link, })
  if (image_1) images.push({ original: image_1, thumbnail: image_1, })
  if (image_2) images.push({ original: image_2, thumbnail: image_2, })
  if (image_3) images.push({ original: image_3, thumbnail: image_3, })
  if (image_4) images.push({ original: image_4, thumbnail: image_4, })
  if (image_5) images.push({ original: image_5, thumbnail: image_5, })
  indice_item = indice_item ? indice_item : 1;
  const usuario =
    typeof localStorage != "undefined"
      ? localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).email
        : null
      : null;
  let like = null;
  if (usuario) like = likes ? !!likes.find((like) => like == usuario) : false

  useEffect(() => {
    (function () { // Comentarios disqus
      var d = document, s = d.createElement('script');
      s.src = 'https://pik-play.disqus.com/embed.js';
      s.setAttribute('data-timestamp', +new Date());
      (d.head || d.body).appendChild(s);
    })();
  }, [])

  return <div key={indice_item} className={`Card ${styles.DetalleProducto}`}>
    <ins class="adsbygoogle"
      style={{ display: "inline-block", width: "320px", height: "100px" }}
      data-ad-client="ca-pub-4730353912478910"
      data-ad-slot="2850501582"></ins>

    <Grow key={indice_item} timeout={500} in={true} style={{ opacity: 1 }}>
      <div ref={ref_descripcion_imagen} className={styles.descripcion_imagen}>
        <div className={styles.left}>
          <div className={styles.content_imagen}>
            <ImageGallery
              items={images}
              lazyLoad={false}
              showPlayButton={false}
              showBullets={false}
              showFullscreenButton={false} />
          </div>

          <div className={`${styles.Card} ${styles["productos-relacionados"]}`}>
            {/* <h3 className="text-center">Productos que te pueden interesar</h3> */}
            {/* <div className="listadoRodadas">
              {["", "", ""].map((current, ind) => {
                const item = feed[ind]
                return <Card key={ind} special_title="Más vendido" destacada={true} doc_id={item.id} permitirLink={true} {...item} coleccion={item.coleccion} indice_item={ind} />
              })}
            </div> */}
          </div>
        </div>

        {description && <div className={`Card ${styles.Card} ${styles.descripcion}`}>
          {certificate && <FontAwesomeIcon className={styles.verified} icon={faCheckCircle} />}
          <h1>{title}</h1>
          {/* Si aplica cashback */}
          {apply_cashback && <span title="Ganarás Pikcoins por hacer esta compra" className={styles.apply_cashback}>
            <picture className={styles.coin} />
            ¡Cashback!
          </span>}
          <div className={styles.content_precio}>
            {/* Precio */}
            {/* <span className={styles.tachado}>
              {price && <React.Fragment>$&nbsp;{price}</React.Fragment>}
            </span> */}

            {descuento > 0 &&
              <span className={"descuento" + (logDetalle ? " logDetalle" : "")}> -{descuento}% </span>
            }

            {(sale_price && sale_price != 0) && <React.Fragment>
              <br />
              <span className={styles.nuevoPrecio}>
                ${format_number(sale_price)}
              </span>
            </React.Fragment>
            }
          </div>

          <div className={`flex ${styles.compra_author}`}>
            {quantity > 0 && (<Button color="blue" onClick={handleHablarVendedor}>Me interesa este artículo</Button>)}
            <div className={styles.content_author}>
              <Author {...{ user_certificate: certificate, user_name, user_picture, user_transactions }} />
            </div>
          </div>

          <div className={styles.description}>
            <p className={styles.title}>Descripción</p>
            <ReactMarkdown source={description}></ReactMarkdown>
          </div>

          <p>
            <a className="underline f-s-12" target="_BLANK" href="https://api.whatsapp.com/send?phone=573187414972&text=Quiero denunciar una publicación en pik-play.com">Denunciar</a>
          </p>

          {/* <div>
              <DiscussionEmbed shortname="pikajuegos" config={{ url: meta_url, identifier: meta_url, title: title, language: "es_ES" }} />
            </div> */}
          <div id="disqus_thread"></div>
        </div>
        }

      </div>
    </Grow>
    {
      banner_bottom && <div>
        <img className={`${styles.banner_bottom} block-center`} src={banner_bottom} alt="" />
      </div>
    }
    <Footer />
  </div>
}

export default CardProducto