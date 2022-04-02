import React from 'react'
import date from 'date-and-time'
import PortadaInterface from './PortadaInterface'
import { useState } from 'react';
import 'date-and-time/locale/es'
import { useEffect } from 'react';
import ModalLead from '../modalLoead/ModalLead';

date.locale('es');

function Portada({ category, feed = [] }) {
  const [open, setOpen] = useState(false)
  const popularyItem = feed ? feed[0] : null
  const starItem = feed && feed.find((item) => item.id == 68)

  useEffect(() => {
    setTimeout(() => {
      sessionStorage.setItem("hasFirstHome", true)
    }, 1000);
    const message = { // Mensaje para obtener lead usuario rápidamente
      id: 1,
      message: <ModalLead />
    }
    // Pending
    // context.customDispatch({ type: "SET_MESSAGE", payload: { message } })
  }, [])

  return <PortadaInterface {...{ feed, category, open, popularyItem, starItem }} />
}

export default Portada