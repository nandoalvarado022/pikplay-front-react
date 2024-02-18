import React, { useEffect, useState } from 'react'
import date from 'date-and-time'
import PortadaInterface from './PortadaInterface'
import 'date-and-time/locale/es'
import { toast } from 'react-toastify'
import Link from 'next/link'

date.locale('es')

function Portada({ category, feed: data = [] }) {
  const [feed, setFeed] = useState(data)
  const [open, setOpen] = useState(false)
  const popularyItem = feed ? feed[0] : null
  const starItem = feed && feed.find(item => item.id == 68)
  const enviroment = process.env.NEXT_PUBLIC_ENV

  return (
    <PortadaInterface
      {...{
        feed,
        category,
        open,
        popularyItem,
        setFeed,
        starItem,
      }}
    />
  )
}

export default Portada
