
import Link from 'next/link'
import { IoMdClose } from 'react-icons/io'
import styles from "@/styles/p-user/dataTable.module.css";

const Table = ({checkoutUser}) => {

    console.log("checkoutUser =>" , checkoutUser)

    return (
        <div className="w-full">
            <h1 className={styles.title}>
          <span>سفارشات</span>
        </h1>
        <table className="w-full flex flex-col px-3 mt-8 justify-between">
                <thead>
                    <tr className="w-full bg-red-800 text-white py-3 px-2  flex flex-row justify-between">
                        <th>ردیف</th>
                        <th>شناسه سفارش</th>
                        <th>وضعیت</th>
                        <th>جمع کل</th>
                        <th>حذف</th>
                    </tr>
                </thead>
                <tbody>
                

                    {checkoutUser.map((item , index) => (
                        <tr key={item._id} className="w-full flex  py-4 px-2 flex-row justify-between" >
                            <td>{index+1}</td>
                        <td className="text-sky-900"> {item._id} </td>

                        <td className="text-sky-900"> {item.completed === false ? "در انتظار پرداخت" : "پرداخت شده"} </td>
                        <td className="text-sky-900">{item.finalPrice.toLocaleString()}</td>

                
                        <td><IoMdClose className={styles.delete_icon} /></td>

                    </tr>
                    
                    
                    ))
                }
                </tbody>
            </table>

        </div>
    )
}

export default Table
2