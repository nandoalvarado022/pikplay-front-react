import React, { useState, useEffect } from 'react';
import Button from '../../../button/Button'

const HTML = <>
    <img src="/images/icons/ranking-icon.png" style={{ margin: '20px auto 0', width: '140px' }} />
</>

const Message = `Con cada referido ganas Pikcoins. <br /> Recuerdale a tus referidos aceptar la invitacion enviada por wsp ó por mensaje de texto.`
const Options = ({ handleUserMessage, set }) => {
    return <>
        <Button color='blue' realistic onClick={() => handleUserMessage('referrals/add', set)}>
            &nbsp;Agregar primer referido 🎉&nbsp;
        </Button>
    </>
}

export {
    HTML,
    Message,
    Options,
}
