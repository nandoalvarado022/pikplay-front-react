import React, { useState } from 'react'
import { TextField } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import { getCiudades } from '../../lib/utils'

const CiudadControl = ({ setUserData, userLogged }) => {
  const listadoCiudades = getCiudades()
  const [newValue, setNewValue] = useState(null)
  const defaultValue = userLogged.city
    ? newValue
      ? newValue
      : listadoCiudades.find(item => item.id === userLogged.city)
    : listadoCiudades[0]

  const onInputChange = (value) => {
    // value.id es la nueva ciudad
    // TODO Pendiente guardar ciudad
    setNewValue(value)
    setUserData({ ...userLogged, city: value.id })
  }

  return (
    <div className='contentCiudad'>
      <Autocomplete
        disabled
        options={listadoCiudades}
        defaultValue={defaultValue}
        onChange={(e, value) => onInputChange(value)}
        getOptionLabel={option => option.label && option.label}
        style={{ width: '100%' }}
        renderInput={params => (
          <TextField {...params} label='Ciudad en la que te encuentras' />
        )}
      />
    </div>
  )
}

export default CiudadControl
