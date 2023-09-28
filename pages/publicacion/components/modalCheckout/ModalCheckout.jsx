import React, { useEffect, useState } from 'react'
import Button from '../../../../components/button/Button'
import TextField from '@material-ui/core/TextField'
import { gql, useLazyQuery, useMutation } from '@apollo/client'
import styles from './styles.module.scss'
import CiudadControl from '../../../../components/ciudadControl/CiudadControl'
import Link from 'next/link'
import { Alert } from '@material-ui/lab'
import { useSelector } from 'react-redux'
import CouponBox from '../../../../components/couponBox/CouponBox'
import { formatNumber, GET_CLAIMED_COUPONS } from '../../../../lib/utils'
import classNames from 'classnames'
import Checkout from '../../../../components/checkout/Checkout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'

const ModalCheckout = props => {
  const [couponValue, setCouponValue] = useState(null)
  const [couponCode, setCouponCode] = useState(null)
  const user = useSelector(state => state.user)
  const [showConditions, setShowConditions] = useState(false)
  const { datosPublicacion, setIsModalHablarVendedor } = props
  const CREATE_TRANSACTION = gql`
    mutation createTransaction(
      $user: Int
      $user_to: Int
      $publication: Int
      $type: String
    ) {
      createTransaction(
        user: $user
        user_to: $user_to
        publication: $publication
        type: $type
      )
    }
  `
  const [createTransaction] = useMutation(CREATE_TRANSACTION, {
    context: {
      headers: {
        'Operation-Name': 'createTransaction',
      },
    },
  })
  const [getClaimedCoupons] = useLazyQuery(GET_CLAIMED_COUPONS, {
    fetchPolicy: 'no-cache',
    variables: {
      publication: datosPublicacion?.id,
      user: user.id,
    },
    onCompleted: ({ getClaimedCoupons }) => {
      if (getClaimedCoupons && getClaimedCoupons.length > 0) {
        setCouponCode(getClaimedCoupons[0].coupon)
        setCouponValue(getClaimedCoupons[0].coins)
      }
    },
  })
  const handleCreateTransaction = () => {
    if (!user) {
      const mensaje = toastr
      mensaje.options.onclick = () => Router.push('/login')
      mensaje.warning('Debes ingresar para poder comprar')
      return false
    }

    // Mutation para registrar la pre orden
    createTransaction({
      variables: {
        user: user.id,
        user_to: datosPublicacion.user.id,
        publication: datosPublicacion.id,
        type: 'PURCHASE',
      },
    }).then(data => {
      alert('OK!')
    })

    // const identificacion = JSON.parse(localStorage.getItem("user")).identificacion
    // const direccion = JSON.parse(localStorage.getItem("user")).direccion
  }

  const enviarWhatsapp = () => {
    const seller_phone = props.datosPublicacion.user?.phone || null
    const url = window.location
    let message = `Hola soy ${user.name}, estoy interesado en este producto ${url} para envío a ${user.city}. `
    if (couponCode)
      message = message + `Ademas he redimido el cupón ${couponCode}`
    window.open(
      'https://api.whatsapp.com/send?phone=' +
        seller_phone +
        '&text=' +
        message,
    )
  }

  const handlePagar = async () => {
    handleCreateTransaction()
    enviarWhatsapp()
    return
  }

  const handleCoupon = data => {
    if (data?.coupon) {
      setCouponValue(data.value)
      setCouponCode(data.coupon)
    }
  }

  useEffect(() => {
    getClaimedCoupons()
  }, [])

  return (
    <div className={styles._modalIngresoInfo}>
      <div className={styles.background}></div>
      <div className={`Card ${styles.Card}`}>
        <h2>Tus datos para la entrega y pago</h2>
        <section>
          <TextField
            value={user.name}
            autoComplete='nombre'
            name='nombre_completo'
            fullWidth={true}
            label='Nombre'
            margin='normal'
            size={25}
          />
          <CiudadControl />
        </section>
        <section className={classNames('m-t-20 f-s-14 t-a-r', [styles.bottom])}>
          {!!datosPublicacion?.sale_price && (
            <table className={styles.payment_info}>
              {couponValue && (
                <>
                  <tr>
                    <td>Total:</td>
                    <td>
                      <del>${formatNumber(datosPublicacion?.sale_price)}</del>
                    </td>
                  </tr>

                  <tr className={styles.discount}>
                    <td>Descuento:</td>
                    <td>-${formatNumber(couponValue)}</td>
                  </tr>
                </>
              )}

              <tr className={styles.sale_price}>
                <td>Total a pagar:</td>
                <td>
                  ${formatNumber(datosPublicacion?.sale_price - couponValue)}
                </td>
              </tr>
            </table>
          )}

          <div className='clear'></div>

          {/* Sin cupón
        {!couponValue && <div className={styles.sale_price}>
          <b>Total a pagar:</b>
          ${formatNumber(datosPublicacion?.sale_price)}
        </div>}
      </table>} */}

          {/* Cupón */}
          <CouponBox
            className='block m-t-10'
            callback={handleCoupon}
            publication={datosPublicacion?.id}
          />

          {couponCode && (
            <Alert className='m-t-10'>
              Tienes un cupón activo para esta compra:{' '}
              <b>{couponCode.toUpperCase()}</b>
            </Alert>
          )}
          <Alert
            className='m-t-10'
            icon={false}
            onClick={() => setShowConditions(!showConditions)}
            severity='info'
          >
            <div className='t-a-r'>Terminos y condiciones</div>
            {showConditions && (
              <small>
                El pago del producto y costos asociados como el envío se hablan
                directamente con el vendedor. Pikplay no te hace cobro adicional
                de ninguna clase. Si tienes aplicado un cúpon este se verá
                reflejado en el panel del vendedor y deberá ser aplicado en el
                momento del pago del producto o servicio.
              </small>
            )}
          </Alert>
        </section>
        <section className={styles.actions}>
          <Button
            onClick={() => {
              setIsModalHablarVendedor()
            }}
            color='normal'
          >
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
    </div>
  )
}

export default ModalCheckout
