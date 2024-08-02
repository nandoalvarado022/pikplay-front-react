import styles from '../../../src/components/competitions/competitions.module.scss'

import React, { useEffect, useState } from 'react'
import { Box, Card, Tab, Tabs, Typography } from '@mui/material'
import Layout from '../../../src/components/layout/Layout'
import CompetitionsList from '../../../src/components/competitions/components/CompetitionsList'
import useCompetitions from '../../../src/components/competitions/hooks/useCompetitions'
import CompetitionDetail from '../../../src/components/competitions/components/CompetitionDetail'
import { isEmpty } from '../../../src/lib/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ArrowBack } from '@mui/icons-material'
import { ArrowBackIos } from '@mui/icons-material'
import { ArrowBackIosNew } from '@mui/icons-material'
import { ArrowBackIosNewOutlined } from '@mui/icons-material'
import Link from 'next/link'
import useSystemStore from '../../../src/hooks/storeSystem'
import { competitionsStore } from '../../../src/components/competitions/hooks/competitionsStore'
import { getPublicationsSrv } from '../../../src/services/publication/publicationService'
import { getComptSrv } from '../../../src/services/competition/competitionService'

const ConcursoDetailPage = (props) => {
  const {
    competitionDetail
  } = props

  const {
    competitions,
    competitionMembers,
    getCompetitions,
    handleCompetitionClick,
    selectedNumber,
    setSelectedNumber,
    setCompetitionMembers,
  } = useCompetitions()

  const { setCompetitionDetail } = competitionsStore()
  const { userLogged: { picture: userPicture, uid: uidLogged } } = useSystemStore()

  const [value, setValue] = useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    setCompetitionDetail(competitionDetail)
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

  return <div className={styles.CompetitionsComponent}>
    <Layout title="Concursos">
      <section className="page">
        <div className="contentTitle">
          <Link href='/concursos'>
            <ArrowBackIosNew className='icon backIcon' />
          </Link>
          <h1 className="main">{competitionDetail.title}</h1>
        </div>
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
            <CompetitionDetail
              {...{
                competitions,
                competitionDetail,
                competitionMembers,
                setCompetitionMembers,
                setSelectedNumber,
                selectedNumber,
                userPicture,
                uidLogged,
              }}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
          </TabPanel>
        </Card>
      </section>
    </Layout>
  </div>
}

ConcursoDetailPage.getInitialProps = async (ctx) => {
  const { query: { id: slug } } = ctx
  let res = await getComptSrv(ctx, slug)
  return { competitionDetail: res }
}

export default ConcursoDetailPage
