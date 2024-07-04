"use client";
import { useRouter } from "next/navigation";
import styles from "./product.module.css";
import Link from "next/link";
import { FaRegStar } from "react-icons/fa";
import { IoMdStar } from "react-icons/io";
import swal from "sweetalert";
const Card = ({ price, score, name, img  , productID , orderID}) => {
  const router = useRouter()

  const removeProduct = () => {

    swal({
      title: "آیا از حذف محصول اطمینان دارید؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then( async(result) => {
      if(result){
        const res = await fetch(`/api/orders/${orderID}`, {
          method:"DELETE"
        })

        if(res === 200){
          swal({
            message:"محصول با موفقیت از علاقه مندی ها حذف شد",
            icon:"success" ,
            buttons:"باشه"
          }).then(() => {
            router.refresh()
          })
        }

      }
    });
  };

  return (
    <article className="shadow-lg px-1 my-2  w-[94%] mx-auto justify-between rounded-md flex flex-row">
     
    <div className="flex flex-row">
   <Link href={`/product/${productID}`} >
        <img
          width={70}
          height={70}
          src={img}
          alt="عکس محصول"
        />
    </Link>
<section className="flex flex-col justify-end text-end items-center py-2">
      <p dir="rtl" className="text-md text-start mb-2 w-full text-gray-800">{name}</p>    
      <span className="text-sm text-gray-900">{price.toLocaleString()} تومان</span>  
</section>
</div>

<div className="flex flex-col mx-2 justify-end text-end my-auto items-center ">
      <button onClick={()=>removeProduct(orderID)} className={styles.delete_btn}>
        حذف محصول{" "}
      </button>
      </div>
    </article>

  );
};

export default Card;
