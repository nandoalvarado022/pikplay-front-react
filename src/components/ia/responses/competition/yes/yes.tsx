import React from 'react';
import Button from '../../../../button/Button'

const Message = `Ahora estas participando!, Ahora lo que sigue es pagar tu boleta y como dijo la chancera "Mucha suerte!!!"`

const handleTalkToOwner = (sellerPhone, number) => {
    const message = `Hola, me gustaría reservar el número ${number} del concurso https://pikplay.co/competition/1234`
    const url = `https://api.whatsapp.com/send?phone=${sellerPhone}&text=${message}`
    window.open(url, '_blank').focus();
}

const Options = ({ handleUserMessage, set, options }) => {
    debugger
    const { sellerPhone, number } = options
    return <>
        <Button color='blue' onClick={() => handleTalkToOwner(sellerPhone, number)}>
            Pagar mi boleta
        </Button>
        <Button color='transparent' onClick={() => handleUserMessage('inicio', set)}>
            Volver al inicio
        </Button>
    </>
}

export {
    Message,
    Options,
}
