import React from 'react'
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons"
import { faRocket } from "@fortawesome/free-solid-svg-icons"
import { useQuery, gql, useMutation, useLazyQuery } from '@apollo/client'
import Router from 'next/router'
import styles from './publicaciones.module.scss'
import Button from '../../components/button/Button'
import { useEffect, useState } from 'react'
import { format_number } from '../../lib/utils'
import moment from "moment"
import Notification from "../../components/notification"
import { Box, Tab, Tabs, Typography } from "@material-ui/core"
import { Doughnut } from 'react-chartjs-2'
import { useSelector, useDispatch } from 'react-redux'
import ChangeSeller from './ChangeSeller'

moment.locale('es')

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const CakeReport = ({ publications = [] }) => {
    const data = {
        labels: !publications ? [] : publications.map(item => item.title),
        datasets: [
            {
                label: '# of Votes',
                data: !publications ? [] : publications.map(item => item.views),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    return <div className={`${styles.report} m-20`}>
        <h2>Informe de tus publicaciones</h2>
        <div className="Card main">
            <div className={styles.graphic}>
                <Doughnut data={data} />
            </div>
            <table cellSpacing="0">
                <tr>
                    <td>Publicación</td>
                    <td>Visualizaciones</td>
                    {/* <td>Ciudades</td> */}
                </tr>
                {publications && publications.map(item => {
                    return <tr>
                        <td>{item.title}</td>
                        <td>{item.views}</td>
                        <td>
                            <a target="_BLANK" className="a_whatsapp" href="https://api.whatsapp.com/send?phone=573052665725&text=Quiero impulsar una publicación en Pikplay">
                                <Button color="blue">
                                    Impulsar&nbsp;
                                    <FontAwesomeIcon icon={faRocket} />
                                </Button>
                            </a>
                        </td>
                        {/* <td>
                            Barranquilla
                            <br />
                            Medellín
                        </td> */}
                    </tr>
                })}
            </table>
        </div>
    </div >
}

const Publicacion = ({ item, ind, getPublications }) => {
    const [changeSeller, setChangeSeller] = useState(false)
    const [showAdminOptions, setShowAdminOptions] = useState(false)
    const { is_admin } = useSelector((state) => state.user)

    const changeSellerHandle = (sellerUpdated) => {
        item.user = sellerUpdated
    }

    const VERIFY_PUBLICATION = gql`
    query verifyPublication($id_publication: Int){
        verifyPublication(id_publication: $id_publication)
    }`

    const UPDATE_MUTATION = gql`
	mutation ChangeStatePublication($id: Int!, $status: Boolean!){
		changeStatePublication(id: $id, status: $status)
	}`

    const [changeStatePublication, { }] = useMutation(UPDATE_MUTATION);

    const handleChangeState = (status) => {
        changeStatePublication({
            variables: { id: item.id, status },
            fetchPolicy: "no-cache"
        });
        setTimeout(() => {
            getPublications()
        }, 500)
    }

    const handleEdit = (slug) => {
        Router.push("/publicacion/" + slug + "/editar")
    }

    const [handleChangeApprove, { loading, error, data }] = useLazyQuery(VERIFY_PUBLICATION, { variables: { id_publication: item.id }, fetchPolicy: "no-cache" })

    const moreOptions = is_admin || true

    return <li className={`${item.status ? '' : styles.disabled}`}>
        <div className={`Card ${styles["flex-table"]}`}>
            <div className={styles.image_link}>
                <img alt="Imagen de articulo" src={item.image_link} />
            </div>
            <div className={styles["flex-row"]} title={`ID: ${item.id}`}>{item.title}</div>
            <div className={styles["flex-row"]}>${format_number(item.sale_price)}</div>
            <div className={styles["flex-row"]} title="Fecha de creación">
                {moment(parseInt(item.created)).format("MMMM DD YYYY, h:mm:ss a")}
            </div>
            <div className={styles["flex-row"]}>{item.views} visitas</div>
            <div className={styles["flex-row"]}>{item.is_verified ? item.status ? "Activa" : "Pausada" : "En revisión"}</div>
            <div className={`${styles["flex-row"]} ${styles.actions}`}>
                {
                    item.status && <Link href="/publicacion/[id]" as={`/publicacion/${item.slug}`}>
                        <Button color="blue">
                            Ver
                        </Button>
                    </Link>
                }
                {
                    !item.status && <span className={styles.verPublicacion} onClick={() => {
                    }}>
                        <FontAwesomeIcon style={{ position: "relative", left: "-5px", top: "2px" }} icon={faQuestionCircle} onClick={() => {
                            const message = {
                                id: 0, message: <div>
                                    <p>Normalmente no es posible ir a la publicación cuando aún esta siendo revisada por Pikplay ó porque esta pausada</p>
                                </div>
                            }
                            dispatch({ type: "SET_MESSAGE", payload: { message } })
                        }} />
                        {/* No es posible ver la publicación */}
                    </span>
                }
                <Button onClick={() => handleEdit(item.slug)} color="yellow">Editar</Button>
                <Button onClick={() => item.is_verified ? handleChangeState(!item.status) : null} color={item.is_verified ? item.status ? "red" : "green" : "disabled"}>
                    {
                        item.status == true ? <>Desactivar</> : <>Activar</>
                    }
                </Button>
                {!!is_admin && <Button color="link" onClick={() => setShowAdminOptions(!showAdminOptions)}>
                    Más opciones
                </Button>}
            </div>
        </div>
        {moreOptions && <div className={styles.more_options}>
            {!item.is_verified && <div className={styles.pending_aprove}>
                <p>Gracias por tu paciencia.</p>
                <p>
                    Recibimos tu publicación. Debe de ser aprobada por uno de los moderadores de Pikplay para que puedan verla otras personas.
                </p>
            </div>}

            {(!!is_admin && showAdminOptions) && <div className={styles.adminActions}>
                <ChangeSeller changeSellerHandle={changeSellerHandle} user_id={item.user.id} id_publication={item.id} />
                <Button disabled={item.is_verified} color="blue" onClick={handleChangeApprove}>Dar de alta</Button>
            </div>}
        </div>}
    </li>
}

const Publicaciones = () => {
    const dispatch = useDispatch()
    const [tryAgain, setTryAgain] = useState(false)
    const { id: user_id, is_admin } = useSelector((state) => state.user)

    const PUBLICATIONS_QUERY = gql`
	query Publications($user_id: Int, $order: Boolean, $is_admin: Boolean){
		publications(user_id: $user_id, order: $order, is_admin: $is_admin, limit: 10){
			accept_changues
			created
			id
			is_verified
			image_link
			sale_price
			slug
			status
			title
            user {
                id
            }
			views
		}
	}`

    const [getPublications, { loading: loadingPublications, error, data: reqPublications }] = useLazyQuery(PUBLICATIONS_QUERY, {
        variables: { user_id, order: true, is_admin: !!is_admin },
        fetchPolicy: "no-cache",
        onError: (error) => setTryAgain(true),
        onCompleted: () => setTryAgain(false)
    })

    useEffect(() => {
        getPublications()
    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    const [value, setValue] = React.useState(0);

    return <section className={styles.content}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs textColor="primary" style={{ background: "white" }} value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Publicaciones" />
                <Tab label="Informe" />
            </Tabs>
        </Box>

        <TabPanel value={value} index={0} className="m-20">
            <h2>
                Listado de publicaciones
                <FontAwesomeIcon className="svg-question" icon={faQuestionCircle} onClick={() => {
                    const message = {
                        id: 0, message: <div>
                            <p>Bienvenido a tus publicaciones</p>
                            <p style={{ textAlign: "right" }}>Juntos somos mejor 🤝</p>
                        </div>
                    }
                    dispatch({ type: "SET_MESSAGE", payload: { message } })
                }} />
            </h2>
            <center>
                {loadingPublications && <div>Cargando publicaciones...</div>}
                {tryAgain && !loadingPublications && <Button color='normal' onClick={getPublications}>Intentar nuevamente</Button>}
            </center>
            <ul className="">
                {
                    reqPublications?.publications && reqPublications.publications.map((item, ind) => {
                        return <Publicacion item={item} ind={ind} getPublications={getPublications} />
                    })
                }
            </ul>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <CakeReport {...{ publications: reqPublications?.publications }} />
        </TabPanel>
    </section>
}

export default Publicaciones