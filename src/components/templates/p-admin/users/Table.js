
"use client";
import styles from "./table.module.css";
import swal from "sweetalert";

import TheRowBox from "./the-row-box";
export default function DataTable({ users, title }) {
 
  
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
          <th>نام و نام خانوادگی</th>
          <th>ایمیل</th>
          <th>نقش</th>
          <th>ویرایش</th>
          <th>تغییر سطح</th>
          <th>حذف</th>
          <th>بن</th>
                  </tr>
               </thead>
               <tbody>
                  {users.map((user, index) => (
                     <TheRowBox key={index} user={user} index={index}/>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
}


