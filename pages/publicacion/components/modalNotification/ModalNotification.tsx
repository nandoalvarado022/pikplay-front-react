import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Button as ButtonMat } from '@material-ui/core'
import DialogActions from '@material-ui/core/DialogActions'
import CoinIcon from '../../../../components/CoinIcon/CoinIcon'
import Articles from '../../../../components/articles/Articles'
import styles from './styles.module.scss'
import Button from '../../../../components/button/Button'

interface ModalNotificationProps {
  isOpen: boolean
}

const ModalNotification = ({ isOpen, notification }) => {
  const [open, setOpen] = React.useState(isOpen);
  const handleClose = () => {
    setOpen(false)
  }

  return <Dialog className={styles.ModalNotification} onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
    <DialogTitle id="alert-dialog-title">
      <img src="/images/icons/check.png" width={30} />
      ¡Ya casi tienes tus premios!
    </DialogTitle>
    <div className={styles.content}>
      <div className='flex'>
        <img src="https://cdn-icons-png.flaticon.com/512/5717/5717488.png" style={{ alignSelf: 'center' }} width={100} />
        <p className='Card'>Gracias por confiar en nosotros, como agradecimiento te llevas algunos creditos para tus proximas compras, participar en sorteos o guardarlos y redimirlos cuando sea el momento preciso!</p>
      </div>

      <div className='Card'>
        <p>Ahora solo basta que se concrete la compra y podras disfrutar de
          <span style={{ display: 'inline-block', margin: '0 10px' }}><CoinIcon coins={1000} /></span>
        </p>
      </div>

      <div>
        Quizas quieras echarle un vistazo a estos articulos:
        <Articles id={2} size={1} />
      </div>
    </div>
    <Button className={styles.dont_show_again} color="normal" isLink>
      No volver a mostrar esto
    </Button>
    <DialogActions>
      <Button color="blue" onClick={() => setOpen(false)}>
        Cerrar
      </Button>
    </DialogActions>
  </Dialog>

}

export default ModalNotification
