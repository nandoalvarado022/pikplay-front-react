import React from 'react'
import date from 'date-and-time'
import PortadaInterface from './PortadaInterface'
import { useState } from 'react';
import 'date-and-time/locale/es'

date.locale('es');

function Portada({ category, feed: data = [] }) {
  const [feed, setFeed] = useState(data)
  const [open, setOpen] = useState(false)
  const popularyItem = feed ? feed[0] : null
  const starItem = feed && feed.find((item) => item.id == 68)

  return <PortadaInterface {...{ feed, category, open, popularyItem, setFeed, starItem }} />
}

export default Portada