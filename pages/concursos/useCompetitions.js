import { useState } from "react"
import VARS from "../../src/lib/variables"
import { useIAStore } from "../../src/components/ia/IAstore"

const useCompetitions = () => {
  const [competitions, setCompetitions] = useState([])

  const {
    setIAMessage,
  } = useIAStore((state => state))

  const getCompetitions = () => new Promise ((resolve, reject) => {
    const url = VARS.API_URL + '/competitions'
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCompetitions(data)
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
