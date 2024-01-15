import React from 'react'
import { motion } from 'framer-motion'
import Layout from '../../src/components/layout/Layout'
import ImageProfile from '../../src/components/imageProfile/ImageProfile'
import { ResultsBox } from '../../src/components/myHeader/searchBox/ResultsBox'
import Card from '../../src/components/card/Card'
import { getHome } from '../../src/lib/utils'
import Button from '../../src/components/button/Button'
import { Avatar, Chip } from '@mui/material'
import Reviews from './components/Reviews/Reviews'
import styles from './styles.module.scss'

const Usuario = props => {
  const { products } = props
  const url = 'https://pikajuegos.com/transacciones'
  const meta_title = 'Pikplay | Mis Transacciones'
  const descripcion = 'Pikplay | Mis Transacciones'
  const picture =
    'https://instagram.feoh8-1.fna.fbcdn.net/v/t51.2885-19/204840916_981495455995840_5281846879953245979_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.feoh8-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=mCdRvKvEUnUAX96A1bW&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfADhcemga74ytN3Zg1o5Q-Youki2IgEuvDGanKxl_5CVw&oe=64EE67ED&_nc_sid=8b3546'
  const imageProfileData = {
    height: 100,
    width: 100,
  }

  const results = [{}]

  const starUserImg =
    'https://cdn5.vectorstock.com/i/1000x1000/90/29/vip-member-premium-user-icon-on-white-vector-34649029.jpg'
  const activeUserImg =
    'https://cdn-icons-png.flaticon.com/512/7036/7036984.png'
  const locationUser = 'https://cdn-icons-png.flaticon.com/512/1865/1865269.png'

  return (
    <Layout
      meta_url={url}
      meta_descripcion={descripcion}
      meta_title={meta_title}
      title={meta_title}
    >
      <section id={styles.usuario}>
        <motion.div
          className={`Card ${styles.profile}`}
          initial={{ x: '-100%' }}
          animate={{
            x: 0,
          }}
        >
          <ImageProfile {...imageProfileData} />
          <h1>Juancho Fenix Store</h1>
          <div className={styles.chips}>
            <Chip
              avatar={<Avatar alt='Natacha' src={starUserImg} />}
              label='Usuario Destacado'
              variant='outlined'
            />
            <Chip
              avatar={<Avatar alt='Natacha' src={activeUserImg} />}
              label='Usuario Activo'
              variant='outlined'
            />
            <Chip
              avatar={<Avatar alt='Natacha' src={locationUser} />}
              label='Medellín'
              variant=''
            />
          </div>
          <p className={styles.description}>
            GameStop Medellin Tienda de videojuegos 🔴TIENDA #1 DE VIDEOJUEGOS
            EN MEDELLÍN🔴 ▶CC. Diamante local 1387 🚚Envíos a Domicilio a nivel
            nacional ▶Sistema de Crédito 💳 www.gamestopmedellin.com
            linktr.ee/gamestopmedellin2
          </p>
          {/* Buttons */}
          <div className='buttons m-b-10'>
            <Button color='blue' outline={true}>
              Contactar
            </Button>
            <Button color='red' outline={true}>
              Instagram
            </Button>
          </div>
          {/* <div className={styles.social}>
          <img src="/images/others/ing-gamestop.png" />
        </div> */}
          <Reviews />
        </motion.div>

        <div className={`${styles.products}`}>
          {products?.map((product, index) => (
            <Card // eslint-disable-this-line
              {...product}
            />
          ))}
        </div>
      </section>
    </Layout>
  )
}

Usuario.getInitialProps = async ctx => {
  const action = ctx.query?.action
  const isSSR = typeof window == 'undefined'
  const products = await getHome({ isSSR, origin: 'indexPage' })
  return {
    action,
    products,
  }
}

export default Usuario
