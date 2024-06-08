import Link from 'next/link'
import React, { lazy, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import styles from './styles.module.scss'
import { getCategories, slugify } from '../../lib/utils'
import { IS_MOBILE } from '../../lib/variables'
import Notification from '../previewNotifications'

const PreviewUser = dynamic(() => import('../previewUser/PreviewUser'), { ssr: false })
const Categorias = props => {
  const [isOpenPreviewProfile, setIsOpenPreviewProfile] = useState(false)
  const { scroll } = props

  const VenderButton = dynamic(() => import('./sellButton/SellButton'), {
    ssr: false,
  })

  return (
    <div className={styles.Categorias}>
      <ul>
        {getCategories().map(category => {
          const image = category.image
            ? category.image
            : '/images/icons/' + category.id + '.png'
          return (
            <li filter='game' key={category.id} className={styles.Category}>
              <Link
                scroll={scroll}
                href='/categoria/[id]'
                as={'/categoria/' + slugify(category.name)}
              >
                {!!image && <img src={image} alt={category.name} />}
                {category.name}
              </Link>
            </li>
          )
        })}
        <li className={styles['crear-publicacion']}>{<VenderButton />}</li>
        <li className={styles.Noti__PreviewUser__Content}>
          {
            !IS_MOBILE &&
            <>
              <Notification />
              <PreviewUser />
            </>
          }
        </li>
      </ul>
    </div>
  )
}

export default Categorias
