import Button from "../../components/button/Button"
import TextField from "@material-ui/core/TextField"
import { gql, useMutation } from '@apollo/client'
import styles from "../../public/css/modalIngresoInfo.module.scss"
import CiudadControl from "../../components/ciudadControl/CiudadControl"
import Link from "next/link"
import { Alert } from "@material-ui/lab"
import { useSelector } from "react-redux"

const ModalHablarVendedor = (props) => {
  const user = useSelector((state) => state.user)
  const { datosPublicacion, setIsModalHablarVendedor } = props
  const CREATE_TRANSACTION = gql`
    mutation createTransaction($user: Int, $user_to: Int, $publication: Int, $type: String){
        createTransaction(user: $user, user_to: $user_to, publication: $publication, type: $type)
    }`

  const [createTransaction, { }] = useMutation(CREATE_TRANSACTION);

  const handleCreateTransaction = () => {
    // Mutation para registrar la pre orden
    createTransaction({ variables: { user: user.id, user_to: datosPublicacion.user.id, publication: datosPublicacion.id, type: "PURCHASE" } });

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
    const seller_phone = props.datosPublicacion.user?.phone || null
    const url = window.location
    const texto = `Hola mi nombre es ${user.name}, estoy interesado en este producto ${url} para envío a ${user.city}`
    window.open("https://api.whatsapp.com/send?phone=" + seller_phone + "&text=" + texto)
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
      <TextField disabled value={user.name} autoComplete="nombre" name="nombre_completo" fullWidth={true} label="Nombre" margin="normal" size={25} />
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