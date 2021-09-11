import { useMutation, useQuery } from "@apollo/client"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import { CREATE_COIN, DELETE_NOTIFICATION, GET_NOTIFICATIONS } from "../../lib/utils"
import { PikContext } from "../../states/PikState"
import styles from "./holaJuanito.module.scss"

const HolaJuanito = () => {
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

    return <div className={styles.HolaJuanito}>
        <div className="content">
            <div className={styles.banners}>
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
                </div>

                <ul className={styles.ads}>
                    <ol>
                        <Link href="/publicacion/[id]" as="/publicacion/bandeja-paisa-prueba-384">
                            <a>
                                <img src="/images/banners/3.jpg" alt="" />
                            </a>
                        </Link>
                    </ol>
                </ul>
            </div>
        </div>
    </div >
}

export default HolaJuanito