import React from 'react';
import Button from '../../button/Button'

const Message = `Hola! en que te puedo ayudar?`

const Expresion = 'neutral'
const Options = ({ handleUserMessage, set }) => {
    return <>
        <Button color='transparent' onClick={() => handleUserMessage('welcome', set)}>
            Guía para nuevos usuarios
        </Button>
        <Button color='transparent' onClick={() => handleUserMessage('pikcoins', set)}>
            ¿Que son los Pikcoins?
        </Button>
        <Button color='transparent' onClick={() => handleUserMessage('regalo', set)}>
            Quiero asesoria para un regalo
        </Button>
        {/* <Button color='transparent' onClick={() => handleUserMessage('playstation', set)}>
            Jugadores Playstation
        </Button>
        <Button color='transparent' onClick={() => handleUserMessage('xbox', set)}>
            Jugadores XBOX
        </Button>
        <Button color='transparent' onClick={() => handleUserMessage('competition/list', set)}>
            Concursos
        </Button> */}
        <Button color='transparent' onClick={() => handleUserMessage('otros-temas', set)}>
            Otros temas
        </Button>
    </>
}

export {
    Expresion,
    Message,
    Options,
}
