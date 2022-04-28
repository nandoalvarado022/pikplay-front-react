import Button from "../button/Button"
import CoinsByBuy from "../coinsByBuy/CoinsByBuy"
import Footer from "../footer/Footer"
import Grow from "@material-ui/core/Grow"
import ImageGallery from "react-image-gallery"
import React from "react"
import styles from "./styles.module.scss"
import { format_number } from "../../lib/utils"
import { useRef } from "react"
import Link from "next/link"
import { useSelector } from "react-redux"
import Author from "../card/Author"

const DetalleProducto = ({
  apply_cashback,
  banner_bottom,
  description = "",
  descuento = 0,
  handleHablarVendedor,
  image_1,
  image_2,
  image_3,
  image_4,
  image_5,
  indice_item,
  quantity,
  sale_price,
  slug,
  title,
  user: seller,
} = {}) => {
  const ref_descripcion_imagen = useRef(null)
  let images = []
  const user = useSelector((state) => state.user)
  if (image_1) images.push({ original: image_1, thumbnail: image_1, })
  if (image_2) images.push({ original: image_2, thumbnail: image_2, })
  if (image_3) images.push({ original: image_3, thumbnail: image_3, })
  if (image_4) images.push({ original: image_4, thumbnail: image_4, })
  if (image_5) images.push({ original: image_5, thumbnail: image_5, })
  indice_item = indice_item ? indice_item : 1
  sale_price == sale_price == 0 || sale_price == '' ? null : sale_price

  return <div key={indice_item} className={`Card ${styles.DetalleProducto}`}>
    <Grow key={indice_item} timeout={500} in={true} style={{ opacity: 1 }}>
      <div ref={ref_descripcion_imagen} className={styles.descripcion_imagen}>
        <div className={`Card ${styles.left}`}>
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

        <div className={styles.descripcion}>
          <div className={`Card ${styles.Card}`}>
            <h1>{title}</h1>
            {!!user.is_admin && <Link href={'/publicacion/' + slug + '/editar'}>
              <a className='underline'>Editar</a>
            </Link>}
            {/* Si aplica cashback */}
            {apply_cashback && <span title="Ganarás Pikcoins por hacer esta compra" className={styles.apply_cashback}>
              <picture className={styles.coin} />
              ¡Cashback!
            </span>}

            <div className={styles.content_precio}>
              {descuento > 0 &&
                <span className={"descuento" + (logDetalle ? " logDetalle" : "")}> -{descuento}% </span>}
              {!!sale_price && <span className={styles.nuevoPrecio}>
                ${format_number(sale_price)}
              </span>}
            </div>

            <div className={`flex ${styles.compra_author}`}>
              <Button color="blue" onClick={handleHablarVendedor}>
                {quantity > 0 && "Lo quiero"}
                {quantity == 0 && "Reservar"}
              </Button>
              <div className={styles.content_author}>
                <Author parentView='CardDetalleProducto' user={seller} />
              </div>
            </div>

            {!!seller?.certificate && <CoinsByBuy price={sale_price} />}

            <div className={styles.description}>
              <p className={styles.title}>Descripción</p>
              <pre className="font-a">{description}</pre>
            </div>

            <p>
              <a className="underline f-s-12" target="_BLANK" href="https://api.whatsapp.com/send?phone=573187414972&text=Quiero reportar una publicación de pikplay.co">Reportar publicación</a>
            </p>
          </div>
        </div>
      </div>
    </Grow>
    {
      banner_bottom && <div>
        <img alt="Banner publicitario del seller" className={`${styles.banner_bottom} block-center`} src={banner_bottom} />
      </div>
    }
    <Footer />
  </div>
}

export default DetalleProducto