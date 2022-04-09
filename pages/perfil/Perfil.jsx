import Button from "../../components/button/Button"
import CiudadControl from "../../components/ciudadControl/CiudadControl"
import Coins from "../../components/previewUser/Coins"
import ImageProfile from "./ImageProfile"
import React from 'react'
import UserNotifications from "../../components/userNotifications/UserNotifications"
import VARS from "../../lib/variables"
import styles from "./perfil.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { TextField } from "@material-ui/core"
import { faQuestionCircle, faUser, faBell } from "@fortawesome/free-regular-svg-icons"
import { toast } from 'react-toastify'
import { useState } from "react"

const { IS_MOBILE } = VARS

const Interface = ({ dispatch, userData, isSaving, handleSave, handleLogout, setUserData }) => {
    const [tab, setTab] = useState("profile-content")

    const goTo = (value) => {
    }

    return <section className={`page ${styles.perfil}`}>
        {
            IS_MOBILE && <div className={styles.tabs}>
                <ol className={tab == "profile-content" ? styles.active : ""}>
                    <FontAwesomeIcon icon={faUser} onClick={() => goTo("profile-content")} />
                </ol>
                <ol className={tab == "notifications-content" ? styles.active : ""}>
                    <FontAwesomeIcon icon={faBell} onClick={() => goTo("notifications-content")} />
                </ol>
            </div>
        }

        <h2 className='Card'>
            Perfil
            <FontAwesomeIcon className="svg-question" icon={faQuestionCircle} onClick={() => {
                const message = <div>
                    <p>Lo que tienes saber sobre tu <b>Perfil</b></p>
                    <p>
                        <h4>Coins</h4>
                        <p>En Pikplay te premiamos por cada cosa que haces, por eso cada vez que realices una compra recibiras un % del valor del articulo o servicio comprado.</p>
                    </p>
                    <p style={{ textAlign: "right" }}>Juntos somos mejor 🤝</p>
                </div>
                toast(message)
            }} />
        </h2>

        <div className={styles.content}>
            <div className={`Card ${styles.imageAndLevel}`}>
                <label>{userData?.category}</label>
                <ImageProfile {...{ userData }} />
                <div className={styles.coins}>
                    <Coins />
                </div>
            </div>

            <div className="Card profile-content">
                <TextField fullWidth={true} label="Tú nombre o el nombre de tu tienda" margin="normal" value={userData?.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
                <TextField fullWidth={true} label="Correo electrónico" margin="normal" value={userData?.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                <TextField disabled={true} fullWidth={true} label="Número registrado" margin="normal" value={userData?.phone} />
                <CiudadControl />
                <p>
                    <label>Cambiar imagen de perfil</label>
                    <div>
                        <input type='file' id="profileElement" />
                    </div>
                </p>
                <div className="f-r">
                    <Button color={!isSaving ? "blue" : "disabled"} onClick={handleSave}>
                        {isSaving ? "Gaurdando..." : "Guardar"}
                    </Button>
                    {/* <Button color="red" onClick={handleLogout}>Salir</Button> */}
                </div>
            </div>

            <div className="Card notifications-content" id={styles.notificaciones}>
                <UserNotifications />
            </div>
        </div>
    </section >
}

export default Interface