import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { useState } from "react"
import LoginInterface from "./LoginInterface"
import { loadAudio } from '../../lib/utils'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

function Login(props) {
	const router = useRouter()
	const dispatch = useDispatch()
	const [isOpen, setIsOpen] = useState(false)
	const [isCodeSended, setIsCodeSended] = useState(false)
	const [phone, setPhone] = useState(null)
	const [buttonText, setButtonText] = useState("Enviar código")
	const VALIDATE_QUERY = gql`
	query validateLogin($phone: String, $code: Int){
		validateLogin(phone: $phone, code: $code)
	}`

	const handleTengoCodigo = () => {
		const phone = document.getElementById("phoneLogin").value
		if (!phone) {
			alert("Debes escribir el número de celular vinculado a tu cuenta")
			setButtonText("Enviar código")
			return
		}
		setButtonText("Ingresar")
		setIsCodeSended(true)
	}

	const [validateLogin, { data: dataValidate, error: errorValidate }] = useLazyQuery(VALIDATE_QUERY, {
		onCompleted: (data) => {
			const { validateLogin } = dataValidate
			if (validateLogin) {
				const token = JSON.parse(validateLogin).token
				dispatch({ type: "CHANGE_PROPERTY", payload: { property: "user", value: JSON.parse(validateLogin) } })
				router.reload('/')
				// setIsOpen(false)
				// loadAudio("/audios/login.mp3")
			} else {
				document.getElementById("verificationCode").value = ""
				alert("Código no valido")
				setButtonText("Validar")
			}
		},
		onError: (err) => {
			document.getElementById("verificationCode").value = ""
			alert("Código no valido")
			setButtonText("Validar")
		}
	})

	const LOGIN_MUTATION = gql`
	mutation Login($phone: String){
		setLoginCode(phone: $phone)
	}`

	const [dispatchLogin, { }] = useMutation(LOGIN_MUTATION);

	const handleEnviar = async () => {
		setButtonText("Enviando...")
		const phone = document.getElementById("phoneLogin").value
		if (!phone) {
			alert("Debes escribir un número celular, recuerda que a este número llegará el código de acceso")
			setButtonText("Enviar código")
			return false
		}
		dispatchLogin({ variables: { phone: "57" + phone } });
		setButtonText("Validar")
		setIsCodeSended(true)
	}

	const handleCloseDialog = () => {
		setIsCodeSended(false)
		setIsOpen(false)
	}

	const handleClickOpen = () => {
		setIsOpen(true)
	}

	const handleKeyUp = async (e) => {
		const verificationCode = document.getElementById("verificationCode").value
		if (verificationCode) Number(verificationCode)
		if (verificationCode < 999) return
		setButtonText("Validando...")
		validateLogin({ variables: { phone: "57" + phone, code: parseInt(verificationCode) } })
	}

	return <LoginInterface {...{ buttonText, isCodeSended, isOpen, handleClickOpen, handleEnviar, handleKeyUp, handleCloseDialog, handleTengoCodigo, phone, setIsCodeSended, setPhone }} />
}

export default Login