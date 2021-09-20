import { TextField } from "@material-ui/core"
import { useState } from "react"
import Button from "../button/Button"
import styles from "./styles.module.scss"

const useField = ({ type }) => {
    const [value, setValue] = useState()

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type, value, onChange
    }
}

const ModalLead = () => {
    const name = useField({ type: "text" })
    const email = useField({ type: "text" })
    const phone = useField({ type: "text" })

    return <div className={`${styles.flex} flex`}>
        <div>
            <h2>Bienvenido,
                <small>
                    presentate para darte una mejor experiencia
                </small>
            </h2>
            <div className="Card">
                <TextField {...name} fullWidth={true} label="Tú nombre o tú marca" margin="normal" />
                <TextField {...email} fullWidth={true} label="Correo electrónico" margin="normal" />
                <TextField {...phone} fullWidth={true} label="Número de contacto (celular)" margin="normal" />
                <p>
                    <label>Intereses:</label>
                    <ul>
                        <ol>Nintendo Switch</ol>
                        <ol>PC</ol>
                        <ol>Playstation</ol>
                        <ol>XBOX</ol>
                        <ol>Comprar</ol>
                        <ol>Vender</ol>
                    </ul>
                </p>
                <Button color="blue">Enviar y continuar</Button>
            </div>
        </div>
        <div>
            <video controls autoplay style={{ borderRadius: "10px", marginTop: "20px" }} width="300">
                <source src="/videos/No eres un comprador cualquiera, eres un comprador gamer.mp4" />
            </video>
        </div>
    </div>
}

export default ModalLead