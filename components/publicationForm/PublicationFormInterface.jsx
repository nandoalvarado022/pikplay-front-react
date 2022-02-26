import Link from "next/link"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons"
import { faImage, faTrash } from "@fortawesome/free-solid-svg-icons"
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import Card from '../card/Card'
import { TextField } from "@material-ui/core"
import { useContext, useState } from 'react'
import Fade from '@material-ui/core/Fade'
import styles from "./publicationForm.module.scss"
import Button from '../button/Button'
import { getCategories } from "../../lib/utils"
import Notification from '../notification'
import { Alert } from '@material-ui/lab'
import { useSelector, useDispatch } from "react-redux"

const PublicationForminterface = ({ currentStep, errors, handleRemoveImage, handleSubmit, imageLoading, isEdit, nextStep, onChangeImage, previusStep, publicationFormData, screenWidth, setPublicationFormData, textButton, setCurrentStep }) => {
  const dispatch = useDispatch()
  const [showDescription, setShowDescription] = useState(false)
  const [message, setMessage] = useState(null)
  const [menuPosition, setMenuPosition] = useState(null)
  const handleRightClick = (event) => {
    if (menuPosition) return
    event.preventDefault();
    setMenuPosition({ top: event.pageY, left: event.pageX });
  }

  const { accept_changues, description, is_new, quantity, sale_price, title, warranty } = publicationFormData

  if (!!publicationFormData?.title || !isEdit) {
    return <section className={styles.content}>
      {/* <Notification isOpen={showDescription} setIsOpen={setShowDescription} message={message} /> */}
      <h2>
        <Link href="/publicaciones">
          <a>Listado de publicaciones / </a>
        </Link>
        Crear publicación
        <FontAwesomeIcon class="svg-question" icon={faQuestionCircle} onClick={() => {
          const message = {
            id: 0, message: <div>
              <p>Creación de publicaciones</p>
              <p style={{ textAlign: "right" }}>Juntos somos mejor 🤝</p>
            </div>
          }
          dispatch({ type: "SET_MESSAGE", payload: { message } })
        }} />
      </h2>

      <Alert className={styles.alert} severity="success" style={{ marginBottom: "10px" }}>
        Crea tu anuncio 100% gratis y sin comisiónes
      </Alert>

      {errors && <Alert className="m-b-20" severity="error">{errors}</Alert>}

      <div className={styles.steps_and_actions}>
        <div className={styles.steps}>
          <div onClick={() => setCurrentStep(1)} className={currentStep == 1 && styles.active}>
            1. Informacion general
          </div>
          <div onClick={() => setCurrentStep(2)} className={currentStep == 2 && styles.active}>
            2. Precio e inventario
          </div>
          <div onClick={() => setCurrentStep(3)} className={currentStep == 3 && styles.active}>
            3. Fotos del producto
          </div>
          <div onClick={() => setCurrentStep(4)} className={currentStep == 4 && styles.active}>
            4. Así se verá tu publicación
          </div>
        </div>

        <div className="actions" style={{ textAlign: "right" }}>
          {
            currentStep != 1 && <Button className="previousStep" animation={false} onClick={previusStep} color="yellow">
              Anterior
            </Button>
          }
          <Button className="nextStep" animation={currentStep != 3} onClick={nextStep} color="blue">{textButton}</Button>
        </div>
      </div>

      <div className={styles.formAndPreviewPublicacion}>
        <div className={styles.fields}>
          {
            currentStep == 1 && <>
              <div className={`Card ${styles.card}`}>
                <TextField fullWidth={true} label="Título" margin="normal" fullWidth value={title} onChange={e => setPublicationFormData({ ...publicationFormData, title: e.target.value })} />
                <TextField rows={10} fullWidth={true} label="Descripción" value={description} multiline margin="normal" fullWidth onChange={e => setPublicationFormData({ ...publicationFormData, description: e.target.value })} />
              </div>
            </>
          }

          {
            currentStep == 2 && <>
              <div className="Card">
                <div className={styles.button_category}>
                  <Button color="yellow" aria-controls="tipo_publicacion" onClick={handleRightClick} aria-haspopup="true">{!publicationFormData.category ? "Seleccionar la categoria" : getCategories(publicationFormData.category).name}</Button>
                </div>
                <div>
                  <TextField fullWidth={true} label="Precio" placeholder="" margin="normal" value={sale_price} type='number' onChange={e => setPublicationFormData({ ...publicationFormData, sale_price: Number(e.target.value) })} />
                </div>
                <div>
                  <TextField fullWidth={true} label="Cantidad disponible" placeholder="" margin="normal" type='number' value={quantity} onChange={e => setPublicationFormData({ ...publicationFormData, quantity: e.target.value })} />
                </div>
              </div>

              <div className="Card">
                <div onContextMenu={handleRightClick} title="Categoria del articulo">
                  <Menu anchorReference="anchorPosition" anchorPosition={menuPosition} onClose={() => setMenuPosition(null)} TransitionComponent={Fade} keepMounted open={!!menuPosition} className={styles.tipoPublicacion}>
                    {getCategories().map(item => <MenuItem onClick={() => { setPublicationFormData({ ...publicationFormData, category: item.id }); setMenuPosition(null) }} value={item.id}>{item.name}</MenuItem>)}
                  </Menu>
                </div>
                <p>
                  <FormControlLabel control={<Switch checked={Boolean(is_new)} onChange={(e) => setPublicationFormData({ ...publicationFormData, is_new: e.target.checked })} inputProps={{ 'aria-label': 'primary checkbox' }} />} label="¿Articulo nuevo?" />
                </p>
                <p>
                  <FormControlLabel control={<Switch checked={Boolean(accept_changues)} onChange={(e) => setPublicationFormData({ ...publicationFormData, accept_changues: e.target.checked })} inputProps={{ 'aria-label': 'primary checkbox' }} />} label="¿Aceptas cambios o aceptar otro producto como parte de pago?" />
                </p>
                <p>
                  <FormControlLabel control={<Switch checked={Boolean(warranty)} onChange={(e) => setPublicationFormData({ ...publicationFormData, warranty: e.target.checked })} />} label="¿Ofreces garantia?" />
                </p>
              </div>
            </>
          }

          {
            currentStep == 3 && <>
              {
                imageLoading && <div class="t-a-c">
                  <div className="f-s-14">
                    Subiendo la imagen, por favor espere (<span id="progressUploadImage"></span>)
                  </div>
                </div>
              }

              <div className={`Card ${styles.images_list}`}>
                {
                  ["image_1", "image_2", "image_3", "image_4"].map(item => {
                    const value = publicationFormData[item]
                    return <>
                      {
                        !value && <label class={(imageLoading ? styles.disabled : '') + ' ' + styles.fileWrapper}>
                          <input disabled={imageLoading} accept=".png,.jpg,.jpeg,.gif" type='file' id={item} onChange={() => onChangeImage(item)} />
                          <FontAwesomeIcon icon={faImage} />
                          <p>Subir imágen</p>
                        </label>
                      }
                      {
                        value && <label class={styles.fileWrapper}>
                          <span className={styles.remove} onClick={() => handleRemoveImage(item)}>
                            <FontAwesomeIcon icon={faTrash} />
                          </span>
                          <img alt="Imagen de publicacion" style={{ maxWidth: "100px", display: "block" }} className="imageRodada" src={publicationFormData[item]} />
                        </label>
                      }
                    </>
                  })
                }
              </div>
            </>
          }
        </div>
        {
          currentStep == 4 &&
          <div className={styles.preview_card}>
            <Card {...publicationFormData} slug={null} />
          </div>
        }
      </div>
    </section>
  }
  else return <div></div>
}

export default PublicationForminterface