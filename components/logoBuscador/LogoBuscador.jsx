import { gql, useLazyQuery } from '@apollo/client'
import { useRouter } from "next/router"
import Link from "next/link"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import React, { useState, useEffect, useMemo } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import styles from "./logoBuscador.module.scss"

function LogoBuscador({ partner }) {
  const router = useRouter()
  const [textSearch, setTextSearch] = useState("")
  const [results, setResults] = useState([])
  const [showSearchBox, setShowSearchBox] = useState(false)
  const PUBLICATIONS_QUERY = gql`
  query Publications($slug: String, $title: String){
    publications(slug: $slug, status: true, title: $title){
      category
      description
      image_2
      image_3
      image_4
      image_link
      is_new
      sale_price
      title      
      slug
    }
  }`

  const [getPublications, { data: products }] = useLazyQuery(PUBLICATIONS_QUERY, {
    variables: {
      title: textSearch
    },
    fetchPolicy: "no-cache", onCompleted: ({ publications }) => {
      setResults(publications)
    }
  })

  useEffect(() => {
    if (window.screen.width > 420) setShowSearchBox(true)
  }, [])

  function onTagsChange(event, values) {
    const slug = products.publications.find((x) => x.title == values).slug;
    router.push("/publicacion/" + slug);
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      await getPublications()
    }, 3000)

    return () => clearTimeout(delayDebounceFn)
  }, [textSearch])

  return (<div id={styles.LogoBuscador} className={partner ? "partner" : ""}>
    <ul>
      {!partner && (
        <Link href="/">
          <span style={{ textAlign: "left" }}>
            <img className={styles.logo} src="/images/logos/logo.png" alt="" />
            <div className={styles.slogan}>
              <span>Compra y vende como <b><i>Gamer</i></b></span>
            </div>
          </span>
        </Link>
      )}

      <div onClick={() => setShowSearchBox(!showSearchBox)} className={styles["icon-search-mobile"]}>
        <FontAwesomeIcon icon={faSearch} />
      </div>
      {
        <div className={styles.content_buscador} style={{ display: showSearchBox ? "block" : "none" }}>
          <TextField onChange={(e) => setTextSearch(e.target.value)} fullWidth label="nintendo switch, ps5, controles de xbox" variant="outlined" />
          <div className={styles.results}>
            <div className={styles.rows}>
              {
                results && results.map(item => {
                  return <Link href={item.slug ? "/publicacion/[id]" : "javascript:void(0)"} as={item.slug ? `/publicacion/${item.slug}` : "javascript:void(0)"}>
                    <a>{item.title}</a>
                  </Link>
                })
              }
            </div>
          </div>
        </div>
      }
    </ul>
  </div>
  )
}

export default LogoBuscador
