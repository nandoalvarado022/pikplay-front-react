import styles from './referrals.module.scss'

import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField'
import Button from '../../../button/Button'
import { getReferralsSrv, saveReferral } from '../../../../services/user/userService'

const HTML = () => {
  const [buttonText, setButtonText] = useState('Ingresar Referido')
  const [referrals, setReferrals] = useState([])
  const [newReferrealPhone, setNewReferrealPhone] = useState('')
  const [newReferrealName, setNewReferrealName] = useState('')

  const handleSubmit = () => {
    setButtonText('Validando...')
    saveReferral(newReferrealPhone, newReferrealName)
      .then(data => {
        debugger;
        // getReferralsSrv().then(({ data }) => setReferrals(data))
      })
      .catch(err => {
        debugger;
      });
  }

  useEffect(() => {
    // getReferralsSrv().then(({ data }) => setReferrals(data))
  }, [])

  return <div className={styles.Referrals}>
    <div>
      <h2>
        {referrals.length <= 0 && "Aún no tienes referidos"}
        {referrals.length > 0 && "Tus referidos son:"}
      </h2>
      {referrals && referrals.map(item => <div>{item.name} - {item.phone}</div>)}
    </div>
    <div className={`Card not_shadow ${styles.content_new_referral}`}>
      <form>
        <input placeholder='Nombre' type='text' onChange={e => setNewReferrealName(e.target.value)} />
        <input placeholder='Teléfono' type='text' onChange={e => setNewReferrealPhone(e.target.value)} />
        <Button color='blue' onClick={handleSubmit}>{buttonText}</Button>
      </form>
    </div>
  </div>
}

const Message = `Con cada referidos ganas Pikcoins. <br /> Recuerdale a tus referidos aceptar la invitacion enviada por wsp ó por mensaje de texto.`

const Options = ({ handleUserMessage, set }) => {
  return <>
    <Button color='transparent' onClick={() => handleUserMessage('init', set)}>
      Volver al inicio
    </Button>
  </>
}

export {
  HTML,
  Message,
  Options,
}

export default HTML
