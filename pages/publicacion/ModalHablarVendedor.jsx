import Autocomplete from "@material-ui/lab/Autocomplete"
import Button from "../../components/button/Button"
import TextField from "@material-ui/core/TextField"
import { gql, useMutation } from '@apollo/client'
import { useContext, useEffect, useState } from 'react'
import styles from "../../public/css/modalIngresoInfo.module.scss"
import { PikContext } from "../../states/PikState"
import CiudadControl from "../../components/ciudadControl/CiudadControl"
import Link from "next/link"
import { Alert } from "@material-ui/lab"

const ModalHablarVendedor = ({ datosPublicacion, setIsModalHablarVendedor }) => {
  const context = useContext(PikContext)
  const CREATE_TRANSACTION = gql`
    mutation createTransaction($user: Int, $user_to: Int, $publication: Int, $type: String){
        createTransaction(user: $user, user_to: $user_to, publication: $publication, type: $type)
    }`

  const [createTransaction, { }] = useMutation(CREATE_TRANSACTION);

  const handleCreateTransaction = () => {
    // Mutation para registrar la pre orden
    createTransaction({ variables: { user: context.user.id, user_to: datosPublicacion.user, publication: datosPublicacion.id, type: "Compra" } });

    const user = localStorage.getItem("user")
    if (!user) {
      const mensaje = toastr;
      mensaje.options.onclick = () => Router.push("/login")
      mensaje.warning("Debes ingresar para poder comprar")
      return false
    }

    // const identificacion = JSON.parse(localStorage.getItem("user")).identificacion
    // const direccion = JSON.parse(localStorage.getItem("user")).direccion
  }

  const enviarWhatsapp = () => {
    const url = window.location
    const texto = `Hola mi *nombre* es ${context.user.name}, estoy interesado en este producto ${url} para envío a ${context.user.city}`
    window.open("https://api.whatsapp.com/send?phone=" + datosPublicacion.user_phone + "&text=" + texto)
  }

  const handlePagar = async () => {
    handleCreateTransaction()
    enviarWhatsapp()
    return
  }

  return <div className={styles._modalIngresoInfo}>
    <div className={styles.background}></div>
    <div className={`Card ${styles.Card}`}>
      <h2>Tus datos para la entrega y pago</h2>
      <TextField disabled value={context.user.name} autoComplete="nombre" name="nombre_completo" fullWidth={true} label="Nombre" margin="normal" size={25} />
      <CiudadControl />
      <Alert severity="info">
        <Link href="/perfil" as="/perfil">
          Puedes hacer clic aquí para cambiar estos datos
        </Link>
      </Alert>
      <div className={styles.actions}>
        <Button onClick={() => { setIsModalHablarVendedor() }} color="normal">Cancelar</Button>
        <Button onClick={handlePagar} color="blue">Hablar con el vendedor</Button>
      </div>
    </div>
  </div>
}

export default ModalHablarVendedor