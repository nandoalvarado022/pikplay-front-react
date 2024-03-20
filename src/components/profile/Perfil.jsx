import styles from './perfil.module.scss'

import React, { useEffect } from 'react'
const { motion } = require('framer-motion')
import Button from '../button/Button'
import CiudadControl from '../ciudadControl/CiudadControl'
import CouponBox from '../couponBox/CouponBox'
import UserNotifications from '../userNotifications/UserNotifications'
import VARS from '../../lib/variables'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CustomFetch from '../fetch/CustomFetch'
import {
  Box,
  Chip,
  Modal,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material'
import {
  faQuestionCircle,
  faUser,
  faBell,
} from '@fortawesome/free-regular-svg-icons'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { interestsList } from '../../lib/utils'
import { Alert } from '@mui/material';
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import Challenges from '../challenges/Challenges'
import CoinIcon from '../coinIcon/CoinIcon'
import ProfileSummaryExperience from '../profileSummaryExperience/ProfileSummaryExperience'

const { IS_MOBILE } = VARS

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const Interface = ({
  dispatch,
  userLogged,
  isSaving,
  handleSave,
  handleLogout,
  setUserData,
}) => {
  // const handleFavorite = useSelector(state => state.handleFavorite)
  const [value, setValue] = React.useState(0)
  // const [file, setFile] = useState()
  // const { post } = CustomFetch()
  const msgSubirCategoria = (
    <div>
      <h2>Subir de categoria en Pikplay</h2>
      <p>No disponible</p>
    </div>)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  // useEffect(() => {
  //   if (file) {
  //     // changeImageProfile()
  //   }
  // }, [file])

  // const changeImageProfile = async () => {
  //   try {
  //     const data = new FormData()
  //     data.set('file', file)
  //     const body = data
  //     const res = await post(null, '/v1/do/spaces', null, body)
  //     if (!res.ok) throw new Error(await res.text())
  //     setFile(null)
  //   } catch (e) {
  //     setFile(null)
  //     console.error(e)
  //   }
  // }

  const [interests, setInterests] = useState([
    ...interestsList.map(item => ({ ...item, selected: false })),
  ])

  const handleInterests = id => {
    const _interests = [...interests]
    const state = _interests.find(item => item.id == id).selected
    _interests.find(item => item.id == id).selected = !state
    setInterests(_interests)
  }

  return (
    <section className={`page ${styles.Perfil}`}>
      <motion.h2
        animate={{ opacity: 1 }}
        transition={{ ease: [0.17, 0.67, 0.83, 0.67] }}
        onClick={() => {
          const message = (
            <div>
              <p>
                Lo que tienes saber sobre tu <b>Perfil</b>
              </p>
              <p>
                <h4>Coins</h4>
                <p>
                  En Pikplay te premiamos por cada cosa que haces, por eso cada
                  vez que realices una compra recibiras un % del valor del
                  articulo o servicio comprado.
                </p>
              </p>
              <p>
                <h4>Cupónes</h4>
                <p>
                  Son códigos que te ofrecen Pikcoins de regalo de parte de tus
                  sellers favoritos y tambien de Pikplay. Sigue atento a
                  nuestras redes sociales que a veces lanzamos un par por ahí 😏{' '}
                </p>
              </p>
              <p style={{ textAlign: 'right' }}>Juntos somos mejor 🤝</p>
            </div>
          )
          toast(message)
        }}
        className='Card main'
      // whileHover={{ scale: 1.1 }}
      // whileTap={{ scale: 0.8 }}
      >
        Perfil
        <FontAwesomeIcon className='svg-question' icon={faQuestionCircle} />
      </motion.h2>

      <div className={styles.content}>
        <div className={classNames('Card', styles['profile-content'])}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label='basic tabs example'
              indicatorColor='primary'>
              <Tab label='Resumen' {...a11yProps(0)} />
              <Tab label='Información del perfil' {...a11yProps(0)} />
              <Tab label='Intereses' {...a11yProps(1)} />
              <Tab label='Desafios' {...a11yProps(1)} />
            </Tabs>
          </Box>

          {/*Form para  editar perfil */}
          <TabPanel value={value} index={1}>
            <div className={styles.actions}>
              <Button
                color={!isSaving ? 'blue' : 'disabled'}
                onClick={handleSave}>
                {isSaving ? 'Gaurdando...' : 'Guardar'}
              </Button>
            </div>
            <TextField
              disabled={isSaving}
              fullWidth={true}
              label='Tú nombre o el nombre de tu tienda'
              margin='normal'
              value={userLogged?.name}
              onChange={e => setUserData({ ...userLogged, name: e.target.value })}
            />
            <TextField
              disabled={isSaving}
              fullWidth={true}
              label='Correo electrónico'
              margin='normal'
              value={userLogged?.email}
              onChange={e =>
                setUserData({ ...userLogged, email: e.target.value })
              }
            />
            <TextField
              disabled={true}
              fullWidth={true}
              label='Número registrado'
              margin='normal'
              value={userLogged?.phone}
            />
            <br /><br />
            <CiudadControl
              isEditable
              setUserData={setUserData}
              userLogged={userLogged}
            />
            <TextField
              disabled={isSaving}
              fullWidth={true}
              label='Número de documento de identificación (no obligatorio)'
              margin='normal'
              value={userLogged?.document_number}
              helperText='Información utilizada para la compras de productos online'
            />
            <p>
              <div>
                <Alert severity="info">
                  <label>
                    <b>Imagen de perfil</b>
                    <br />
                  </label>
                  <input
                    disabled={isSaving}
                    id='profileElement'
                    label='Cambiar'
                    type='file'
                  />
                  <p>
                    La imagen debe ser como mínimo 500 x 500px <br />
                    Debe ser cuadrada
                  </p>
                </Alert>
              </div>
            </p>
          </TabPanel>

          {/* Intereses */}
          <TabPanel value={value} index={4}>
            <Alert className='m-t-20' severity='info'>
              En Pikplay utilizamos los intereses para conocer a los usuarios y
              ofrecerle contenido de valor
            </Alert>
            <p className={styles.interests}>
              {interests.map(item => {
                return (
                  <Chip
                    color={item.selected ? 'secondary' : ''}
                    key={item.id}
                    label={item.name}
                    onClick={() => handleInterests(item.id)}
                  />
                )
              })}
            </p>
            <Button
              color={!isSaving ? 'blue' : 'disabled'}
              onClick={handleSave}
            >
              {isSaving ? 'Gaurdando...' : 'Guardar'}
            </Button>
          </TabPanel>

          {/* Desafios */}
          <TabPanel value={value} index={3}>
            <Challenges />
          </TabPanel>

          {/* Resumen */}
          <TabPanel value={value} index={0}>
            <div className={styles.ProfileSummaryExperience__UserNotifications__Content}>
              <ProfileSummaryExperience />
              <div className='Card' style={{ maxHeight: '410px', maxWidth: '420px', margin: 0 }}>
                <Alert severity='info'></Alert>
                <UserNotifications />
              </div>
            </div>
          </TabPanel>
        </div>
      </div>
    </section>
  )
}

export default Interface
