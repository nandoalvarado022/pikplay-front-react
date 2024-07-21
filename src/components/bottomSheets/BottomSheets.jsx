import CloseButton from '../closeButton/CloseButton'
import styles from './bottomSheets.module.scss'

const BottomSheets = (props) => {
  const {
    children,
    isBottomSheets,
    setIsBottomSheets
  } = props
  return (
    <div className={`${isBottomSheets ? styles.active : ''} ${styles.BottomSheets}`}>
      <CloseButton onClick={() => setIsBottomSheets(false)} />
      <div id="draggable" draggable="true" className={styles.topLine} onDrag={() => setIsBottomSheets(false)} onClick={() => setIsBottomSheets(false)}></div>
      {children}
    </div>
  )
}

export default BottomSheets
