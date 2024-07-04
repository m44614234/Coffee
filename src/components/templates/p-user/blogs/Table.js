"use client";
import styles from "./table.module.css";
import swal from "sweetalert";

import TheRowBox from "./the-row-box";
export default function DataTable({ blogs, title }) {
 
  
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
                     <th>عنوان اصلی</th>
                     <th>عنوان دوم</th>
                     <th>توضیحات</th>
                     <th>حذف</th>
                  </tr>
               </thead>
               <tbody>
                  {blogs.map((blog, index) => (
                     <TheRowBox key={index} blog={blog} index={index}/>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
}

export const showSwal = (
   title
) => {
   swal({
      title: `
     عنوان بلاگ: ${title} 
     `
   });
};
