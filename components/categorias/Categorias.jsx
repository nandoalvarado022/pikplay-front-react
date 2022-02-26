import React, { useState } from "react"
import Link from "next/link"
import { getCategories, slugify } from "../../lib/utils"
import styles from "./styles.module.scss"

const Categorias = (props) => {
  const [isOpenPreviewProfile, setIsOpenPreviewProfile] = useState(false)
  const { scroll } = props

  return <div className={styles.Categorias}>
    <ul>
      <li className={styles["crear-publicacion"]} >
        <Link href="/publicacion/crear" as="/publicacion/crear">
          <a>
            Vender
          </a>
        </Link>
      </li>
      {
        getCategories().map((category) => {
          const image = category.image ? category.image : "/images/icons/" + category.id + ".png"
          return <li filter="game" key={category.id}>
            <Link scroll={scroll} href="/category/[id]" as={"/category/" + slugify(category.name)}>
              <a>
                <img alt="Imagen categoria" src={image} alt={category.name} />
                {category.name}
              </a>
            </Link>
          </li>
        })
      }
    </ul>
  </div >
}

export default Categorias
