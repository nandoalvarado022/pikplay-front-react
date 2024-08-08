import styles from './../competitions.module.scss'

import React, { useState } from 'react'
import { faEdit } from "@fortawesome/free-regular-svg-icons"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Button from '../../button/Button'
import { Checkbox } from '@mui/material'
import BottomSheets from '../../bottomSheets/BottomSheets'
import { PieChart } from '@mui/x-charts'
import { pieArcLabelClasses } from '@mui/x-charts/PieChart'

const Grafica = ({
  freeNumbers,
  paidNumbers,
  takenNumbers,
}) => {
  return <PieChart
    legend={{ hidden: true }}
    series={[
      {
        arcLabel: (item) => `${item.label} ${item.value}`,
        data: [
          { id: 0, value: takenNumbers, label: 'Tomados' },
          { id: 1, value: paidNumbers, label: 'Pagados' },
          { id: 2, value: freeNumbers, label: 'Libres' },
        ],
      },
    ]}
    sx={{
      [`& .${pieArcLabelClasses.root}`]: {
        fill: 'white',
        fontSize: '12px',
        // fontWeight: 'bold',
      },
    }}
    height={200}
    width={260}
  />
}

const AdminActions = ({
  freeNumbers,
  paidNumbers,
  takenNumbers,
  deleteNotPaidNumbers,
  setShowMembersNames,
}) => {
  const [isShowOptions, setIsShowOptions] = useState(false)
  return (
    <div className={`AdminActions ${styles.AdminActions}`}>
      <Button color="blue" onClick={() => setIsShowOptions(true)}>Opciones de<br /> organizador</Button>
      <Grafica {...{
        freeNumbers,
        paidNumbers,
        takenNumbers,
      }} />
      {isShowOptions && <BottomSheets isBottomSheets setIsBottomSheets={setIsShowOptions}>
        <div className={styles.actions}>
          {/* <div>
              <Checkbox id="check_available_numbers" onClick={(e) => setShowMembersNames(e.target.checked)} />
              Mostrar nombre de los participantes
          </div> */}
          <Button color="yellow">Cancelar concurso</Button>
          <Button color="blue" onClick={deleteNotPaidNumbers}>Liberar números<br />no pagados</Button>
        </div>
      </BottomSheets>}
    </div>
  )
}

export default AdminActions