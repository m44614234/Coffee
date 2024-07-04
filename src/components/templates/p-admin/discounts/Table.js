"use client"
import React from "react";
import styles from "./table.module.css"
import { useRouter } from "next/navigation";
function Table({ discounts }) {
 const router = useRouter();
  const removeHandler = async (discountID) => {
    const res = await fetch(`/api/discounts/${discountID}`, {
      method: "DELETE",
    });
    if (res.status === 200) {
      swal({
        title: "تخفیف مورد نظر با موفقیت حذف شد",
        icon: "success",
        buttons: "فهمیدم",
      }).then(() => {
        router.refresh();
      });
    }
  };
 
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>شناسه</th>
          <th>کد</th>
          <th>درصد</th>
          <th>حداکثر استفاده</th>
          <th>دفعات استفاده شده</th>
          <th>حذف</th>
        </tr>
      </thead>
      <tbody>
        {discounts.map((discount, index) => (
          <tr key={discount._id}>
            <td
              className={
                discount.uses === discount.maxUse ? styles.red : styles.green
              }
            >
              {index + 1}
            </td>
            <td>{discount.code}</td>
            <td>{discount.percent}</td>
            <td>{discount.maxUse}</td>
            <td>{discount.uses}</td>
            <td>
              <button type="button" className={styles.delete_btn} onClick={() => removeHandler(discount._id)}>
                حذف
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
