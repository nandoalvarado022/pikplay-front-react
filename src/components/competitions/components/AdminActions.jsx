import styles from './../competitions.module.scss'

import React, { useState } from 'react'
import { faEdit } from "@fortawesome/free-regular-svg-icons"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Button from '../../button/Button'
import { Checkbox } from '@mui/material'
import BottomSheets from '../../bottomSheets/BottomSheets'

const AdminActions = ({
    deleteNotPaidNumbers,
    setShowMembersNames,
    setCompetitionDetail
}) => {
    const [isShowOptions, setIsShowOptions] = useState(false)
    return (
        <div className={`AdminActions ${styles.AdminActions}`}>
            <Button color="blue" onClick={() => setIsShowOptions(true)}>Opciones del organizador</Button>
            {isShowOptions && <BottomSheets isBottomSheets setIsBottomSheets={setIsShowOptions}>
                <div className={styles.actions}>
                    {/* <div>
                        <Checkbox id="check_available_numbers" onClick={(e) => setShowMembersNames(e.target.checked)} />
                        Mostrar nombre de los participantes
                    </div> */}
                    <Button color="yellow">Cancelar concurso</Button>
                    <Button color="blue" onClick={deleteNotPaidNumbers}>Liberar números no pagados</Button>
                </div>
            </BottomSheets>}
        </div>
    )
}

export default AdminActions