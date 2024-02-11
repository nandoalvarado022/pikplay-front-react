import cookieCutter from 'cookie-cutter'
import React, { useState } from 'react'
import LoginInterface from './LoginInterface'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import useSystemStore from '../../hooks/useSystem'
import { loginSrv } from '../../services/user/userService'

function Login(props) {
  const { env, setValue } = useSystemStore((state => state))
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isHuman, setIsHuman] = useState(env == 'dev' ? true : false)
  const [isCodeSended, setIsCodeSended] = useState(false)
  const [phone, setPhone] = useState(null)
  const [buttonText, setButtonText] = useState('Enviar código')

  const numberValidated = phone => phone.length === 10

  const handleTengoCodigo = () => {
    const phone = document.getElementById('phoneLogin').value
    if (!phone || !numberValidated(phone)) {
      alert('Debes escribir un número de celular válido, recuerda que a este número llegará el código de acceso')
      setButtonText('Enviar código')
      return
    }
    setButtonText('Ingresar')
    setIsCodeSended(true)
  }

  const validateLogin = async (code) => {
    const contryCode = '57'
    const fullPhone = contryCode + phone
    try {
      const req = await loginSrv(parseInt(code, 10), fullPhone)
      const { data } = req
      if (data) {
        const { token } = data
        setValue("userLogged", data)
        handleCloseDialog()
        cookieCutter.set('token', token)
        cookieCutter.set('phone', phone)
        router.push('/')
      } else {
        debugger;
        document.getElementById('verificationCode').value = ''
        alert('Código no valido')
        setButtonText('Validar')
      }
    } catch (error) {
      debugger;
    }
  }

  const handleEnviar = async () => {
    setButtonText('Enviando...')
    const phone = document.getElementById('phoneLogin').value
    if (!phone || !numberValidated(phone)) {
      alert('Debes escribir un número de celular válido, recuerda que a este número llegará el código de acceso')
      setButtonText('Enviar código')
      return false
    }
    setButtonText('Validar')
    setIsCodeSended(true)
  }

  const handleCloseDialog = () => {
    setIsHuman(false)
    setIsCodeSended(false)
    setIsOpen(false)
  }

  const handleClickOpen = () => {
    setIsOpen(true)
  }

  const handleKeyUp = async (e) => {
    const code = e.target.value
    const verificationCode = document.getElementById('verificationCode').value
    if (verificationCode) Number(verificationCode)
    if (verificationCode < 999) return
    setButtonText('Validando...')
    validateLogin(code)
  }

  const onChangeReCaptcha = value => {
    value = env == 'dev' ? true : !!value
    setIsHuman(value)
  }

  return (
    <LoginInterface
      {...{
        buttonText,
        env,
        isCodeSended,
        isHuman,
        isOpen,
        handleClickOpen,
        handleEnviar,
        handleKeyUp,
        handleCloseDialog,
        handleTengoCodigo,
        onChangeReCaptcha,
        phone,
        setIsCodeSended,
        setPhone,
      }}
    />
  )
}

export default Login
