// Se coloca aquí porque se va a reutilizar para modal de pagos de productos, suscripciones de categorias etc.

import styles from './styles.module.scss'

import React, { useEffect, useState } from 'react'
import Button from '../button/Button'
import { TextField } from '@mui/material'
import CiudadControl from '../ciudadControl/CiudadControl'
import Link from 'next/link'
import { Alert } from '@mui/material';
import { useSelector } from 'react-redux'
import CouponBox from '../couponBox/CouponBox'
import { formatNumber, GET_CLAIMED_COUPONS } from '../../lib/utils'
import classNames from 'classnames'
import Checkout from '../checkout/Checkout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import toastr from 'toastr'
import useSystemStore from '../../hooks/useSystem'
import { createTransactionsSrv } from '../../services/transaction/transactionService'

const ModalCheckout = props => {
  const [couponValue, setCouponValue] = useState(null)
  const [couponCode, setCouponCode] = useState(null)
  const { userLogged } = useSystemStore()
  const { datosPublicacion, setIsModalHablarVendedor } = props
  // const CREATE_TRANSACTION = gql`
  //   mutation createTransaction(
  //     $user: Int
  //     $user_to: Int
  //     $publication: Int
  //     $type: String
  //   ) {
  //     createTransaction(
  //       user: $user
  //       user_to: $user_to
  //       publication: $publication
  //       type: $type
  //     )
  //   }
  // `
  // const [createTransaction] = useMutation(CREATE_TRANSACTION, {
  //   context: {
  //     headers: {
  //       'Operation-Name': 'createTransaction',
  //     },
  //   },
  // })
  // const [getClaimedCoupons] = useLazyQuery(GET_CLAIMED_COUPONS, {
  //   fetchPolicy: 'no-cache',
  //   variables: {
  //     publication: datosPublicacion?.id,
  //     user: user.id,
  //   },
  //   onCompleted: ({ getClaimedCoupons }) => {
  //     if (getClaimedCoupons && getClaimedCoupons.length > 0) {
  //       setCouponCode(getClaimedCoupons[0].coupon)
  //       setCouponValue(getClaimedCoupons[0].coins)
  //     }
  //   },
  // })
  const handleCreateTransaction = async () => {
    if (!userLogged.uid) {
      const mensaje = toastr()
      // mensaje.options.onclick = () => Router.push('/login')
      mensaje.warning('Debes ingresar para poder comprar')
      return false
    }

    try {
      // Registrando la pre orden
      const resp = await createTransactionsSrv({
        uid: userLogged.uid,
        uid_target: datosPublicacion.user.uid,
        pid: datosPublicacion.pid,
        type: 'PURCHASE',
      })
    } catch (err) {
      // TODO Loguear error
    }
  }

  const enviarWhatsapp = () => {
    const seller_phone = props.datosPublicacion.user?.phone || null
    const url = window.location
    let message = `Hola soy ${userLogged.name}, estoy interesado en este producto ${url} para envío a ${userLogged.city}. `
    if (couponCode)
      message = message + `Ademas he redimido el cupón ${couponCode}`
    window.open(
      'https://api.whatsapp.com/send?phone=' +
      seller_phone +
      '&text=' +
      message,
    )
  }

  const handlePagar = () => {
    handleCreateTransaction()
    enviarWhatsapp()
  }

  const handleCoupon = data => {
    if (data?.coupon) {
      setCouponValue(data.value)
      setCouponCode(data.coupon)
    }
  }

  useEffect(() => {
    // getClaimedCoupons()
  }, [])

  return (
    <div className={styles._modalIngresoInfo}>
      <div className={styles.background}></div>
      <div className={`Card ${styles.Card}`}>
        <h2>Tus datos para la entrega y pago</h2>
        <section className={styles.info_cliente}>
          <TextField
            autoComplete='nombre'
            disabled
            fullWidth={true}
            label='Nombre'
            name='nombre_completo'
            margin='normal'
            value={userLogged?.name}
          />
          <CiudadControl userLogged={userLogged} />
        </section>
        <section className={classNames('m-t-20 f-s-14', [styles.bottom])}>
          {!!datosPublicacion?.price && (
            <table className={styles.payment_info}>
              {couponValue && (
                <>
                  <tr>
                    <td>Total:</td>
                    <td>
                      <del>${formatNumber(datosPublicacion?.price)}</del>
                    </td>
                  </tr>

                  <tr className={styles.discount}>
                    <td>Descuento:</td>
                    <td>-${formatNumber(couponValue)}</td>
                  </tr>
                </>
              )}

              <tr align="right" className={styles.sale_price}>
                <td>Pagas:</td>
                <td>
                  ${formatNumber(datosPublicacion?.price - couponValue)}
                </td>
              </tr>
            </table>
          )}

          {/* Cupón */}
          {/* <CouponBox
            className='block m-t-10'
            callback={handleCoupon}
            publication={datosPublicacion?.id} /> */}

          {couponCode && (
            <Alert className='m-t-10'>
              Tienes un cupón activo para esta compra:{' '}
              <b>{couponCode.toUpperCase()}</b>
            </Alert>
          )}
          <Alert
            className='m-t-10'
            icon
            severity='info'>
            <div className=''>Terminos y condiciones</div>
            <small>
              El pago del producto y costos asociados como el envío se hablan
              directamente con el vendedor. Pikplay no te hace cobro adicional
              de ninguna clase. Si tienes aplicado un cúpon este se verá
              reflejado en el panel del vendedor y deberá ser aplicado en el
              momento del pago del producto o servicio.
            </small>
          </Alert>
        </section>
        <section className={styles.actions}>
          <Button
            onClick={() => {
              setIsModalHablarVendedor()
            }}
            color='normal'>
            Cancelar
          </Button>
          <Button onClick={handlePagar} color='yellow'>
            <FontAwesomeIcon className='m-r-10' icon={faComment} />
            Contactar
          </Button>
          {/* <Checkout
          amount={datosPublicacion?.sale_price}
          invoice={datosPublicacion?.sale_price}
          name={datosPublicacion?.title}
          name_billing={user?.name}
          number_doc_billing={user?.identificacion}
        /> */}
        </section>
      </div>
    </div >
  )
}

export default ModalCheckout
