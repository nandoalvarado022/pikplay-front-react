import React from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '../button/Button'
import styles from './login.module.scss'
import Link from 'next/link'

export default function LoginInterface({
  buttonText,
  isCodeSent,
  isHuman,
  isOpen,
  handleClickOpen,
  handleEnviarCodigo,
  handleKeyUp,
  handleCloseDialog,
  handleFixPhone,
  handleTengoCodigo,
  onChangeReCaptcha,
  phone,
  setIsCodeSended,
  setPhone,
}) {
  isHuman = true;
  return (
    <div id={styles.LoginComponent}>
      <Button
        alt='Ingersar con número de teléfono'
        className={styles.playButton}
        color='blue'
        id='btnStart'
        onClick={handleClickOpen}>
        Play
      </Button>
      <Dialog
        fullWidth
        maxWidth='sm'
        open={isOpen}
        onClose={handleCloseDialog}
        aria-labelledby='form-dialog-title'
      >
        <DialogContent>
          <DialogContentText>Ingresa a tu cuenta</DialogContentText>
          {/* Fields */}
          <div
            className={styles.flex}
            style={{ display: isCodeSent ? 'none' : 'flex' }}>
            <img
              height='42'
              width='40'
              className={styles.icon_colombia}
              src='/images/icons/colombia.png'
              alt=''
            />
            <span>(+57)</span>
            <TextField
              onKeyUp={e => setPhone(e.target.value)}
              margin='dense'
              id='phoneLogin'
              label='Número de celular'
              type='number'
              fullWidth
            />
          </div>
          {!isCodeSent && (
            <center className='m-t-10'>
              {/* <ReCAPTCHA
                sitekey='6Ldyz98eAAAAAFCJEbBSdSRqNu4Kn1XqZugCi9Qg'
                onChange={onChangeReCaptcha}
              /> */}
            </center>
          )}

          {isCodeSent && (
            <>
              <TextField
                autoComplete={false}
                disabled={buttonText == 'Validando...' ? true : false}
                fullWidth
                id='verificationCode'
                label={`Código de 4 dígitos`}
                margin='dense'
                onKeyUp={handleKeyUp}
                type='number' />
              <small>
                <a href='https://api.whatsapp.com/send?phone=573054202450&text=Tengo problemas al recibir mi código de ingreso'
                  target='_BLANK'
                  rel="noreferrer">
                  Tengo problemas al recibir mi código de ingreso
                </a>
              </small>
            </>
          )}
          <small className={styles.terminos_condiciones}>
            Al ingresar en Pikplay aceptas nuestros
            <Link href='/articulo/[id]' as='/articulo/terminos-y-condiciones'>
              <a>términos y condiciones</a>
            </Link>
            <br />
            Es posible que te enviemos notificaciones por SMS, que puedes
            desactivar cuando quieras.
          </small>
        </DialogContent>
        <DialogActions>
          {isCodeSent && <Button onClick={handleFixPhone} color='normal'>
            Correjir número de celular
          </Button>}
          <Button onClick={handleCloseDialog} color='normal'>
            Cancelar
          </Button>
          {!isCodeSent && (
            <Button
              onClick={isHuman ? handleTengoCodigo : null}
              color={isHuman ? 'yellow' : 'normal'}>
              Ya tengo código
            </Button>
          )}
          <Button
            color={isHuman ? 'blue' : 'normal'}
            onClick={!isCodeSent && isHuman ? handleEnviarCodigo : null}>
            {buttonText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
