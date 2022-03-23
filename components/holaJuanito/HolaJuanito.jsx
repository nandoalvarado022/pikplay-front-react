import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronCircleLeft, faChevronCircleRight } from "@fortawesome/free-solid-svg-icons"
import { useMutation, useQuery } from "@apollo/client"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import { CREATE_COIN, DELETE_NOTIFICATION, getNotifications, GET_NOTIFICATIONS } from "../../lib/utils"
import styles from "./holaJuanito.module.scss"
import confetti from "canvas-confetti"
import { useDispatch, useSelector } from "react-redux"
import CountUp from 'react-countup'

const HolaJuanito = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state)
    const isMobile = typeof window != "undefined" ? window.screen.width < 420 : false
    const [leftIndicator, setLeftIndicator] = useState(0)
    const [deleteNotification] = useMutation(DELETE_NOTIFICATION)
    const [idNotification, setIdNotification] = useState(null)
    const [createCoin] = useMutation(CREATE_COIN)
    const name = user.name ? user.name : "Invitado"
    const isProfileComplete = user.name && user.email && user.email && user.city
    // const isProfileComplete = true
    const [gotProfileCompletedCoins, setGotProfileCompletedCoins] = useState(false)
    const coins = 2500 // monedas que se le dara al usuario por completar el perfil
    const notifications = useSelector((state) => state.notifications).filter(item => item.closed == 0)

    // useQuery(GET_NOTIFICATIONS, {
    //     fetchPolicy: "no-cache",
    //     skip: context.user.id == 0,
    //     variables: {
    //         user: context.user.id
    //     },
    //     onCompleted: ({ getNotifications }) => {
    //     }
    // })

    useEffect(() => {
        if (!notifications) return
        const res = notifications.find(item => item.type == "PROFILE_COMPLETED")
        if (res) {
            setIdNotification(res.id)
            setGotProfileCompletedCoins(res.closed == 0 ? false : true)
        }
    }, [notifications])

    const classButton = isProfileComplete && gotProfileCompletedCoins ? styles.disabled : ""

    const Monedita = () => <img style={{
        position: "relative",
        top: "3px",
        marginRight: "10px",
        width: "20px"
    }} src="/images/icons/moneda2.svg" alt="Reclamar monedas por completar el perfil" />

    const handleActions = (value) => {
        let _leftIndicator = leftIndicator + value
        if (_leftIndicator > 0 || _leftIndicator <= -1260) return
        setLeftIndicator(_leftIndicator)
    }

    return <div className={styles.HolaJuanito}>
        <div className="content">
            <div className={styles.content}>
                <div className={`Card ${styles.texts}`}>
                    <div className={`${styles.text1} font-c`}>
                        Hola,
                        <div>
                            <b className="font-a">{name}</b>
                        </div>
                    </div>
                    <div className={`${styles.text2} font-a`}>
                        <p>Contigo ya somos&nbsp;
                            <span>
                                <CountUp end={165} />
                            </span> gamers en Pikplay.
                        </p>
                        Recuerda que puedes confiar <b style={{ color: "green" }}>100%</b> en nuestros aliados certificados. Entregamos garantía por las compras que realices a estos, así que tu compra será confiable, rápida y segura.
                    </div>
                    {
                        user.id == 0 && <button onClick={() => document.getElementById("btnStart").click()} className={styles.reclamar_monedas}>
                            <Monedita />
                            Registrate y obten tus primeras pikcoins
                        </button>
                    }

                    {
                        !isProfileComplete && user.id != 0 && <Link href="/perfil">
                            <a className={styles.reclamar_monedas}>
                                Completar perfil y ganar monedas
                            </a>
                        </Link>
                    }
                    {
                        isProfileComplete && gotProfileCompletedCoins && <button className={`${styles.reclamar_monedas} ${styles.disabled}`} title="Solo para categoria Plata" color="blue">Ver siguientes desafios</button>
                    }
                    <div className={styles.aliados}>
                        <h3>Nuevos Aliados</h3>
                        <div className={styles.rows}>
                            <div>
                                <img src="/images/aliados/akavideogames.jpg" title="Akavideogames" />
                                <span>Barranquilla</span>
                            </div>
                            <div>
                                <img src="/images/aliados/panter.jpg" title="Bluepanthervideogames" />
                                <span>Barranquilla</span>
                            </div>
                            <div>
                                <img src="/images/aliados/juancho.jpg" title="Juanchofenixstore" />
                                <span>Bogotá</span>
                            </div>
                            <div>
                                <img src="/images/aliados/bodega.jpg" title="Bodegadelvideojuego" />
                                <span>Medellín</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.ads}>
                    <ul>
                        <ol>
                            <Link href="/publicacion/[id]" as="/publicacion/preventa-fifa-22-juanchofenix-502">
                                <a>
                                    <iframe width="560" height="315" src="https://www.youtube.com/embed/U_oewgFysiY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                </a>
                            </Link>
                            <p className={styles.description}>
                                Lost Judgement es una entrega de acción y aventura desarrollada por Ryu Ga Gotoku Studio y publicada por Sega, estrenada el 21 de septiembre de 2021 a nivel mundial.
                            </p>
                        </ol>
                    </ul>
                </div>
            </div>
        </div>
    </div >
}

export default HolaJuanito