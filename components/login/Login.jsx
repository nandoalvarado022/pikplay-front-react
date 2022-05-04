import cookieCutter from 'cookie-cutter'
import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { useState } from "react"
import LoginInterface from "./LoginInterface"
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

function Login(props) {
	const router = useRouter()
	const dispatch = useDispatch()
	const [isOpen, setIsOpen] = useState(false)
	const [isHuman, setIsHuman] = useState(false)
	const [isCodeSended, setIsCodeSended] = useState(false)
	const [phone, setPhone] = useState(null)
	const [buttonText, setButtonText] = useState("Enviar código")
	const VALIDATE_QUERY = gql`
	query validateLogin($phone: String, $code: Int){
		validateLogin(phone: $phone, code: $code)
	}`

	const numberValidated = (phone) => phone.length == 10

	const handleTengoCodigo = () => {
		const phone = document.getElementById("phoneLogin").value
		if (!phone || !numberValidated(phone)) {
			alert("Debes escribir un número de celular válido, recuerda que a este número llegará el código de acceso")
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
				cookieCutter.set('token', token)
				const name = JSON.parse(validateLogin)?.name
				toast(<div>Bienvenido {name} 😎<br /> 
				<small>Cargando tus preferencias 👾 ...</small></div>)
				// router.reload() // Sin saber porque es necessario así que se desactiva
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
		if (!phone || !numberValidated(phone)) {
			alert("Debes escribir un número de celular válido, recuerda que a este número llegará el código de acceso")
			setButtonText("Enviar código")
			return false
		}
		dispatchLogin({ variables: { phone: "57" + phone } });
		setButtonText("Validar")
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
		const verificationCode = document.getElementById("verificationCode").value
		if (verificationCode) Number(verificationCode)
		if (verificationCode < 999) return
		setButtonText("Validando...")
		validateLogin({ variables: { phone: "57" + phone, code: parseInt(verificationCode) } })
	}

	const onChangeReCaptcha = (value) => {
		value = !!value
		setIsHuman(value)
	}

	return <LoginInterface {...{ buttonText, isCodeSended, isHuman, isOpen, handleClickOpen, handleEnviar, handleKeyUp, handleCloseDialog, handleTengoCodigo, onChangeReCaptcha, phone, setIsCodeSended, setPhone }} />
}

export default Login