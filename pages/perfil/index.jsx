import { gql, useMutation } from "@apollo/client"
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from "react"
import Layout from "../../components/layout/Layout"
import { subirImagen } from "../../lib/utils"
import Interface from "./Interface"
import { connect } from "react-redux"

const CHANGE_PROFILE = gql`
mutation ChangeProfileData($input: UserInput){
  changeProfileData(input: $input)
}`

const Perfil = (props) => {
  const { user } = props
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

    // customDispatch({
    //   type: "CHANGE_PROPERTY", payload: {
    //     property: "user", value:
    //       { ...userData, ...variables }
    //   }
    // })
    changeProfileData({ variables: { input: variables } }) // Guardando en BD

    // saving in localstorage
    localStorage.setItem("user", JSON.stringify({ ...userData, ...variables }))
    setTimeout(() => {
      setIsSaving(false)
      // context.getNotifications()
    }, 1000)
  }

  return <Layout>
    <Interface {...{ userData, isSaving, handleSave, setUserData }} />
  </Layout>
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, null)(Perfil)
