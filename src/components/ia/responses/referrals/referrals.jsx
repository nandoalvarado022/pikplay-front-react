import React, { useState, useEffect } from 'react';
import Button from '../../../button/Button'
import { getReferralsSrv } from '../../../../services/user/userService';
import { startConfetti } from '../../../../lib/utils';

const saveReferralContacts = (referrals) => {
  // alert(JSON.stringify(referrals))
  getReferralsSrv()
    .then((data) => alert(data))
    .finally(data => {
      startConfetti()
      startConfetti()
    })
}

async function getContacts(handleUserMessage, set) {
  const props = ["name", "email", "tel", "address", "icon"];
  const opts = { multiple: true };
  try {
    const contacts = await navigator.contacts.select(props, opts);
    const formattedContacts = contacts.map(item => ({
      name: item.name[0],
      phone: item.tel[0].replace(/ /g, "")
    }))
    saveReferralContacts(formattedContacts)
    handleUserMessage('referrals/added', set)
  } catch (ex) {
    // Handle any errors here.
  }
}

const HTML = <>
  <img src="/images/icons/ranking-icon.png" style={{ margin: '20px auto 0', width: '140px' }} />
</>

const Message = `Con cada referido ganas Pikcoins. <br /> Recuerdale a tus referidos aceptar la invitacion enviada por wsp ó por mensaje de texto.`
const Options = ({ handleUserMessage, set }) => {
  return <>
    <Button color='blue' realistic onClick={() => getContacts(handleUserMessage, set)}>
      &nbsp;Agregar primer referido 🎉&nbsp;
    </Button>
  </>
}

export {
  HTML,
  Message,
  Options,
}
