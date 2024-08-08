import React, { useEffect, useState } from 'react'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";
import ReactTyped from 'react-typed'
import styles from './styles.module.scss'
import CoinIcon from '../coinIcon/CoinIcon';
import Button from '../button/Button'
import { animatePrince, startConfetti } from '../../lib/utils'
import classNames from 'classnames';
import ProfileSummaryExperience from '../profileSummaryExperience/ProfileSummaryExperience';
import { motion, AnimatePresence } from "framer-motion"
import useSystemStore from '../../hooks/storeSystem';

const AwardsSummary = ({ callback }) => {
  const gainedCoins = 5
  const currentUserCoins = 10
  const { awardsSummaryModalHTML } = useSystemStore()

  useEffect(() => {
    setTimeout(() => {
      startConfetti()
    }, 500)
  }, [])

  const handleUpdateExperience = () => {
    handlePickRewardUp()
    // callback(1)
  }

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
          <ReactTyped strings={[awardsSummaryModalHTML]} typeSpeed={20} />
        </p>
      </div>

      <div className={styles.actions}>
        <motion.div
          initial={{ x: '-600px' }}
          animate={{ x: 0, }}
          transition={{ delay: 2 }}>
          <Button
            className={styles.main_button}
            color="yellow"
            onClick={handleUpdateExperience}
            realistic
            shine>
            Ir a mi perfil
          </Button>
          {/* <Button
                        className={styles.main_button}
                        color="blue"
                        onClick={handleUpdateExperience}
                        realistic
                        shine>
                        Ir a mi perfil
                    </Button> */}
        </motion.div>
      </div>
    </>
  )
}

const AwardsSummaryModal = (props) => {
  const { setStoreValue } = useSystemStore((state => state))
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
    onClose={() => setStoreValue('isAwardSummaryModalOpen', false)}
    className={styles.Dialog}>
    <DialogContent>
      <div id="AwardsSummary" className={styles.AwardsSummary}>
        <div className={styles.bg_city}></div>
        <div className={styles.content}>
          <div className={styles.content_child}>
            <AnimatePresence initial={true} custom={direction}>
              {page === 0 && <AwardsSummary callback={callback} />}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
}

export default AwardsSummaryModal;
