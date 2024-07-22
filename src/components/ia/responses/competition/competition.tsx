import React from 'react';
import Link from 'next/link';
import Button from '../../../button/Button'
import { deleteCompetitionMemberSrv } from '../../../../services/competition/competitionService';
import useCompetitions from '../../../competitions/hooks/useCompetitions';
import useSystemStore from '../../../../hooks/useSystem';
import { Money } from '@mui/icons-material';
import { MoneyOffCsredOutlined } from '@mui/icons-material';
import { DoneAll } from '@mui/icons-material';
import { MessageOutlined } from '@mui/icons-material';
import { DeleteOutlined } from '@mui/icons-material';
import { competitionsStore } from '../../../competitions/hooks/competitionsStore';

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
  const { userLogged: { uid } } = useSystemStore()
  const { competitionDetail } = competitionsStore()
  const { seller: { uid: uidSeller } } = competitionDetail
  options.uid = uid
  const element: HTMLElement | null = document.querySelector('#btnStart');
  options.element = element
  if (!uid && element) element.click()
  const { liberarNumero, getCompetitions } = useCompetitions();
  return <>
    {uid == uidSeller && <>
      <Button color='blue'>
        <DoneAll className='icon' />
        &nbsp;Marcar como pagado
      </Button>
      <Button color='red' onClick={() => {
        liberarNumero()
        handleUserMessage('hideIA', set)
      }}>
        <DeleteOutlined className='icon' />
        &nbsp;Liberar número
      </Button>
    </>}
    {uid != uidSeller && <>
      <Button color='blue' onClick={() => handleYes(handleUserMessage, set, options)}>
        Si
      </Button>
      <Link target='_BLANK' href='https://api.whatsapp.com/send?phone=573113306911'>
        <Button color='yellow'>
          <MessageOutlined className='icon' />
          &nbsp;Envíar mensaje
        </Button>
      </Link>
    </>}
  </>
}

export {
  Message,
  Options,
}
