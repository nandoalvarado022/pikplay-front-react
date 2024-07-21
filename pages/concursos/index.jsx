import styles from '../../src/components/competitions/competitions.module.scss'

import React, { useEffect, useState } from 'react'
import { Box, Card, Tab, Tabs, Typography } from '@mui/material'
import Layout from '../../src/components/layout/Layout'
import CompetitionsList from '../../src/components/competitions/components/CompetitionsList'
import useCompetitions from '../../src/components/competitions/hooks/useCompetitions'
import CompetitionDetail from '../../src/components/competitions/components/CompetitionDetail'
import { isEmpty } from '../../src/lib/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ArrowBack } from '@mui/icons-material'
import { ArrowBackIos } from '@mui/icons-material'
import { ArrowBackIosNew } from '@mui/icons-material'
import { ArrowBackIosNewOutlined } from '@mui/icons-material'
import Link from 'next/link'
import useSystemStore from '../../src/hooks/useSystem'

const ConcursosPage = () => {
  const {
    competitions,
    competitionDetail,
    competitionMembers,
    getCompetitions,
    handleCompetitionClick,
    selectedNumber,
    setSelectedNumber,
    setCompetitionDetail,
    setCompetitionMembers,
  } = useCompetitions()

  const { userLogged: { picture: userPicture, uid: uidLogged } } = useSystemStore()

  const [value, setValue] = useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    getCompetitions(null)
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
        <section className="page">
          <div className="contentTitle">
            <Link href='/'>
              <ArrowBackIosNew className='icon backIcon' />
            </Link>
            <h2 className="main">Concursos</h2>
          </div>
          {/* competitionDetail: {JSON.stringify(competitionDetail)} */}
          <Card>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label='basic tabs example'
              indicatorColor='primary'>
              <Tab label={competitionDetail ? 'Organiza: BluePanther' : 'Listado de Concursos'} />
              <Tab label='¿Como funcionan los concursos?' />
            </Tabs>

            <TabPanel value={value} index={0}>
              {isEmpty(competitionDetail) &&
                <CompetitionsList
                  competitions={competitions}
                  handleCompetitionClick={handleCompetitionClick}
                  selectedNumber={selectedNumber}
                  setSelectedNumber={setSelectedNumber}
                />}
              {!isEmpty(competitionDetail) &&
                <CompetitionDetail
                  {...{
                    competitions,
                    competitionDetail,
                    setCompetitionDetail,
                    competitionMembers,
                    setCompetitionMembers,
                    setSelectedNumber,
                    selectedNumber,
                    userPicture,
                    uidLogged,
                  }}
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
