import styles from './referrals.module.scss'

import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField'
import Button from '../../../button/Button'
import { getReferralsSrv, saveReferral } from '../../../../services/user/userService'

const Message = `Con cada referidos ganas Pikcoins. <br /> Recuerdale a tus referidos aceptar la invitacion enviada por wsp ó por mensaje de texto.`
const Options = ({ handleUserMessage, set }) => {
  return <>
    <Button color='transparent' onClick={() => handleUserMessage('referrals/add', set)}>
      Agregar referido
    </Button>
    <Button color='transparent' onClick={() => handleUserMessage('welcome', set)}>
      Volver al inicio
    </Button>
  </>
}

export {
  Message,
  Options,
}
