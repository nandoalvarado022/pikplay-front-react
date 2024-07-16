import styles from './challenges-ranking.module.scss'

import React, { useEffect, useState } from 'react'
import { Box, Tab, Tabs, Typography } from '@mui/material'
import classNames from 'classnames'
import Challenges from '../../src/components/challenges/Challenges'
import { AccountBalanceWallet, ChargingStation, People, Person } from '@mui/icons-material'
import Ranking from './Ranking'
import Layout from '../../src/components/layout/Layout'

const ChallengesRanking = () => {
  const [value, setValue] = useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  function TabPanel(props) {
    const { children, value, index, ...other } = props
    return (
      <div
        role='tabpanel'
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}>
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    )
  }

  return <Layout>
    <section className={classNames('Card page', styles['ChallengesRanking'])}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
          indicatorColor='primary'>
          <Tab icon={<ChargingStation />} label='Desafios' />
          <Tab icon={<People />} label='Ranking' />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <Challenges />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Ranking />
      </TabPanel>
    </section>
  </Layout>
}

export default ChallengesRanking