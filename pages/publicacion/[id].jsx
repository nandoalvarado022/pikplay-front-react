import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import toastr from 'toastr'
import Layout from '../../src/components/layout/Layout'
import { getFeed } from '../../src/lib/utils'
import ModalCheckout from './components/modalCheckout/ModalCheckout'
import { connect } from 'react-redux'
import ProductDetail from './components/productDetail/ProductDetail'
// import ModalNotification from './components/modalNotification/ModalNotification'

const PublicacionPage = (props) => {
  const { datosPublicacion } = props
  const [modalHablarVendedor, setModalHablarVendedor] = useState(false)
  const [cuponDigitado, setCuponDigitado] = useState('')
  const [precio, setPrecio] = useState(0)
  const [nuevoPrecio, setNuevoPrecio] = useState(datosPublicacion.price)
  const [logIngresarCupon, setLogIngresarCupon] = useState(false)

  const handleCupon = () => {
    setLogIngresarCupon(true)
  }

  // const handleValidarCupon = async () => {
  //   const id_publicacion = datosPublicacion.id
  //   const res = await instanciaFunc.validarCupon({
  //     id_publicacion,
  //     cuponDigitado,
  //   })

  //   if (!res.estado) {
  //     toastr.warning('No se pudo validar el cupón 😕')
  //     setLogIngresarCupon(false)
  //     setCuponDigitado('')
  //   } else {
  //     const valorCupon = res.valor
  //     toastr.info('Para tí el precio más bajo 😋')
  //     const nuevoPrecio = datosPublicacion.precio - valorCupon
  //     setNuevoPrecio(nuevoPrecio)
  //     setLogIngresarCupon(false)
  //     setPrecio(nuevoPrecio)
  //   }
  // }

  const handleHablarVendedor = () => {
    // context = this.context
    props.user.id !== 0
      ? setModalHablarVendedor(true)
      : document.querySelector('#btnStart').click()
  }

  const mostrarAlerta = mensaje => {
    toastr.warning(mensaje)
    return false
  }

  // const handleResponder = async () => {
  //   const data = {
  //     comentario: {
  //       descripcion: document.getElementById('comentarPublicacion').value,
  //       id_usuario: JSON.parse(localStorage.getItem('user')).email,
  //     },
  //     id_publicacion: datosPublicacion.id,
  //   }
  //   const res = await instanciaFunc.saveRespuesta(data)
  //   return
  // }

  const configUbicacion = () => {
    localStorage.setItem('url_pendiente', window.location.pathname)
    Router.push('/ubicacion')
  }

  const componentDidMount = () => {
    if (!datosPublicacion) Router.push('/404')
  }

  if (!datosPublicacion) return <div>Redireccionando...</div>
  const { description, title, slug } = datosPublicacion

  return (
    <Layout
      image={datosPublicacion.image_1}
      title={title}
      descripcion={description}
      url={slug}
    >
      <div className='_publicacion'>
        <ProductDetail
          {...{ handleHablarVendedor: handleHablarVendedor }}
          meta_url={slug}
          // handleResponder={handleResponder}
          nuevoPrecio={nuevoPrecio}
          handleCupon={handleCupon}
          doc_id={datosPublicacion}
          logDetalle={true}
          datosPublicacion={datosPublicacion}
        />
        {
          // Modal para confirmar datos
          modalHablarVendedor && (
            <ModalCheckout
              {...{
                datosPublicacion,
                setIsModalHablarVendedor: () =>
                  setModalHablarVendedor(!modalHablarVendedor),
              }}
            />
          )
        }
        {/* <ModalNotification isOpen={showModalNotification} /> */}
        {
          // Modal para ingresar cupón
          // this.state.logIngresarCupon && (
          //   <div className="_modalIngresoInfo">
          //     <div className="background"></div>
          //     <div className="Card">
          //       <TextField
          //         value={this.state.cuponDigitado}
          //         name="cuponDigitado"
          //         fullWidth={true}
          //         onChange={() => setCuponDigitado(e.target.value)}
          //         label="Cupón"
          //         margin="normal"
          //         size={25}
          //       />
          //       <div className="actions">
          //         <Button onClick={() => this.setState({ logIngresarCupon: false })} className="yellow small m-l-10" text="Cancelar" />
          //         <Button onClick={this.handleValidarCupon} className="green small m-l-10" text="Validar cupón" />
          //       </div>
          //     </div>
          //   </div>
          // )
        }
      </div>
    </Layout>
  )
}

PublicacionPage.getInitialProps = async ({ req, query }) => {
  let slug = query.id
  let datosPublicacion = await getFeed({ slug })
  return { datosPublicacion: datosPublicacion[0] }
}

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps)(PublicacionPage)
