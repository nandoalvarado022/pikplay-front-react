import styles from '../../src/components/competitions/styles.module.scss'

import React, { useEffect, useState } from 'react'
import { Box, Card, Tab, Tabs, Typography } from '@mui/material'
import Layout from '../../src/components/layout/Layout'
import CompetitionsList from '../../src/components/competitions/components/CompetitionsList'
import useCompetitions from '../../src/components/competitions/hooks/useCompetitions'
import CompetitionDetail from '../../src/components/competitions/components/CompetitionDetail'

const ConcursosPage = () => {
  const { competitions, getCompetitions, selectedNumber, setSelectedNumber } = useCompetitions()
  const [competitionId, setCompetitionId] = useState(null);
  const [value, setValue] = useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    getCompetitions()
  }, [])

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

  return (
    <div className={styles.CompetitionsComponent}>
      <Layout title="Concursos">
        <section className={styles.page}>
          <h2 className='Card main'>Concursos</h2>
          <Card>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label='basic tabs example'
              indicatorColor='primary'>
              <Tab label={competitionId ? 'Organiza: BluePanther' : 'Listado de Concursos'} />
              <Tab label='¿Como funcionan los concursos?' />
            </Tabs>

            <TabPanel value={value} index={0}>
              {!competitionId &&
                <CompetitionsList
                  selectedNumber={selectedNumber}
                  competitions={competitions}
                  competitionId={competitionId}
                  setCompetitionId={setCompetitionId}
                  setSelectedNumber={setSelectedNumber}
                />}
              {!!competitionId &&
                <CompetitionDetail
                  selectedNumber={selectedNumber}
                  competitions={competitions}
                  competitionId={competitionId}
                  setCompetitionId={setCompetitionId}
                  setSelectedNumber={setSelectedNumber}
                />}
            </TabPanel>
            <TabPanel value={value} index={1}>
            </TabPanel>
          </Card>
        </section>
      </Layout>
    </div>
  )
}

export default ConcursosPage
