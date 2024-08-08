import React from 'react'
import Link from 'next/link'
import Button from '../../../button/Button'
import useCompetitions from '../../../competitions/hooks/useCompetitions'
import useSystemStore from '../../../../hooks/storeSystem'
import { MessageOutlined } from '@mui/icons-material'

const Message = ({ number }) => {
  return `Estarás jugando con el número <span class='highlighted'>${number}</span>, deseas reservarlo?`
}

const handleYes = async (handleUserMessage, set, options, setStoreValue) => {
  const { competitionID, number, postCompetitionMemberSrv, uid, element } = options
  if (!uid) {
    element.click()
    return
  }
  const resp = await postCompetitionMemberSrv(null, competitionID, number, uid);
  const { htmlChallengeObtained, nowCompleted } = resp.challengeUpdated
  if (nowCompleted) {
    // Setting on true the award modal
    setTimeout(() => {
      setStoreValue('awardsSummaryModalHTML', htmlChallengeObtained)
      setStoreValue('isAwardSummaryModalOpen', true)
    }, 4000)
  }
  if (resp.message == 'Number already taken') {
    handleUserMessage('competition/yes/taken', set, options)
  } else {
    handleUserMessage('competition/yes', set, options)
  }
}

const Options = ({ handleUserMessage, set, options }) => {
  const { userLogged: { uid }, setStoreValue } = useSystemStore()
  options.uid = uid
  const element: HTMLElement | null = document.querySelector('#btnStart');
  options.element = element
  if (!uid && element) element.click()
  const { liberarNumero, getCompetitions } = useCompetitions();
  return <>
    <Button color='blue' onClick={() => handleYes(handleUserMessage, set, options, setStoreValue)}>
      Si
    </Button>
    <Link target='_BLANK' href='https://api.whatsapp.com/send?phone=573113306911'>
      <Button color='yellow'>
        <MessageOutlined className='icon' />
        &nbsp;Envíar mensaje
      </Button>
    </Link>
  </>
}

export {
  Message,
  Options,
}
