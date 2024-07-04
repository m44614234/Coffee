"use client";
import styles from "./table.module.css";
import swal from "sweetalert";

import TheRowBox from "./the-row-box";
export default function DataTable({ products, title }) {
 
  
   return (
      <div>
         <div>
            <h1 className={styles.title}>
               <span>{title}</span>
            </h1>
         </div>
         <div className={styles.table_container}>
            <table className={styles.table}>
               <thead>
                  <tr>
                     <th>شناسه</th>
                     <th>نام</th>
                     <th>قیمت</th>
                     <th>امتیاز</th>
                     <th>مشاهده جزئیات</th>
                     <th>ویرایش</th>
                     <th>حذف</th>
                  </tr>
               </thead>
               <tbody>
                  {products.map((product, index) => (
                     <TheRowBox key={index} product={product} index={index}/>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
}

export const showSwal = (
   name,
   price,
   shortDescription,
   longDescription,
   score
) => {
   swal({
      title: `
     نام محصول: ${name} 
     قیمت: ${price}
     توضیحات کوتاه: ${shortDescription}
    توضیحات تفصیلی: ${longDescription}
    امتیاز:  ${score}    `,
   });
};
