import ReCAPTCHA from "react-google-recaptcha"
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from "../button/Button"
import styles from "./login.module.scss"

export default function LoginInterface({ buttonText, isCodeSended, isHuman, isOpen, handleClickOpen, handleEnviar, handleKeyUp, handleCloseDialog, handleTengoCodigo, onChangeReCaptcha, phone, setIsCodeSended, setPhone }) {
  return <div>
    <Button alt="Ingersar con número de teléfono" color="blue" id="btnStart" onClick={handleClickOpen}>Play</Button>
    <Dialog fullWidth maxWidth="sm" open={isOpen} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
      <DialogContent>
        <DialogContentText>
          Ingresa a tu cuenta
        </DialogContentText>
        {/* Fields */}
        <div className={styles.flex} style={{ display: isCodeSended ? "none" : "flex" }}>
          <img height="42" width="40" className={styles.icon_colombia} src="/images/icons/colombia.png" alt="" />
          <span>(+57)</span>
          <TextField onKeyUp={(e) => setPhone(e.target.value)} margin="dense" id="phoneLogin" label="Número de celular" type="number" fullWidth />
        </div>
        <div className="center">
          <ReCAPTCHA
            sitekey="6Ldyz98eAAAAAFCJEbBSdSRqNu4Kn1XqZugCi9Qg"
            onChange={onChangeReCaptcha}
          />
        </div>
        {isCodeSended && <TextField type="number" disabled={buttonText == "Validando..." ? true : false} onKeyUp={handleKeyUp} margin="dense" id="verificationCode" label={`Escribe aquí el código de 4 dígitos que te envíamos al número ${phone}`} fullWidth />}
        <small style={{ marginTop: "20px", display: "block" }}>
          Al hacer clic en "Enviar", aceptas nuestras Condiciones, la Política de datos y la Política de cookies. Es posible que te enviemos notificaciones por SMS, que puedes desactivar cuando quieras.
        </small>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => (isCodeSended && isHuman) ? setIsCodeSended(false) : handleCloseDialog()} color="normal">
          {!isCodeSended && "Cancelar"}
          {isCodeSended && "Intentar conn otro número"}
        </Button>
        {!isCodeSended && <Button onClick={isHuman ? handleTengoCodigo : null} color={isHuman ? "yellow" : "normal"}>
          Ya tengo código
        </Button>}
        <Button color={isHuman ? "blue" : "normal"} onClick={(!isCodeSended && isHuman) ? handleEnviar : null}>
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  </div>
}