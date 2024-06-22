import React, { useEffect, useState } from 'react'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";
import confetti from 'canvas-confetti'
import ReactTyped from 'react-typed'
import styles from './styles.module.scss'
import CoinIcon from '../coinIcon/CoinIcon';
import Button from '../button/Button'
import { animatePrince } from '../../lib/utils'
import classNames from 'classnames';
import ProfileSummaryExperience from '../profileSummaryExperience/ProfileSummaryExperience';
import { motion, AnimatePresence } from "framer-motion"

const AwardsSummary = ({ callback }) => {

    const gainedCoins = 5
    const currentUserCoins = 10

    const startConfetti = () => {
        var count = 200;
        var defaults = {
            origin: { y: 0.7 },
            zIndex: 1301
        };

        function fire(particleRatio, opts) {
            confetti({
                ...defaults,
                ...opts,
                particleCount: Math.floor(count * particleRatio)
            });
        }

        fire(0.25, {
            spread: 26,
            startVelocity: 55,
        });
        fire(0.2, {
            spread: 60,
        });
        fire(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 45,
        });
        confetti({ ...defaults })
    }

    useEffect(() => {
        setTimeout(() => {
            startConfetti()
        }, 500)
    }, [])

    const handleUpdateExperience = () => {
        handlePickRewardUp()
        callback(1)
    }

    const message = `Recibiste <span class="yellow">5 Pikcoins</span> 
    para redimir en productos de la tienda <b>JuanchoFenix</b>. 
    Además <span class="blue">2.000 EXP</span> ¡Felicitaciones!`

    const handlePickRewardUp = () => {
        // Sumando coins al Coins del header
        const element = document.querySelector('#PreviewProfile--Coins .number')
        const fromNumber = element?.innerHTML
        const targetNumber = currentUserCoins + gainedCoins
        animatePrince(element, targetNumber, fromNumber)

        // Restando coins
        const secondElement = document.querySelector('#AwardsSummary .number')
        animatePrince(secondElement, 0, gainedCoins)
    }

    return (
        <>
            <div>
                <motion.div
                    initial={{ y: '200px' }}
                    animate={{
                        y: 0,
                    }}
                    transition={{
                        delay: .5
                    }}
                    className={styles.title}>
                    ¡Nueva liga!
                </motion.div>
                <motion.div
                    initial={{ x: '-200px' }}
                    animate={{
                        x: 0,
                    }}
                    transition={{
                        delay: .2
                    }}
                    className={styles.subtitle}>
                    BRONCE
                </motion.div>
            </div>
            <div className={styles.box}>
                {/* <img src="/images/type_notification/coupon_gift_available.png" alt="bronze" /> */}
                <p className={styles.description}>
                    <CoinIcon coins={gainedCoins} multicoin />
                    <ReactTyped strings={[message]} typeSpeed={20} />
                </p>
            </div>

            <div className={styles.actions}>
                <motion.div
                    initial={{ x: '-600px' }}
                    animate={{ x: 0, }}
                    transition={{ delay: 2 }}>
                    <Button className={styles.main_button} color="blue" onClick={handleUpdateExperience}>
                        Continuar
                    </Button>
                </motion.div>
            </div>
        </>
    )
}

const variants = {
    enter: (direction) => {
        return {
            x: direction > 0 ? 100 : -100,
            opacity: 0
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction) => {
        return {
            zIndex: 0,
            x: direction < 0 ? 100 : -100,
            opacity: 0
        };
    }
}

const ModalComponent = (props) => {
    const { setSummaryAwardsOpen } = props
    const [[page, direction], setPage] = useState([0, 0]);
    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="left" ref={ref} {...props} />;
    })

    const callback = (number) => {
        // setTimeout(() => {
        setPage([number, 1])
        // }, 1000)
    }

    return <Dialog
        open={true}
        TransitionComponent={Transition}
        onClose={() => setSummaryAwardsOpen(false)}
        className={styles.Dialog}>
        <DialogContent>
            <div id="AwardsSummary" className={styles.AwardsSummary}>
                <div className={styles.bg_city}></div>
                <div className={styles.content}>
                    <div className={styles.content_child}>
                        <AnimatePresence initial={true} custom={direction}>
                            {page === 0 && <AwardsSummary callback={callback} />}
                            {page === 1 && <PreviewProfileSummaryExperience
                                gainExperience={200}
                                callback={callback}
                                setSummaryAwardsOpen={setSummaryAwardsOpen}
                            />}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </DialogContent>
    </Dialog>
}

const PreviewProfileSummaryExperience = ({ callback, setSummaryAwardsOpen, gainExperience }) => {
    return <motion.div variants={variants}>
        <ProfileSummaryExperience gainExperience={gainExperience} />
        <div className={styles.actions2}>
            {/* <Button outline color="blue" className={styles.main_button} onClick={() => callback(0)}>
                ATRAS
            </Button> */}
            <motion.div
                initial={{ x: '-600px' }}
                animate={{ x: 0, }}
                transition={{ delay: 2 }}>
                <Button color="blue" className={styles.main_button} realistic>
                    Continuar
                </Button>
            </motion.div>
        </div>
    </motion.div>
}

export default ModalComponent;
