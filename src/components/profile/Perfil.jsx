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
import Joyride from 'react-joyride'
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
import IACharacter from '../ia/IACharacter'
import { ChargingStation, EditNote, NotificationAdd, NotificationImportant, Notifications, NotificationsActive, Person, PhonelinkLockOutlined, PowerOffOutlined } from '@mui/icons-material'
import { Gamepad } from '@mui/icons-material'
import EditProfileSummary from '../profileSummaryExperience/EditProfileSummary'
import { faPaintBrush } from '@fortawesome/free-solid-svg-icons'
import useSystemStore from '../../hooks/storeSystem'
import NotificationsNewIcon from '../notificationsNewIcon/NotificationsNewIcon'

function TabPanel(props) {
  const { children, value, index, ...other } = props
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
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
  const [tabValue, setTabValue] = useState(0)
  const [isEditProfile, setIsEditProfile] = useState(false)
  const { newNotifications, perfilPage: { messageIA }, setStoreValue } = useSystemStore(state => state)
  const steps = [
    {
      target: '.starsFallingDown',
      content: 'Este es tu nickname, puedes cambiarlo en cualquier momento',
    },
    // {
    //   target: '.my-other-step',
    //   content: 'This another awesome feature!',
    // },
  ]
  // const [file, setFile] = useState()
  // const { post } = CustomFetch()
  const msgSubirCategoria = (
    <div>
      <h2>Subir de categoria en Pikplay</h2>
      <p>No disponible</p>
    </div>)

  const handleChange = (event, newValue) => {
    if (newValue == 0) setStoreValue("perfilPage", { messageIA: <div>Dale un look diferente a tu perfil y muestrale a todos tus logros</div> })
    if (newValue == 1) setStoreValue("perfilPage", { messageIA: <div>No tienes notificaciones nuevas<br /><br /></div> })
    if (newValue == 2) setStoreValue("perfilPage", { messageIA: null })
    setTabValue(newValue)
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

  const NotificationIcon = () => {
    if (newNotifications) return <NotificationsNewIcon style={{ marginBottom: '6px' }} />
    else return <NotificationsActive />
  }

  return (
    <section className={`page ${styles.Perfil}`}>
      <Joyride steps={steps} />
      <div className={styles.content}>
        <div className={classNames('Card', styles['profile-content'])}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tabValue}
              onChange={handleChange}
              aria-label='basic tabs example'
              indicatorColor='primary'>
              <Tab icon={<Person />} label='Perfil' />
              <Tab icon={<NotificationIcon />} label='Notificaciones' />
              <Tab icon={<EditNote />} label='Editar' />
            </Tabs>
          </Box>

          {messageIA && <div className={styles.IAContentLeft}>
            <IACharacter
              className='Perfil'
              IAExpression='happy' />
            <div className='Card'>
              {messageIA}
              {tabValue == 0 && <a onClick={() => setIsEditProfile(true)}>
                <FontAwesomeIcon className='icon' icon={faPaintBrush} style={{ margin: "5px 5px 0 0" }} />
                Personalizar perfil
              </a>}
            </div>
          </div>}

          <TabPanel value={tabValue} index={1}>
            <UserNotifications />
          </TabPanel>

          {/*Form para editar perfil */}
          <TabPanel value={tabValue} index={2}>
            <div className={styles.actions}>
              <Button
                // className={styles.saveProfileButton}
                color={!isSaving ? 'blue' : 'disabled'}
                onClick={handleSave}>
                {isSaving ? 'Gaurdando...' : 'Guardar cambios'}
              </Button>
            </div>
            <TextField
              disabled={isSaving}
              fullWidth={true}
              label='Tú nombre o el nombre de tu tienda'
              margin='normal'
              value={userLogged?.name}
              onChange={e => setUserData({ ...userLogged, name: e.target.value })} />
            <TextField
              disabled={isSaving}
              fullWidth={true}
              label='Correo electrónico'
              margin='normal'
              value={userLogged?.email}
              onChange={e =>
                setUserData({ ...userLogged, email: e.target.value })
              } />
            <TextField
              disabled={true}
              fullWidth={true}
              label='Número registrado'
              margin='normal'
              value={userLogged?.phone} />
            <br /><br />
            <CiudadControl
              isEditable
              setUserData={setUserData}
              userLogged={userLogged} />
            <TextField
              disabled={isSaving}
              fullWidth={true}
              label='Número de documento de identificación (no obligatorio)'
              margin='normal'
              value={userLogged?.document_number}
              helperText='Información utilizada para la compras de productos online' />
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
          {/* <TabPanel value={value} index={4}>
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
          </TabPanel> */}

          {/* Resumen */}
          <TabPanel value={tabValue} index={0} className="">
            <div className={styles.ProfileSummaryExperience__UserNotifications__Content}>
              <ProfileSummaryExperience
                isEditProfile={isEditProfile}
                setIsEditProfile={setIsEditProfile}
                showDetails
              />
            </div>
          </TabPanel>
        </div>
      </div>
    </section>
  )
}

export default Interface
