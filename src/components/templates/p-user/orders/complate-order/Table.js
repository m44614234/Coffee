"use client";
import styles from "@/styles/complate-order.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import momentJalaali from 'moment-jalaali';
const moment = require('moment');
import swal from "sweetalert";
import { useRouter } from "next/navigation";


const Complate = ({ complate_order}) => {
  
console.log("complate_order =>" , complate_order)
  const router = useRouter()

  const checkoutID = complate_order._id || null

  const acceptCheckOut = async (checkoutID) => {
    const res = await fetch("/api/checkout/accept", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: checkoutID }),
    });

    if (res.status === 200) {
      swal({
        title: "صورتحساب با موفقیت پرداخت شد",
        icon: "success",
        buttons: "فهمیدم",
      }).then(() => {
        router.refresh();
      });
    }
  };

  momentJalaali.loadPersian({usePersianDigits: true})
  moment.locale('fa')


 
  // const calcTotalPrice = () => {
  //   let price = 0;
  //   if (orders.length) {
  //     price = orders.reduce(
  //       (prev, current) => prev + current.product.price * current.quantity , 0
  //     );
  //     setTotalPrice(price)
  //   }
  //   setTotalPrice(price)
  // };

  // useEffect(calcTotalPrice , [orders])

  // console.log("totalPrice => " , totalPrice)


  // const createDate = new Date(complate_order.createdAt).toISOString("fa-IR")

  return (
    <div className={styles.box}>
      <ul>
        <li>شماره سفارش:<strong>{complate_order?._id}</strong> </li>
        <li>تاریخ: <strong>{new Date(complate_order?.createdAt).toLocaleDateString("fa-IR" , {hour: "2-digit", minute: "2-digit"} )}</strong></li>
        {/* <li>تاریخ: <strong>{moment(complate_order.createdAt).calendar()}</strong></li> */}
        <li>
          وضعیت :{" "}
          {complate_order?.completed === false ? <strong className="text-red-800">پرداخت نشده</strong> :  <strong className="text-emerald-800">پرداخت شده</strong> }
        </li>
        <li>
          {" "}
          قیمت نهایی:{" "}
          <strong>{(complate_order.finalPrice).toLocaleString()} تومان</strong>
        </li>
        <li> روش پرداخت: <strong>بانک ملی</strong> </li>
      </ul>
      <div>
        <button onClick={() => acceptCheckOut(checkoutID)}>پرداخت</button>
        <Link href={"/checkout"}>
          <button> بازگشت</button>{" "}
        </Link>
      </div>
    </div>
  );
};
export default Complate;
