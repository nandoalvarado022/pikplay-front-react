import styles from './../styles.module.scss'

import { faEdit } from "@fortawesome/free-regular-svg-icons"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Button from '../../button/Button'
import { Checkbox } from '@mui/material'

const AdminActions = ({
    deleteNotPaidNumbers,
    setShowMembersNames,
    setCompetitionDetail
}) => {
    return (
        <div className="AdminActions">
            <h4>Operaciones de Administrador</h4>
            <div className={styles.actions}>
                <div>
                    <Checkbox id="check_available_numbers" onClick={(e) => setShowMembersNames(e.target.checked)} />
                    Mostrar nombre de los participantes
                </div>
                <div>
                    <Button color="yellow" onClick={() => setCompetitionDetail({})}>
                        Volver al listado de concursos
                    </Button>
                    <Button color="blue" onClick={deleteNotPaidNumbers}>
                        Liberar números no pagados
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AdminActions