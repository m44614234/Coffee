import Link from "next/link";
import styles from "./product.module.css";
import { FaRegStar, FaStar } from "react-icons/fa";
import { CiSearch, CiHeart } from "react-icons/ci";

const Card = ({name , price , img , longDescription , score , _id}) => {
  return (
    <div className="bg-white  shadow-2xl rounded-md justify-center p-2 m-2" >
      
        <img
          src={img || "https://set-coffee.com/wp-content/uploads/2021/10/041-430x430.png"}
          className="min-h-[300px]"
          alt=""
        />
       

      <div className="flex flex-wrap justify-end text-end gap-3 pe-2 flex-col">
        <Link href={`/product/${_id}`} className="text-zinc-600">{name}
        </Link>

<p className="flex flex-wrap justify-end text-end gap-2 flex-col">{longDescription}</p>
        
<div className="flex flex-row gap-2 text-end w-full justify-end">
          {new Array(score)
            .fill(0)
            .map((index, i) => <FaStar key={index} className="text-yellow-500" />)}
          {new Array(5 - score)
            .fill(0)
            .map((index, i) => <FaRegStar key={index} className="text-zinc-700" />)}
        </div>
        <section className="flex justify-between items-center ">
        <Link href={`/product/${_id}`} className="text-white bg-red-800 p-2 rounded-md">اطلاعات بیشتر</Link>
            <span>{price?.toLocaleString()} تومان</span>
            </section>      </div>
    </div>
  );
};

export default Card;
