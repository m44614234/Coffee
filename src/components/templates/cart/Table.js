"use client";
import Link from "next/link";
import styles from "./table.module.css";
import totalStyles from "./totals.module.css"
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import stateData from "@/utils/stateData";
import Select from "react-select";
import { showSwal } from "@/utils/helpers";

const stateOptions = stateData();

const Table = ( {orders}) => {
  const [discount, setDiscount] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [stateSelectedOption, setStateSelectedOption] = useState(null);
  const [changeAddress, setChangeAddress] = useState(false);


  useEffect( calcTotalPrice, [orders]);

  function calcTotalPrice() {
    let price = 0;

    if (orders.length) {
      price = orders.reduce(
        (prev, current) => prev + current.product.price * current.quantity,
        0
      );
      setTotalPrice(price)
    }

    setTotalPrice(price)
  };

 

  const checkDiscount = async () => {
    // Validation (You) ✅

    const res = await fetch("api/discounts/use", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: discount }),
    });


    if (res.status === 404) {
      setDiscount("")

      return showSwal("کد تخفیف وارد شده معتبر نیست", "error", "تلاش مجدد");
    }
     else if (res.status === 422) {
      setDiscount("")

      return showSwal("کد تخفیف وارد شده منقضی شده", "error", "تلاش مجدد");
    } 
    else if (res.status === 200) {
      const addDiscount = await res.json()
      const newPrice = totalPrice - (totalPrice * addDiscount.percent) / 100 
      setTotalPrice(newPrice)
      console.log("newPrice =>" , newPrice)
      setDiscount("")
      return showSwal("کد تخفیف با موفقیت اعمال شد", "success", "فهمیدم")
    }
  };

  return (
    <>
      {" "}
      <div className={styles.tabel_container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th> جمع جزء</th>
              <th>تعداد</th>
              <th>قیمت</th>
              <th>محصول</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          
      {orders.map((item) => (
              <tr>
                <td>{(item.quantity * item.product.price).toLocaleString()} تومان</td>
                <td>
                    <p className="text-lg text-gray-800">{item.quantity}</p>
                </td>
                <td className={styles.price}>
                  {item.product.price.toLocaleString()} تومان
                </td>
                <td className={styles.product}>
                  <img
                    src={item.product.img}
                    alt=""
                  />
                  <Link href={"/"}>{item.product.name}</Link>
                </td>

                <td>
                  <IoMdClose className={styles.delete_icon} />
                </td>
              </tr>
      ))}    
          </tbody>
        </table>
        <section>
          <button className={styles.update_btn}> بروزرسانی سبد خرید</button>
          <div>
            <button className={styles.set_off_btn} onClick={checkDiscount}>
              اعمال کوپن
            </button>
            <input
              type="text"
              value={discount}
              onChange={(event) => setDiscount(event.target.value)}
              placeholder="کد تخفیف"
            />
          </div>
        </section>
      </div>
      <div className={totalStyles.totals}>
        <p className={totalStyles.totals_title}>جمع کل سبد خرید</p>

        <div className={totalStyles.subtotal}>
          <p>جمع جزء </p>
          <p>{totalPrice.toLocaleString()} تومان</p>
        </div>

        <p className={totalStyles.motor}>
          {" "}
          پیک موتوری: <strong> {(totalPrice * 0.01).toLocaleString()} </strong>
        </p>
        <div className={totalStyles.address}>
          <p>حمل و نقل </p>
          <span>حمل و نقل به تهران (فقط شهر تهران).</span>
        </div>
        <p
          onClick={() => setChangeAddress((prev) => !prev)}
          className={totalStyles.change_address}
        >
          تغییر آدرس
        </p>
        {changeAddress && (
          <div className={totalStyles.address_details}>
            <Select
              defaultValue={stateSelectedOption}
              onChange={setStateSelectedOption}
              isClearable={true}
              placeholder={"استان"}
              isRtl={true}
              isSearchable={true}
              options={stateOptions}
            />
            <input type="text" placeholder="شهر" />
            <input type="number" placeholder="کد پستی" />
            <button onClick={() => setChangeAddress(false)}>بروزرسانی</button>
          </div>
        )}

        <div className={totalStyles.total}>
          <p>مجموع</p>
          <p>{(totalPrice + (totalPrice*0.01) ).toLocaleString()} تومان</p>
        </div>
        <Link href={"/checkout"}>
          <button className={totalStyles.checkout_btn}>
            ادامه جهت تصویه حساب
          </button>
        </Link>
      </div>
    </>
  );
};

export default Table;
