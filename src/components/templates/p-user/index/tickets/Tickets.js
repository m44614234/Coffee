import Ticket from "@/components/modules/ticket/Ticket";
import styles from "./ticket.module.css";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const Tickets = () => {
  return (
    <div className={styles.content}>
      <div className={styles.content_details}>
        <p>تیکت های اخیر</p>
        <Link href="/p-user/tickets">
          همه تیکت ها <FaArrowLeft />
        </Link>
      </div>
      <Ticket />
      <Ticket />
      <Ticket />
      {/* <p className={styles.empty}>تیکتی ثبت نشده</p> */}
    </div>
  );
};

export default Tickets;
