import React, { useState, useEffect } from 'react';
import Button from '../../../button/Button'
import { TextField } from '@mui/material';

const HTMLOnboarding = () => {
  return <div>
    {/* <TextField /> */}
  </div>
}

const Message = `Hola! es un placer tenerte acá, vamos a comenzar, como puedo llamarte?`
const Options = ({ handleUserMessage, set }) => {
  return <>
    <Button color='transparent' onClick={() => handleUserMessage('welcome', set)}>
      Seguir
    </Button>
  </>
}

export {
  HTMLOnboarding,
  Message,
  Options,
}
