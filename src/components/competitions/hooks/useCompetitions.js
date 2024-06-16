import { useState, useEffect } from "react"
import VARS from "../../../lib/variables"
import { useIAStore } from "../../ia/IAstore"
import { getComptSrv } from '../../../services/competition/competitionService'
import { deleteCompetitionMemberSrv } from '../../../services/competition/competitionService';
import toastr from 'toastr'
import { toast } from 'react-toastify'

const useCompetitions = () => {
  const [competitions, setCompetitions] = useState([])
  const [selectedNumber, setSelectedNumber] = useState(null)
  const [competitionDetail, setCompetitionDetail] = useState({})
  const [competitionMembers, setCompetitionMembers] = useState([])
  const [isOnlyAvailableNumbers, setIsOnlyAvailableNumbers] = useState(false)

  const getCompetitions = (slug) => {
    return new Promise((resolve, reject) => {
      getComptSrv(null, slug)
        .then((data) => {
          if (slug) {
            setCompetitionMembers(data.competitionMembers)
          } else {
            setCompetitions(data)
          }
          resolve(data)
        })
    })
  }

  const handleCompetitionClick = (slug) => {
    getComptSrv(null, slug).then((data) => {
      setCompetitionDetail(data)
    })
  }

  const postCompetitionMember = (competitionID, number) => new Promise((resolve, reject) => {
    const url = `${VARS.API_URL}/competitions-member/register`
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

  const liberarNumero = () => {
    toast.promise(deleteCompetitionMemberSrv(1, 2)
      .then(data => {
        // TODO Se libera el cupo
      }),
      {
        pending: 'Liberando cupo',
        success: 'Cupo liberado 👌',
        error: 'Error al liberar el cupo 🤯'
      }
      , {
        position: "top-left"
      })

    deleteCompetitionMemberSrv(1, 2)
      .then(data => {
        // toast('No se pudo validar el cupón 😕')
        // alert('Cupo liberado!')
        getCompetitions()
      })
  }

  const deleteNotPaidNumbers = () => {
    toast('Se liberaron los números no pagados 👌')
    deleteCompetitionMemberSrv(3, null)
      .then(data => {
        console.log('Cupo liberado!')
        getCompetitions()
      })
  }

  useEffect(() => {
    console.log("competitionDetail updated!");
  }, [competitionDetail])

  useEffect(() => {
    console.log("competitionMembers updated!");
  }, [competitionMembers])

  return {
    competitionDetail,
    competitions,
    competitionMembers,
    deleteNotPaidNumbers,
    getCompetitions,
    handleCompetitionClick,
    liberarNumero,
    isOnlyAvailableNumbers,
    postCompetitionMember,
    setCompetitionDetail,
    setCompetitionMembers,
    selectedNumber,
    setSelectedNumber,
    setIsOnlyAvailableNumbers,
  }
}

export default useCompetitions
