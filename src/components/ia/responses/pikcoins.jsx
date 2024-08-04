import React from 'react';
import Button from '../../button/Button'
import CoinIcon from '../../coinIcon/CoinIcon';
import { formatNumber } from '../../../lib/utils';

const Height = "160px"
const HtmlMessage = <div>
    <CoinIcon hideNumber />
</div>
const pikcoinTRM = 1200
const Message = `Claro, te explico. <br /><br />
<b>Pikcoins</b> son las monedas que puedes ganar por jugar y participar en los eventos de Pikplay.
<br /><br />
<a target="_BLANK" href="/articulo/pikcoins-que-son-y-como-redimir-cupones">Conoce más sobre los Pikcoins aquí</a>`
const Expresion = 'neutral'
const Options = ({ handleUserMessage, set }) => {
    // debugger;
    return <>
        <Button color='transparent'>
            Saber más de Pikcoins
        </Button>
        <Button color='transparent' onClick={() => handleUserMessage('inicio', set)}>
            Volver al inicio
        </Button>
    </>
}

export {
    Expresion,
    Height,
    HtmlMessage,
    Message,
    Options,
}
