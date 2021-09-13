import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronCircleLeft, faChevronCircleRight } from "@fortawesome/free-solid-svg-icons"
import { useMutation, useQuery } from "@apollo/client"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import { CREATE_COIN, DELETE_NOTIFICATION, GET_NOTIFICATIONS } from "../../lib/utils"
import { PikContext } from "../../states/PikState"
import styles from "./holaJuanito.module.scss"

const HolaJuanito = () => {
    const isMobile = typeof window != "undefined" ? window.screen.width < 420 : false
    const [leftIndicator, setLeftIndicator] = useState(0)
    const [deleteNotification] = useMutation(DELETE_NOTIFICATION);
    const context = useContext(PikContext)
    const [idNotification, setIdNotification] = useState(null)
    const [createCoin] = useMutation(CREATE_COIN);
    const name = context.user.name ? context.user.name : "Invitado"
    const isProfileComplete = context.user.name && context.user.email && context.user.picture != "/images/icons/user.png" && context.user.email
    // const isProfileComplete = true
    const [gotProfileCompletedCoins, setGotProfileCompletedCoins] = useState(false)
    const coins = 2500 // monedas que se le dara al usuario por completar el perfil

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
        if (!context.notifications) return
        const res = context.notifications.find(item => item.type == "PROFILE_COMPLETED")
        if (res) {
            setIdNotification(res.id)
            setGotProfileCompletedCoins(res.closed == 0 ? false : true)
        }
    }, [context.notifications])

    const reclamarCoins = () => {
        document.querySelector("#content_image_profile_menu").click()
        if (!idNotification) return
        createCoin({
            variables: {
                id: idNotification
            }
        })
        deleteNotification({ variables: { id: idNotification } })
        context.customDispatch({ type: "RECLAMAR_COINS", payload: { coins } })
        setTimeout(() => {
            context.getNotifications()
            setGotProfileCompletedCoins(true)
        }, 500)
    }
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

    const tam1 = isMobile ? -360 : -420
    const tam2 = isMobile ? -720 : -840

    const opacity1 = leftIndicator == tam1 ? .3 : leftIndicator == tam2 ? 0 : 1
    const opacity2 = leftIndicator == 0 ? .3 : 1
    const opacity3 = leftIndicator == tam1 ? .3 : 1

    const prev = isMobile ? window.screen.width - 40 : 420
    const next = isMobile ? Number(`-${window.screen.width - 40}`) : -420

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
                    <div className={`${styles.text2} font-c`}>
                        Recuerda que puedes confiar <span style={{ color: "green" }}>100%</span> en los aliados de <b>PikaPlay</b>.
                        Entregamos garantia por las compras que hagas a nuestros aliados certificados así que no te preocupes por estafas en tus compras.
                    </div>
                    {
                        context.user.id == 0 && <button onClick={() => document.getElementById("btnStart").click()} className={styles.reclamar_monedas}>
                            <Monedita />
                            Registrate y obten tus primeras pikcoins
                        </button>
                    }
                    {
                        context.user.id != 0 && isProfileComplete && !gotProfileCompletedCoins &&
                        <button onClick={reclamarCoins} className={styles.reclamar_monedas}>
                            <Monedita />
                            Reclamar monedas, ya he completado mi perfil
                        </button>
                    }
                    {
                        !isProfileComplete && context.user.id != 0 && <Link href="/perfil">
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
                                <img src="/images/aliados/panter.jpg" title="bluepanthervideogames" />
                                <span>Barranquilla</span>
                            </div>
                            <div>
                                <img src="/images/aliados/juancho.jpg" title="juanchofenixstore" />
                                <span>Bogotá</span>
                            </div>
                            <div>
                                <img src="/images/aliados/bodega.jpg" title="bodegadelvideojuego" />
                                <span>Medellín</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.ads}>
                    <ul style={{ left: `${leftIndicator}px` }}>
                        <ol style={{ opacity: opacity1 }}>
                            <Link href="/publicacion/[id]" as="/publicacion/bandeja-paisa-prueba-384">
                                <a>
                                    <img src="/images/banners/3.jpg" alt="" />
                                </a>
                            </Link>
                        </ol>
                        <ol style={{ opacity: opacity2 }}>
                            <Link href="/publicacion/[id]" as="/publicacion/bandeja-paisa-prueba-384">
                                <a>
                                    <img src="/images/banners/4.jpg" alt="" />
                                </a>
                            </Link>
                        </ol>
                        <ol style={{ opacity: opacity3 }}>
                            <Link href="/publicacion/[id]" as="/publicacion/bandeja-paisa-prueba-384">
                                <a>
                                    <img src="/images/banners/2.jpg" alt="" />
                                </a>
                            </Link>
                        </ol>
                    </ul>
                    <div className={styles.prev} onClick={() => handleActions(prev)}>
                        <FontAwesomeIcon icon={faChevronCircleLeft} />
                    </div>
                    <div className={styles.next} onClick={() => handleActions(next)}>
                        <FontAwesomeIcon icon={faChevronCircleRight} />
                    </div>
                </div>
            </div>
        </div>
    </div >
}

export default HolaJuanito