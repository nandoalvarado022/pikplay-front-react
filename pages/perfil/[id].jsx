import React from 'react'
import Perfil from '../../src/components/profile/Perfil'
import Layout from '../../src/components/layout/Layout'
// import { gql, useMutation } from '@apollo/client'
import { subirImagen } from '../../src/lib/utils'
import { toast } from 'react-toastify'
import { useContext, useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import useSystemStore from '../../src/hooks/storeSystem'
import { validateTokenSrv, updateProfileSrv, getExperiencesSrv } from '../../src/services/user/userService'

const Index = props => {
  const descripcion =
    'Pikplay es un sitio web de comercio electrónico, un marketplace donde se encuentran tiendas e independientes de alta confiabilidad ofreciendo videojuegos, artículos y consolas de Playstation, Xbox y Nintendo Switch con los mejores precios del mercado en Colombia'
  const image = ''
  const title = 'Pikplay | Perfil'
  const url = 'https://pikplay.co/perfil'
  const router = useRouter()
  const showSavedMessage = !!Object.keys(router.query).find(x => x == 'updated')
  const { userLogged, setValue } = useSystemStore()
  const [userDataUpdated, setUserData] = useState({
    ...userLogged,
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

  const handleUploadImage = async (callback) => {
    let picture = document.getElementById('profileElement')
    if (picture.value != '') {
      const res = await subirImagen({
        folder: 'users',
        idImageElement: 'profileElement',
      })
      const { url } = res
      return url
    } else return null
  }

  const handleSave = async () => {
    setIsSaving(true)

    const imageUpdated = await handleUploadImage() // Updating Image

    if (imageUpdated) userDataUpdated.picture = imageUpdated
    updateProfileSrv(userDataUpdated) // Updating Information
      .then(data => {
        setValue('userLogged', userDataUpdated);
      })
      .catch(err => {
        toast('Error')
      })

    // Message to user
    setTimeout(() => {
      setIsSaving(false)
      toast('Perfil actualizado')
    }, 1000)
  }

  return (
    <Layout image={image} descripcion={descripcion} title={title} url={url}>
      <Perfil
        userLogged={userDataUpdated}
        isSaving={isSaving}
        handleSave={handleSave}
        setUserData={setUserData}
      />
    </Layout>
  )
}

export const getServerSideProps = async ctx => {
  // const { statusCode } = await validateTokenSrv(ctx)
  const statusCode = 200
  const experiencesResponse = await getExperiencesSrv(ctx)
  if (statusCode === 403) {
    return {
      redirect: {
        destination: '/?action=not_authorized',
        permanent: false,
      },
    }
  }
  return {
    props: {
      ...experiencesResponse,
    }
  }
}

export default Index
