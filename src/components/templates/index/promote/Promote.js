import Link from "next/link";
import styles from "./promote.module.css";

const Promote = () => {
  return (
    <div className="bg-[#e3e3e3] mt-4 py-3 w-full flex flex-col">
      <div data-aos="fade-up-right" className={styles.container}>
        
        <main className="w-full flex flex-row-reverse justify-center flex-wrap">
          <section className=" flex flex-col justify-center text-center gap-1 text-lg w-full md:w-1/2 ">
            <span>خرید قهوه ، به سبک حرفه ای ها</span>
            <p>زیبایی امروز رو با قهوه “ست” کنید</p>
            <img data-aos="fade-left" src="/images/coffee-image-1.jpg" alt="" className="w-2/3 h-full mx-auto " />
          </section>
          {/* <section className={styles.club}> */}
          <section className="flex flex-col justify-center text-center gap-1 text-lg w-full pt-4 md:w-1/2">
            <div className="flex absolute z-40 flex-col bg-white  p-2 bottom-3 mb-[-20px] text-right ms-2">
              <span>باشگاه مشتریان ست</span>
              <p>برای مشتریان وفادار قهوه ست</p>
            </div>
            <img data-aos="fade-left" src="/images/clubset1.jpg" alt="" className="w-2/3 py-3 h-full mx-auto"
            style={{
              minHeight:"400px"
            }} />
          </section>
        </main>

       
      </div>

     


<main className="w-full flex flex-row-reverse justify-center flex-wrap mt-2">
          <section className=" flex flex-col justify-center text-center text-lg w-full md:w-2/3 ">
            <img className="w-full  h-full mx-auto"  src="/images/Home32.jpg" alt="" />
          </section>

          <section dir="rtl" className="flex flex-col justify-center text-start ps-2 gap-10  text-lg w-full pt-4 md:w-1/3">
          <p className={styles.title}>چرا قهوه ست</p>
            <p className="mt-3">
              برخورداری از تجربه و قدمت کافی و آگاهی از ذایقه مصرف کنندگان
              راهنمای ما در برآورده ساختن نیاز مشتریان قهوه تخصصی (موج سوم) است
              .تجربه ای به قدمت چهار نسل و ارتباط مستمر با مصرف کنندگان قهوه
              ضامن این ویژگیها است.
            </p>
            <div>  
              <Link href="/category" >
                <button>فروشگاه</button>
              </Link>
               <Link href="/about-us" className="ps-1">
                <button className={styles.red_btn}>بیشتر بخوانید</button>
              </Link>
              </div>
          </section>
        </main>
    </div>
  );
};

export default Promote;





// <main className="w-full flex flex-row-reverse justify-center flex-wrap">
//           <section className="bg-slate-600 flex flex-col justify-center text-center gap-1 text-lg w-full md:w-1/2 ">
//             <span>خرید قهوه ، به سبک حرفه ای ها</span>
//             <p>زیبایی امروز رو با قهوه “ست” کنید</p>
//             <img data-aos="fade-left" src="/images/coffee-image-1.jpg" alt="" className="w-2/3 h-full mx-auto " />
//           </section>
//           {/* <section className={styles.club}> */}
//           <section className="bg-green-600 flex flex-col justify-center text-center gap-1 text-lg w-full pt-4 md:w-1/2">
//             <div className="flex absolute z-40 flex-col bg-white p-2 bottom-3 mb-[-20px] text-right ms-2">
//               <span>باشگاه مشتریان ست</span>
//               <p>برای مشتریان وفادار قهوه ست</p>
//             </div>
//             <img data-aos="fade-left" src="/images/clubset1.jpg" alt="" className="w-2/3 py-3 h-full mx-auto"
//             style={{
//               minHeight:"400px"
//             }} />
//           </section>
//         </main>