import React from 'react';
import Button from '../../../button/Button'

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
  return <Button color='blue' onClick={() => handleYes(handleUserMessage, set, options)}>
    Si
  </Button>
}

export {
  Message,
  Options,
}
