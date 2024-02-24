import styles from './styles.module.scss'

import TextField from '@mui/material/TextField'
import React, { useState } from 'react'
// import Button from '../button/Button'
import { Button as ButtonMat } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '../button/Button'
import Link from 'next/link'
// import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import {
  getNotifications,
  GET_NOTIFICATIONS,
  VALIDATE_COUPON,
} from '../../lib/utils'
import { toast } from 'react-toastify'
// import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import useSystemStore from '../../hooks/useSystem'

const CouponBox = props => {
  // const dispatch = useDispatch()
  // const user = useSelector(state => state.user)
  const { userLogged } = useSystemStore()
  const {
    callback,
    className,
    label = 'Redimir cupón',
    publication = null,
  } = props
  const [couponValue, setCouponValue] = useState('')
  const [open, setOpen] = React.useState(false)

  // const [getNotifications] = useLazyQuery(GET_NOTIFICATIONS, {
  //   // Obteniendo notificaciones
  //   fetchPolicy: 'no-cache',
  //   variables: {
  //     user: user?.id,
  //   },
  //   onCompleted: ({ getNotifications }) => {
  //     getNotifications &&
  //       dispatch({
  //         type: 'CHANGE_PROPERTY',
  //         payload: { property: 'notifications', value: getNotifications },
  //       })
  //   },
  // })

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  // const [validateCoupon, { data }] = useMutation(VALIDATE_COUPON, {
  //   variables: {
  //     coupon: couponValue.toUpperCase(),
  //     publication,
  //     user: user?.id,
  //   },
  //   onCompleted: ({ validateCoupon: data }) => {
  //     toast(data.message)
  //     if (data.status === 200) {
  //       setOpen(false)
  //       // getNotifications()
  //       callback && callback({ coupon: couponValue, value: data.couponCoins })
  //     }
  //   },
  //   onError: err => {
  //     console.log(err)
  //   },
  // })

  const handleValidate = async () => {
    if (couponValue.length === 0) {
      alert('Debes ingresar un código')
      return
    }
    // validateCoupon()
  }

  return (
    <div className={classNames('', [className, styles.CouponBox])}>
      <Button color='link' onClick={handleClickOpen}>
        {label}
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>
          Redimir cupón promocional para obtener Pikcoins
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <TextField
              autoFocus={true}
              autoComplete='couponValue'
              className='m-b-10 coupon-field'
              onChange={e => setCouponValue(e.target.value)}
              label='Digita tu cupón aquí'
              size='small'
            />
            <div>
              <small>
                <Link
                  href='/articulo/[id]'
                  as='/articulo/terminos-y-condiciones'>
                  <a>
                    Términos y condiciones acerca de la redención de cupones
                  </a>
                </Link>
              </small>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <ButtonMat onClick={handleClose} color='primary'>
            Cancelar
          </ButtonMat>
          <ButtonMat onClick={handleValidate} color='primary'>
            Validar
          </ButtonMat>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CouponBox
