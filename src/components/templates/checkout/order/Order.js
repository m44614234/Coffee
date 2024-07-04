"use client";
import { useState, useEffect } from "react";
import styles from "./order.module.css";
// import Link from "next/link";

const Order = ({orders}) => {
  const [showZarinPallAlert, setShowZarinPallAlert] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  

  const calcTotalPrice = () => {
    let price
    if (orders.length) {
      price = orders.reduce( 
        (prev, current) => prev + current.product.price * current.quantity , 0
      );
      setTotalPrice(price)
    }
    setTotalPrice(price)
  };

  useEffect(calcTotalPrice , [orders])



  const total = totalPrice + totalPrice * 0.01 + totalPrice * 0.09



  return (
    <div className={styles.order}>
      <p className={styles.title}>سفارش شما</p>
      <main className={styles.main}>
        <div>
          <p>جمع جزء</p>
          <p>محصول</p>
        </div>

        {orders.map((item) => (
          <section key={item.id}>
            <div>
              <p dir="rtl" className="text-sm text-gray-500">{(item.quantity * item.product.price).toLocaleString()} تومان</p>
              <p className="text-sm text-gray-500">
                {item.product.name}
              </p>
            </div>
          </section>
        ))}
        
        <div>
              <p className="text-md" dir="rtl"><strong>{totalPrice.toLocaleString()} تومان</strong> </p>
              <p className="text-md ">جمع جزء</p>
        </div>

            <div>
              <p>
                پیک موتوری: <strong>{(totalPrice * 0.01).toLocaleString()} تومان</strong>
              </p>
              <p>حمل و نقل</p>
            </div>
        
            <div>
              <div>
                <h2 className="text-lg text-bold"><strong>{total.toLocaleString()} تومان</strong></h2>
                <p className="text-lg text-bold">
                  (شامل <strong>{(totalPrice * 0.09).toLocaleString()}</strong> تومان ارزش افزوده)
                </p>
              </div>
              <h3>مجموع</h3>
            </div>
      </main>
      <div className={styles.transaction}>
        <div>
          <input
            onClick={() => setShowZarinPallAlert(false)}
            type="radio"
            name="payment_method"
            value="melli"
          />
          <label> بانک ملی</label>
          <img
            width={24}
            height={40}
            src="https://set-coffee.com/wp-content/plugins/WooCommerce-melli/images/logo.png"
            alt="بانک ملی"
          ></img>
        </div>
        <div>
          <input
            onClick={() => setShowZarinPallAlert(true)}
            type="radio"
            name="payment_method"
            value="zarinpal"
          />
          <label>پرداخت امن زرین پال </label>
          <img
            width={40}
            height={40}
            src="https://set-coffee.com/wp-content/plugins/zarinpal-woocommerce-payment-gateway/assets/images/logo.png"
            alt="زرین پال"
          ></img>
        </div>
        {showZarinPallAlert && (
          <div className={styles.paymentBox}>
            <p>
              پرداخت امن به وسیله کلیه کارت های عضو شتاب از طریق درگاه زرین پال
            </p>
          </div>
        )}
        <div className={styles.warning}>
          <p>
            اطلاعات شخصی شما برای پردازش سفارش و پشتیبانی از تجربه شما در این
            وبسایت و برای اهداف دیگری که در{" "}
            <strong>سیاست حفظ حریم خصوصی</strong> توضیح داده شده است استفاده
            می‌شود.
          </p>
        </div>
        <div className={styles.accept_rules}>
          <input type="checkbox" name="" id="" />
          <p>
            {" "}
            من<strong> شرایط و مقررات</strong> سایت را خوانده ام و آن را می
            پذیرم. <span>*</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Order;
