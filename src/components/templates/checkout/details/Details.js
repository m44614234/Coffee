"use client";
import stateData from "@/utils/stateData";
import styles from "./details.module.css";
import Select from "react-select";
import { useEffect, useState } from "react";
import Link from "next/link";
import swal from "sweetalert";
import { useRouter } from "next/navigation";

const stateOptions = stateData();
const Details = ({checkoutItems , userID , orders}) => {

  const [totalPrice, setTotalPrice] = useState(0);
  
  const [stateSelectedOption, setStateSelectedOption] = useState('');
  const [citySelectedOption, setCitySelectedOption] = useState('');
  const [citySelectorDisabel, setCitySelectorDisabel] = useState(true);
  const [cityOption, setCityOption] = useState([]);
  const [showDiscountForm, setShowDiscountForm] = useState(false);

  //user form for fetching data
  const [form, setForm] = useState({
    name: "",
    family: "",
    email: "",
    mobile: "",
    address: "",
    details: "",
    postalCode: "",
    completed : false ,
    user : userID ,
    finalPrice :  totalPrice , 
    order :  checkoutItems ,
    province: stateSelectedOption,
    city: citySelectedOption,

  });



  const calcTotalPrice = () => {
    let price;
    if (orders.length) {
      price = orders.reduce(
        (prev, current) => {
         console.log("productprice",prev,current.product.price);
         return prev + current.product.price * current.quantity
        } ,0
      );
    } 
   
    setForm({...form,"finalPrice":price + price * 0.01 + price * 0.09})
  };
  
  useEffect(calcTotalPrice , [orders])

  console.log("totalPrice => " , totalPrice)

  console.log("form Zaman =>" , form)


  const router = useRouter()  

  if (!form.mobile.trim) {
    if (form.mobile.length !== 11) {
      swal({
        title: "شماره همراه وارد شده صحیح نمی باشد!!",
        icon: "error",
      });
    }
  }

  if (!form.email.trim) {
    if (form.email.includes("@") === false) {
      swal({
        title: "ایمیل وارد شده صحیح نمی باشد!!",
        icon: "error",
      });
    }
  }

  if (!form.address.trim) {
    if (form.address < 4) {
      swal({
        title: "آدرس وارد شده صحیح نمی باشد!!",
        icon: "error",
      });
    }
  }

  if (!form.postalCode.trim) {
    if (form.postalCode.length !== 10) {
      swal({
        title: "کد پستی وارد شده صحیح نمی باشد!!",
        icon: "error",
      });
    }
  }

  if (!form.name.trim) {
    if (form.name < 4) {
      swal({
        title: "نام وارد شده صحیح نمی باشد!!",
        icon: "error",
      });
    }
  }

  if (!form.family.trim) {
    if (form.family < 4) {
      swal({
        title: "نام خانوادگی وارد شده صحیح نمی باشد!!",
        icon: "error",
      });
    }
  }


  const submitForm = async (e) => {
  
  if(!form.mobile.length  || !form.email.length || !form.address.length || !form.postalCode.length || !form.name.length || !form.family.length  ){
    swal({
        title: "لطفا فیلد های ضروری را تکمیل کنید!!",
        icon: "error",
      });
  }
    e.preventDefault();
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    console.log("form =>" , form)
      
      if (res.status === 201) {
        // localStorage.setItem("final",total)
        // allTotalPrice.push(localStorage.setItem("allTotalPrice",total))
        setForm({
          name: "",
          family: "",
          email: "",
          mobile: "",
          address: "",
          details: "",
          postalCode: "",
          completed : false ,
          finalPrice :  totalPrice , 
          user : userID ,
          order :  checkoutItems ,
          province: stateSelectedOption,
          city: citySelectedOption,
        });
        swal({
          title: "ثبت نام با موفقیت انجام شد",
          icon: "success",
          buttons: "فهمیدم",
        }).then((result) => {
          router.push("/complate-order");
        })
      }else if(res.status === 422){
        swal({
          title: "لطفا فیلد های ضروری را تکمیل کنید!!",
          icon: "error",
        });
      }
    
  };

  useEffect(() => {
    setCitySelectedOption(null);
    if (stateSelectedOption?.value) {
      const city = stateSelectedOption?.value.map((data) => {
        return {
          value: data,
          label: data,
        };
      });
      setCityOption(city);
      setCitySelectorDisabel(false);
    }
  }, [stateSelectedOption]);

  return (
    <div className={styles.details}>
      <section className={styles.discount}>
        <div>
          <p>کد تخفیف دارید؟</p>
          <span
            onClick={() => setShowDiscountForm(true)}
            className="text-slate-600 cursor-pointer"
          >
            برای نوشتن کد اینجا کلیک کنید
          </span>
        </div>
        {showDiscountForm && (
          <div className="p-5 gap-3 flex flex-col justify-between bg-gray-50 my-2 ">
            <p>اگر کد تخفیف دارید لطفا در باکس زیر بنویسید</p>
            <div>
              <button className="bg-red-800 text-white px-4 py-2">
                اعمال کوپن
              </button>
              <input
                dir="rtl"
                className="bg-white border-solid border-2 mx-2 border-gray-900 px-4 py-2"
                type="text"
                placeholder="کد تخفیف"
              />
            </div>
          </div>
        )}
      </section>
      <p className={styles.details_title}>جزئیات صورتحساب</p>

      <form className={styles.form}>
        <div className={styles.groups}>
          <div className={styles.group}>
            <label>
              نام خانوادگی <span>*</span>
            </label>
            <input
              type="text"
              value={form.family}
              onChange={(e) => setForm({ ...form, family: e.target.value })}
            />
          </div>

          <div className={styles.group}>
            <label>
              نام <span>*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
        </div>

       

        <div className={styles.group}>
          <label>
            استان<span>*</span>
          </label>
          <Select
            defaultValue={stateSelectedOption}
            onChange={setStateSelectedOption}
            isClearable={true}
            placeholder={""}
            isRtl={true}
            isSearchable={true}
            options={stateOptions}
          />
        </div>
        <div className={styles.group}>
          <label>
            شهر<span>*</span>
          </label>
          <Select
            defaultValue={citySelectedOption}
            onChange={setCitySelectedOption}
            isDisabled={citySelectorDisabel}
            isClearable={true}
            isRtl={true}
            isSearchable={true}
            options={cityOption}
            placeholder={""}
          />
        </div>

        <div className={styles.group}>
          <label>
            آدرس خیابان<span>*</span>
          </label>
          <input
            type="text"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
        </div>

        <div className={styles.group}>
          <label>
            کدپستی (بدون فاصله)<span>*</span>
          </label>
          <input
            type="text"
            value={form.postalCode}
            onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
          />
        </div>

        <div className={styles.group}>
          <label>
            شماره موبایل <span>*</span>
          </label>
          <input
            type="text"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
          />
        </div>

        <div className={styles.group}>
          <label>
            ایمیل <span>*</span>
          </label>
          <input
            type="text"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

       

        <div className={styles.destination}>
          <label>توضیحات سفارش (اختیاری) </label>
          <textarea
            cols="30"
            rows="8"
            placeholder="اگر توضیحی در مورد سفارش خود دارید در اینجا ثبت کنید"
            value={form.details}
            onChange={(e) => setForm({ ...form, details: e.target.value })}
          ></textarea>
        </div>
        <Link href={"/complate-order"} >
          <button onClick={submitForm} className={styles.submit}>
            ثبت سفارش
          </button>{" "}
        </Link>
      </form>
    </div>
  );
};

export default Details;
