import React from 'react';
import Link from 'next/link';
import Button from '../../../button/Button'
import { deleteCompetitionMemberSrv } from '../../../../services/competition/competitionService';
import useCompetitions from '../../../competitions/hooks/useCompetitions';
import useSystemStore from '../../../../hooks/useSystem';

const Message = ({ number }) => {
  return `Estarás jugando con el número <span class='highlighted'>${number}</span>, deseas reservarlo?`
}

const handleYes = async (handleUserMessage, set, options) => {
  const { competitionID, number, postCompetitionMember, uid, element } = options
  if (!uid) {
    element.click()
    return
  }
  const resp = await postCompetitionMember(competitionID, number, uid);
  if (resp.message == 'Number already taken') {
    handleUserMessage('competition/yes/taken', set, options)
  } else {
    handleUserMessage('competition/yes', set, options)
  }
}

const Options = ({ handleUserMessage, set, options }) => {
  const { userLogged } = useSystemStore()
  options.uid = userLogged.uid
  const element: HTMLElement | null = document.querySelector('#btnStart');
  options.element = element
  if (!userLogged.uid && element) element.click()
  const { liberarNumero, getCompetitions } = useCompetitions();
  return <>
    <Button color='blue' onClick={() => handleYes(handleUserMessage, set, options)}>
      Si
    </Button>
    <Link target='_BLANK' href='https://api.whatsapp.com/send?phone=573113306911'>
      <Button color='yellow'>
        Envíar mensaje
      </Button>
    </Link>
    <Button color='red' onClick={() => {
      liberarNumero()
      handleUserMessage('hideIA', set)
    }}>
      Liberar número
    </Button>
  </>
}

export {
  Message,
  Options,
}
