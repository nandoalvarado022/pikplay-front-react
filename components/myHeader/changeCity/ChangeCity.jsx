import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import { useState } from 'react'
import { Button as ButtonMat, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import { capitalize, getCiudades } from '../../../lib/utils'
import { useSelector } from 'react-redux'
import { faMapMarkedAlt, faMapMarker, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './styles.module.scss'

const ChangeCity = (props) => {
    const { setInputText } = props
    const user = useSelector((state) => state.user)
    const [defaultCity, setDefaultCity] = useState(user.city ? user.city : 'bogota')
    const [open, setOpen] = useState(false)
    const handleClose = () => { setOpen(false) }
    const cityLabel = getCiudades().find((city) => city.id === defaultCity).label
    const handleChange = (event, value) => {
        const city = event.target.value
        setDefaultCity(city)
        setTimeout(() => {
            handleClose()
            // let value = document.getElementById('inpSearchButton').value + ' '
            // setInputText('')
        }, 500)
    }

    return <div className={styles.ChangeCity}>
        <center className='m-l-10' style={{ fontSize: '12px' }} onClick={() => setOpen(true)}>
            <FontAwesomeIcon className='primary-color' icon={faMapMarkerAlt} />
            &nbsp;{cityLabel}
        </center>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {/* Content */}
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Cambiar ubicación</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={defaultCity}
                            onChange={handleChange}>
                            {getCiudades().map((item => {
                                return <MenuItem value={item.id}>{capitalize(item.pais)} - {item.label}</MenuItem>
                            }))}
                        </Select>
                    </FormControl>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <ButtonMat onClick={handleClose} color="primary">
                    Cancelar
                </ButtonMat>
            </DialogActions>
        </Dialog>
    </div>
}

export default ChangeCity
