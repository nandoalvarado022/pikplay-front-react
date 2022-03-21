import Perfil from "./Perfil"
import Layout from "../../components/layout/Layout"
import { gql, useMutation } from "@apollo/client"
import { subirImagen } from "../../lib/utils"
import { toast } from 'react-toastify'
import { useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from 'next/router'

const CHANGE_PROFILE = gql`
mutation ChangeProfileData($input: UserInput){
  changeProfileData(input: $input)
}`

const Index = (props) => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const router = useRouter()
  const showSavedMessage = !!Object.keys(router.query).find(x => x == "updated")
  const [changeProfileData, { data, error, loading }] = useMutation(CHANGE_PROFILE)
  const [userData, setUserData] = useState({
    ...user,
    // coins: context?.coins
  })
  const [isSaving, setIsSaving] = useState(false)
  const [isProfileComplete, setIsProfileComplete] = useState(true)
  const loadUserInformation = () => {
    const user = user
    delete user.login_code
    if (!user.name || !user.email || !user.picture) setIsProfileComplete(false)
    else setIsProfileComplete(true)
    setUserData(user)
  }

  const handleSave = async () => {
    setIsSaving(true)
    // saving image in firebase
    let picture = document.getElementById("profileElement")
    if (picture.value) {
      picture = await subirImagen({ tipoArchivo: "profiles", idImageElement: "profileElement" })
      picture = picture[0]
    } else picture = null

    let variables = { id: userData.id }
    if (user.city) variables.city = user.city
    if (userData.email) variables.email = userData.email
    if (userData.name) variables.name = userData.name
    if (picture) variables.picture = picture // Setting picture
    dispatch({
      type: "CHANGE_PROPERTY",
      payload: {
        property: "user", value:
          { ...userData, ...variables }
      }
    })
    changeProfileData({ variables: { input: variables } }) // Guardando en BD

    // Message to user
    setTimeout(() => {
      setIsSaving(false)
      toast('Perfil actualizado')
    }, 1000)
  }

  return <Layout>
    <Perfil {...{ dispatch, userData, isSaving, handleSave, setUserData }} />
  </Layout>
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default Index