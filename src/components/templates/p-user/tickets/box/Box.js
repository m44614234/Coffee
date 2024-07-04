import styles from './box.module.css'
import { BsTicketPerforated } from "react-icons/bs";
const Box = ({title,value}) => {
  return (
    <div className={styles.box}>
      <BsTicketPerforated/>
      <p>{title}</p>
      <span>{value}</span>
    </div>
  )
}

export default Box
