"use client";
import { useRouter } from "next/navigation";
import styles from "./product.module.css";
import Link from "next/link";
import { FaRegStar } from "react-icons/fa";
import { IoMdStar } from "react-icons/io";
import swal from "sweetalert";
const Card = ({ price, score, name, img  , productID , wishID}) => {
  const router = useRouter()

  const removeProduct = () => {

    swal({
      title: "آیا از حذف محصول اطمینان دارید؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then( async(result) => {
      if(result){
        const res = await fetch(`/api/wishlist/${wishID}`, {
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
    <div className="shadow-lg p-5 ">
      <Link href={`/product/${productID}`} >
        <img
          width={283}
          height={283}
          src={img}
          alt=""
        />
      </Link>

<section className="flex flex-row justify-between items-center py-2">
      <p dir="rtl" className="text-lg text-gray-800">{name}</p>
        <div className="flex flex-row">
          {new Array(score).fill(0).map((item, index) => (
            <IoMdStar key={index} className="text-yellow-500" />
          ))}
          {new Array(5 - score).fill(0).map((item, index) => (
            <FaRegStar key={index} />
          ))}
        </div>
</section>
        <span className="text-md text-gray-900">{price.toLocaleString()} تومان</span>

      <button onClick={()=>removeProduct(wishID)} className={styles.delete_btn}>
        حذف محصول{" "}
      </button>
    </div>

  );
};

export default Card;
