'use client'

import React from 'react'
import Alert from '@mui/material/Alert';
import { BarChart } from '@mui/x-charts/BarChart'
import Button from '../../../button/Button'
import { LineChart } from '@mui/x-charts/LineChart';
import { axisClasses } from '@mui/x-charts'

const Grafica = () => {
  const valueFormatter = (value) => value;
  const dataset = [
    {
      london: 59,
      paris: 57,
      newYork: 86,
      seoul: 21,
      month: 'Enero',
    },
    {
      london: 50,
      paris: 52,
      newYork: 78,
      seoul: 28,
      month: 'Febrero',
    },
    {
      london: 47,
      paris: 53,
      newYork: 106,
      seoul: 41,
      month: 'Marzo',
    },
  ];

  const chartSetting = {
    yAxis: [
      {
        label: 'Usuarios alcanzados',
      },
    ],
    width: 600,
    height: 400,
    // sx: {
    //   [`.${axisClasses.left} .${axisClasses.label}`]: {
    //     transform: 'translate(-20px, 0)',
    //   },
    // },
  };

  return <div className='Card'>
    <Alert severity='info' className='m-b-10'>
      📘 Aprende a como llegar a más clientes aquí
    </Alert>
    <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[
        { dataKey: 'london', label: 'Vistas a publicaciones', valueFormatter },
        { dataKey: 'paris', label: 'CTA en publicaciones', valueFormatter },
        { dataKey: 'newYork', label: 'Operaciones confirmadas', valueFormatter },
        { dataKey: 'seoul', label: 'Pikcoins entregados', valueFormatter },
      ]}
      {...chartSetting}
    />

    <LineChart
      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      dataset={dataset}
      series={[
        {
          data: [2, 5.5, 2, 8.5, 1.5, 5],
        },
      ]}
      width={500}
      height={300}
    />
  </div>
}

export default Grafica
