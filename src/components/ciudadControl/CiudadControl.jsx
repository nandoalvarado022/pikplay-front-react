import React from 'react'
import { TextField } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import { getCiudades } from '../../lib/utils'
import useSystemStore from '../../hooks/useSystem'

const CiudadControl = () => {
  const { userLogged } = useSystemStore(state => state)
  const listadoCiudades = getCiudades()
  const defaultValue = userLogged.city
    ? listadoCiudades.find(item => item.id === userLogged.city)
    : listadoCiudades[0]
  const onInputChange = (event, value) => {
    // value.id es la nueva ciudad
    // TODO Pendiente guardar ciudad
  }

  return (
    <div className='contentCiudad'>
      <Autocomplete
        options={listadoCiudades}
        defaultValue={defaultValue}
        onChange={onInputChange}
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
