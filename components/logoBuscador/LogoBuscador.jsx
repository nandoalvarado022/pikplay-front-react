import { gql, useLazyQuery } from '@apollo/client'
import { useRouter } from "next/router"
import Link from "next/link"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import React, { useState, useEffect, useMemo } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import useConstant from 'use-constant'
import AwesomeDebouncePromise from 'awesome-debounce-promise'
import {
  useAsync,
  useAsyncAbortable,
  useAsyncCallback,
  UseAsyncReturn,
} from 'react-async-hook'
import styles from "./logoBuscador.module.scss"
import { getFeed } from '../../lib/utils'

const searchStarwarsHero = async (text, abortSignal) => {
  // const result = await fetch(`https://swapi.dev/api/people/?search=${encodeURIComponent(text)}`, {
  //   signal: abortSignal,
  // })
  // if (result.status !== 200) {
  //   throw new Error('bad status = ' + result.status)
  // }
  // const json = await result.json()
  // return json.results
  const results = await getFeed({ title: text })
  return results
}

const useSearchStarwarsHero = () => {
  // Handle the input text state
  const [inputText, setInputText] = useState('');

  // Debounce the original search async function
  const debouncedSearchStarwarsHero = useConstant(() =>
    AwesomeDebouncePromise(searchStarwarsHero, 300)
  )

  const search = useAsyncAbortable(
    async (abortSignal, text) => {
      // If the input is empty, return nothing immediately (without the debouncing delay!)
      if (text.length === 0) {
        return [];
      }
      // Else we use the debounced api
      else {
        const res = debouncedSearchStarwarsHero(text, abortSignal);
        return res
      }
    },
    // Ensure a new request is made everytime the text changes (even if it's debounced)
    [inputText]
  );

  // Return everything needed for the hook consumer
  return {
    inputText,
    setInputText,
    search,
  };
}

function LogoBuscador({ partner }) {
  const { inputText, setInputText, search } = useSearchStarwarsHero()
  const router = useRouter()
  const [textSearch, setTextSearch] = useState("")
  const [results, setResults] = useState([])
  const [showSearchBox, setShowSearchBox] = useState(false)

  useEffect(() => {
    if (window.screen.width > 420) setShowSearchBox(true)
  }, [])

  function onTagsChange(event, values) {
    const slug = products.publications.find((x) => x.title == values).slug;
    router.push("/publicacion/" + slug);
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      // await getPublications()
    }, 3000)

    return () => clearTimeout(delayDebounceFn)
  }, [])

  return <div id={styles.LogoBuscador} className={partner ? "partner" : ""}>
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
          <TextField onBlur={() => setInputText('')} onChange={e => setInputText(e.target.value)} fullWidth label="nintendo switch, ps5, controles de xbox" variant="outlined" />
          {
            search.result && search.result.length > 0 && <div className={styles.results}>
              <div className={styles.rows}>
                {
                  search.result.map(item => {
                    return <Link href={item.slug ? "/publicacion/[id]" : "javascript:void(0)"} as={item.slug ? `/publicacion/${item.slug}` : "javascript:void(0)"}>
                      <article>
                        <img src={item.image_link} alt="" />
                        <a>{item.title}</a>
                      </article>
                    </Link>
                  })
                }
              </div>
            </div>
          }
        </div>
      }
    </ul>
  </div>
}

export default LogoBuscador
