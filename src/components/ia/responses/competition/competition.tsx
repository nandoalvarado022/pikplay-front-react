import React from 'react';
import Button from '../../../button/Button'
import { deleteCompetitionMemberSrv } from '../../../../services/competition/competitionService';
import useCompetitions from '../../../competitions/hooks/useCompetitions';
import Link from 'next/link';

const Message = ({ number }) => {
  return `Estarás jugando con el número <span class='highlighted'>${number}</span>, deseas reservarlo?`
}

const handleYes = async (handleUserMessage, set, options) => {
  const { competitionID, number, postCompetitionMember } = options
  const resp = await postCompetitionMember(competitionID, number);
  if (resp.message == 'Number already taken') {
    handleUserMessage('competition/yes/taken', set, options)
  } else {
    handleUserMessage('competition/yes', set, options)
  }
}

const Options = ({ handleUserMessage, set, options }) => {
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
