import { useState } from "react"
import VARS from "../../../lib/variables"
import { useIAStore } from "../../ia/IAstore"
import { getCompetitions as getComptSrv } from '../../../services/competition/competitionService'

const useCompetitions = () => {
  const [competitions, setCompetitions] = useState([])

  const {
    setIAMessage,
  } = useIAStore((state => state))

  const getCompetitions = () => new Promise((resolve, reject) => {
    getComptSrv().then((data) => {
      setCompetitions(data?.data)
      resolve(data)
    })
  })

  const postCompetitionMember = (competitionID, number) => new Promise((resolve, reject) => {
    const url = `${VARS.API_URL}/competitions-member/${competitionID}/register`

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "user_id": 2,
        number
      })
    };

    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        resolve(data)
      })
      .catch((error) => {
        reject(error)
      });
  });

  return {
    competitions,
    getCompetitions,
    postCompetitionMember
  }
}

export default useCompetitions
