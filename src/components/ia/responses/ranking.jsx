import React, { useState, useEffect } from 'react';
import Button from '../../button/Button'

const HTML = <>
  <img src="/images/icons/ranking-icon.png" style={{ margin: '20px auto 0', width: '140px' }} />
</>

// TODO: Cambiar aquí el texto
const Message = `Texto de ejemplo`
const Options = ({ handleUserMessage, set }) => {
  return <>
    <Button color='blue' realistic>
      &nbsp;¡Seré el primero! 🔝&nbsp;
    </Button>
  </>
}

export {
  HTML,
  Message,
  Options,
}
