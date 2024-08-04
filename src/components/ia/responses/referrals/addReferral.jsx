import styles from './referrals.module.scss'

import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField'
import Button from '../../../button/Button'
import { getReferralsSrv, saveReferral } from '../../../../services/user/userService'

const props = ["name", "email", "tel", "address", "icon"];
const opts = { multiple: true };

async function getContacts() {
    try {
        const contacts = await navigator.contacts.select(props, opts);
        debugger;
    } catch (ex) {
        // Handle any errors here.
    }
}

const HTML = () => {
    const [buttonText, setButtonText] = useState('Guardar referido')
    const [referrals, setReferrals] = useState([])
    const [newReferrealPhone, setNewReferrealPhone] = useState('')
    const [newReferrealName, setNewReferrealName] = useState('')

    const handleSubmit = () => {
        setButtonText('Validando...')
        saveReferral(newReferrealPhone, newReferrealName)
            .then(data => {
                // getReferralsSrv().then(({ data }) => setReferrals(data))
            })
            .catch(err => {
            });
    }

    useEffect(() => {
        // getReferralsSrv().then(({ data }) => setReferrals(data))
    }, [])

    return <div className={styles.Referrals}>
        <div>
            {referrals && referrals.map(item => <div>{item.name} - {item.phone}</div>)}
        </div>
        <div className={`not_shadow ${styles.content_new_referral}`}>
            {/* <form> */}
            {/* <input placeholder='Nombre' type='text' onChange={e => setNewReferrealName(e.target.value)} />
                <input placeholder='Teléfono' type='text' onChange={e => setNewReferrealPhone(e.target.value)} /> */}
            <Button color='blue' onClick={getContacts}>{buttonText}</Button>
            {/* </form> */}
        </div>
    </div>
}

const Message = ``

const Options = ({ handleUserMessage, set }) => {
    return <>
        <Button color='transparent' onClick={() => handleUserMessage('welcome', set)}>
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
