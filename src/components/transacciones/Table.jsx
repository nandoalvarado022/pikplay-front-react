import React from 'react'
import { Button as MaterialButton } from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '../button/Button'
import moment from 'moment'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faUserFriends } from '@fortawesome/free-solid-svg-icons'
import styles from './styles.module.scss'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'

moment.locale('es')
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const handleConfirmarTransaccion = () => { }

export default function MyTable({ userLogged, transactions }) {
  const classes = useStyles()
  const rowClasses = (status) => {
    return {
      [styles.created]: status == 1,
      [styles.cancelled]: status == 5,
      [styles.paid]: status == 4
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>&nbsp;</TableCell>
            <TableCell>Publicación ó Concurso</TableCell>
            <TableCell>Vistas</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Tipo transacción</TableCell>
            <TableCell>Cliente</TableCell>
            <TableCell>Fecha creación</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions &&
            transactions.map(
              ({
                created_at,
                detail,
                pid,
                p_image,
                p_title,
                publication,
                status,
                type,
                u_name,
                u_phone,
                user,
                user_to,
                slug,
              }) => (
                <TableRow key={pid}>
                  <TableCell align='right' className={{ ...rowClasses(status) }}>
                    <span className={styles.pid}>
                      {publication?.title.substr(0, 3)}
                      {pid}
                    </span>
                  </TableCell>
                  <TableCell align='right' className={{ ...rowClasses(status) }}>
                    <small className='block'></small>
                    {publication?.title}
                    {/* <Link href={`/publicacion/${slug}`}>{p_title}</Link> */}
                  </TableCell>
                  <TableCell align='right' className={{ ...rowClasses(status) }}></TableCell>
                  <TableCell align='right' className={{ ...rowClasses(status) }}>
                    {status == 0 && (
                      <span>
                        {/* <FontAwesomeIcon
                          className='m-r-10 primary-color'
                          icon={faUserFriends}
                        /> */}
                        Proceso
                      </span>
                    )}
                    {status == 1 && (
                      <span>
                        {/* <FontAwesomeIcon
                          className='m-r-10 primary-color'
                          icon={faCheck}
                        /> */}
                        Transacción confirmada
                      </span>
                    )}
                    {status == 2 && 'Transacción cancelada'}
                  </TableCell>
                  <TableCell align='right' className={{ ...rowClasses(status) }}>
                    {user_to == loggedUser?.uid ? (
                      <span>Venta</span>
                    ) : (
                      <span>Compra</span>
                    )}
                  </TableCell>
                  <TableCell align='right' className={{ ...rowClasses(status) }}>
                    {user_to == loggedUser?.uid && (
                      <p className={styles.customer_box}>
                        Cliente:
                        <br />
                        {/* {u_name} */}
                        Camilo Rodriguez
                        <br />
                        <a
                          href={`https://api.whatsapp.com/send?phone=${u_phone}`}
                          target='_BLANK'
                          rel="noreferrer">
                          <FontAwesomeIcon
                            className='p-r t-2'
                            icon={faWhatsapp} />
                          &nbsp;
                          3187414972
                        </a>
                      </p>
                    )}
                  </TableCell>
                  <TableCell align='right' className={{ ...rowClasses(status) }}>
                    {moment(created_at).format(
                      'MMMM DD YYYY, h:mm:ss a',
                    )}
                  </TableCell>
                  <TableCell align='right' className={{ ...rowClasses(status) }}>
                    {user_to == loggedUser?.uid && (
                      <>
                        {/* <Button
                          color='blue'
                          disabled={status != 0}
                          onClick={() => handleConfirmarTransaccion(id, publication)}>
                          Confirmar transacción
                        </Button> */}
                        {/* <Button color='yellow'>Subir comprobante</Button> */}
                        {/* <MaterialButton
                          component="label"
                          role={undefined}
                          variant="contained"
                          tabIndex={-1}
                          startIcon={<CloudUploadIcon />}>
                          Upload file
                          <VisuallyHiddenInput type="file" />
                        </MaterialButton> */}
                        <Button color='red'>Denunciar cliente</Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ),
            )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
