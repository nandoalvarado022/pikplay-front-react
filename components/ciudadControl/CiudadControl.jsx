import { TextField } from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"
import { useSelector, useDispatch } from "react-redux"

const CiudadControl = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const listadoCiudades = ["Bogotá", "Medellín", "Barranquilla", "Cali", "Bucaramanga", "Pasto", "Barrancabermeja", "Monteria", "Cartagena", "Santa Marta", "Manizales", "Cucuta", "Pereira", "Ibague", "Maicao", "Rioacha"]

  return <div className="contentCiudad">
    <Autocomplete value={user.city} name="str_ciudad" options={listadoCiudades} onInputChange={(event, str_ciudad) => { dispatch({ type: "CHANGE_PROPERTY", payload: { property: "user", value: { ...user, city: str_ciudad } } }) }} getOptionLabel={(option) => option} style={{ width: "100%" }}
      renderInput={(params) => <TextField {...params} label="Ciudad en la que te encuentras" />} />
  </div>
}

export default CiudadControl