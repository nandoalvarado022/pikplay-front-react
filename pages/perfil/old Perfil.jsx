import React from 'react'
const { motion } = require('framer-motion')
import Button from '../../components/button/Button'
import CiudadControl from '../../components/ciudadControl/CiudadControl'
import CouponBox from '../../components/couponBox/CouponBox'
import ImageProfile from '../../components/imageProfile/ImageProfile'
import UserNotifications from '../../components/userNotifications/UserNotifications'
import VARS from '../../lib/variables'
import styles from './perfil.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Chip, Modal, Tab, Tabs, TextField, Typography } from '@material-ui/core'
import { faQuestionCircle, faUser, faBell } from '@fortawesome/free-regular-svg-icons'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { interestsList } from '../../lib/utils'
import { Alert } from '@material-ui/lab'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import CoinIcon from '../../components/CoinIcon/CoinIcon'

const { IS_MOBILE } = VARS

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
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
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Interface = ({ dispatch, userData, isSaving, handleSave, handleLogout, setUserData }) => {
  const handleFavorite = useSelector((state) => state.handleFavorite)
  const [value, setValue] = React.useState(0)
  const msgSubirCategoria = <div>
    <h2>Subir de categoria en Pikplay</h2>
    <p>
      No disponible
    </p>
  </div>
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  const [interests, setInterests] = useState(
    [...interestsList.map(item => ({ ...item, selected: false }))]
  )

  const handleInterests = (id) => {
    const _interests = [...interests]
    const state = _interests.find(item => item.id == id).selected
    _interests.find((item) => item.id == id).selected = !state
    setInterests(_interests)
  }

  return <section className={`page ${styles.perfil}`}>
    <motion.h2
      animate={{ opacity: 1 }}
      transition={{ ease: [0.17, 0.67, 0.83, 0.67] }}
      onClick={() => {
        const message = <div>
          <p>Lo que tienes saber sobre tu <b>Perfil</b></p>
          <p>
            <h4>Coins</h4>
            <p>En Pikplay te premiamos por cada cosa que haces, por eso cada vez que realices una compra recibiras un % del valor del articulo o servicio comprado.</p>
          </p>
          <p>
            <h4>Cupónes</h4>
            <p>Son códigos que te ofrecen Pikcoins de regalo de parte de tus sellers favoritos y tambien de Pikplay. Sigue atento a nuestras redes sociales que a veces lanzamos un par por ahí 😏 </p>
          </p>
          <p style={{ textAlign: 'right' }}>Juntos somos mejor 🤝</p>
        </div>
        toast(message)
      }}
      className='Card main'
    // whileHover={{ scale: 1.1 }}
    // whileTap={{ scale: 0.8 }}
    >
      Perfil
      <FontAwesomeIcon className="svg-question" icon={faQuestionCircle} />
    </motion.h2>

    <div className={styles.content}>
      <div className={`Card ${styles.imageAndLevel}`}>
        <label id={styles.category}>{userData?.category}</label>
        <ImageProfile {...{ userData }} />
        <div className={styles.coins}>
          <CoinIcon />
        </div>
        <div className="m-t-20">
          <Button color='link' onClick={() => toast(msgSubirCategoria)}>¿Como puedo subir de categoria y obtener más privilegios?</Button>
        </div>
      </div>

      <div className={classNames('Card', styles['profile-content'])}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"
            indicatorColor="primary">
            <Tab label="Información del perfil" {...a11yProps(0)} />
            <Tab label="Intereses" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <TextField fullWidth={true} label="Tú nombre o el nombre de tu tienda" margin="normal" value={userData?.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
          <TextField fullWidth={true} label="Correo electrónico" margin="normal" value={userData?.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
          <TextField disabled={true} fullWidth={true} label="Número registrado" margin="normal" value={userData?.phone} />
          <CiudadControl />
          <TextField fullWidth={true} label="Número de documento de identificacion" margin="normal" value={userData?.document_number} helperText="Información utilizada para la compras de productos online" />
          <p>
            <label>Cambiar imagen de perfil</label>
            <div>
              <input type='file' id="profileElement" label='Cambiar' placeholder="ad" text="asd" />
            </div>
          </p>
        </TabPanel>

        <TabPanel value={value} index={1}>
          {/* Intereses */}
          <Alert className="m-t-20" severity="info">
            En Pikplay utilizamos los intereses para conocer a los usuarios y ofrecerle contenido de valor
          </Alert>
          <p className={styles.interests}>
            {interests.map(item => {
              return <Chip color={item.selected ? 'secondary' : ''} key={item.id} label={item.name} onClick={() => handleInterests(item.id)} />
            })}
          </p>
        </TabPanel>

        <div className="f-r">
          <CouponBox user={userData} />
          <Button color={!isSaving ? 'blue' : 'disabled'} onClick={handleSave}>
            {isSaving ? 'Gaurdando...' : 'Guardar'}
          </Button>
        </div>
      </div>

      {!IS_MOBILE && <div className="Card notifications-content" id={styles.notificaciones}>
        <UserNotifications />
      </div>}
    </div>
  </section >
}

export default Interface
