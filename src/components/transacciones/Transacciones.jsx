import styles from './styles.module.scss'

import React from 'react'
import Alert from '@mui/material/Alert';
import { BarChart } from '@mui/x-charts/BarChart'
import Button from '../button/Button'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'
// import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
import MyTable from './Table'
import useSystemStore from '../../hooks/useSystem'
import { getTransactionsSrv } from '../../services/transaction/transactionService'
import { LineChart } from '@mui/x-charts/LineChart';
import { axisClasses } from '@mui/x-charts'

moment.locale('es')

const Transacciones = props => {
  const { loggedUser } = useSystemStore()
  const [transactions, setTransactions] = useState([])
  // Mutation confirmar transacción
  // const TRANSACTION_CONFIRMED = gql`
  //   mutation transactionConfirmed(
  //     $id: Int
  //     $publication: Int
  //     $user_request: Int
  //   ) {
  //     transactionConfirmed(
  //       id: $id
  //       publication: $publication
  //       user_request: $user_request
  //     )
  //   }
  // `
  // const [transactionConfirmed, {}] = useMutation(TRANSACTION_CONFIRMED, {
  //   onCompleted() {
  //     getTransactions()
  //   },
  // })
  // Mutation crear notificación
  // const MUTATION_NOTIFICATION = gql`
  //   mutation createNotification($user: Int, $detail: String, $coins: Int) {
  //     createNotification(user: $user, detail: $detail, coins: $coins)
  //   }
  // `
  // const [createNotification, {}] = useMutation(MUTATION_NOTIFICATION, {
  //   onCompleted() {
  //     // context.getNotifications()
  //   },
  // })
  // Query transacciones
  // const GET_TRANSACTIONS = gql`
  //   query getTransactions($user: Int) {
  //     getTransactions(user: $user) {
  //       created
  //       detail
  //       id
  //       p_image
  //       p_title
  //       publication
  //       status
  //       slug
  //       type
  //       type
  //       u_name
  //       u_phone
  //       user
  //       user_to
  //     }
  //   }
  // `
  // const [getTransactions] = useLazyQuery(GET_TRANSACTIONS, {
  //   // Obteniendo notificaciones
  //   fetchPolicy: 'no-cache',
  //   variables: {
  //     user: loggedUser.id,
  //   },
  //   onCompleted: ({ getTransactions }) => {
  //     const _transactions =
  //       getTransactions &&
  //       getTransactions.map(t => {
  //         if (t.type == 'Compra' && t.user_to == user.id) {
  //           t.type = 'Venta'
  //         }
  //         return t
  //       })
  //     setTransactions(_transactions)
  //   },
  // })

  useEffect(() => {
    getTransactions()
  }, [])

  const handlePagarTransaccion = id => {
    window.open('https://checkout.wompi.co/l/ZCdlVO')
    // pagar({ idTransaccion: id })
  }

  // const handleConfirmarTransaccion = (id, publication) => {
  //   transactionConfirmed({
  //     variables: { id, publication, user_request: loggedUser.id },
  //   })
  // }

  const getTransactions = () => {
    getTransactionsSrv()
      .then(data => {
        setTransactions(data)
      })
  }

  const dataset = [
    {
      london: 59,
      paris: 57,
      newYork: 86,
      seoul: 21,
      month: 'Enero',
    },
    {
      london: 50,
      paris: 52,
      newYork: 78,
      seoul: 28,
      month: 'Febrero',
    },
    {
      london: 47,
      paris: 53,
      newYork: 106,
      seoul: 41,
      month: 'Marzo',
    },
  ];

  const chartSetting = {
    yAxis: [
      {
        label: 'Usuarios alcanzados',
      },
    ],
    width: 600,
    height: 400,
    // sx: {
    //   [`.${axisClasses.left} .${axisClasses.label}`]: {
    //     transform: 'translate(-20px, 0)',
    //   },
    // },
  };

  const valueFormatter = (value) => value;

  return (
    <section className={`page ${styles.Transactions}`}>
      <h2 className='Card main'>
        Tablero de Operaciones
        <FontAwesomeIcon
          class='svg-question icon'
          icon={faQuestionCircle}
          onClick={() => {
            const message = (
              <div className='m-0'>
                <p className='m-0'>
                  Bienvenido a tus <b>transacciones</b>
                </p>
                <p className='m-b-0'>Juntos somos mejor 🤝</p>
              </div>
            )
            toast(message)
          }}
        />
      </h2>

      <div className={styles.wrapper}>
        <div className='content'>
          {/* Transacciones */}
          <div className="Card">
            <Alert className={"m-b-10"} severity="warning">Recuerda siempre confirmar tus ventas haciendo uso del boton "Subir comprobante", con esto aseguras que las Pikcoins llegarán a tus clientes.</Alert>
            <MyTable loggedUser={loggedUser} transactions={transactions} />
          </div>

          {/* ADS Impulsa tus ventas */}
          {/* TODO Pendiente cambiar video */}
          <div className="Card">
            <center>
              <video width="840" height="240" autoPlay>
                <source src="/videos/video1.mp4" type="video/mp4"></source>
              </video>
            </center>
          </div>
        </div>

        {/* Graficas */}
        <div className='Card'>
          <Alert severity='info' className='m-b-10'>
            📘 Aprende a como llegar a más clientes aquí
          </Alert>
          <BarChart
            dataset={dataset}
            xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
            series={[
              { dataKey: 'london', label: 'Vistas a publicaciones', valueFormatter },
              { dataKey: 'paris', label: 'CTA en publicaciones', valueFormatter },
              { dataKey: 'newYork', label: 'Operaciones confirmadas', valueFormatter },
              { dataKey: 'seoul', label: 'Pikcoins entregados', valueFormatter },
            ]}
            {...chartSetting}
          />

          <LineChart
            xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
            dataset={dataset}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
              },
            ]}
            width={500}
            height={300}
          />
        </div>
      </div>
    </section>
  )
}

export default Transacciones
