import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";
import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import Form from "@/components/templates/contact-us/Form";
import Information from "@/components/templates/contact-us/Information";
import styles from "@/styles/contact-us.module.css";
import Map from "@/components/templates/contact-us/Map";
import Link from "next/link";
import { authUser } from "@/utils/authUser";
import OrderModel from "@/models/Orders";
import WishListModel from "@/models/WishList";

const page = async () => {
  const user = await authUser()

  const wishList = await WishListModel.find({ user: user?._id }) 

  const orderProductLength = await OrderModel.find({ user: user?._id })
    .populate("product")
    .lean()


  return (
      <>
<Navbar
     isLogin={user ? true : false}
    orderProductLength={orderProductLength.length}
    wishList_Length={wishList.length} />

      <Breadcrumb route={"تماس با ما"} />

      <div className={styles.container}>
        <main className="flex flex-row justify-center gap-2 flex-wrap px-2">
          <section className="px-4">
            <Map
              position={[35.72021225108499, 51.42222691580869]}
              center={[35.72021225108499, 51.42222691580869]}
            >
              <span> فروشگاه ما</span>
              <h3>آدرس فروشگاه حضوری قهوه ست (شعبه جم)</h3>
              <p>
                تهران – خ کریمخان زند – خ قائم مقام فراهانی – ابتدای خ فجر(جم) –
                شماره ۱۰
              </p>
              <p>021-88305827</p>
              <Link href="/about-us">درباره فروشگاه</Link>
            </Map>
          </section>
{/* 
          <section>
            <Map
              position={[35.70153474690238, 51.41497422314844]}
              center={[35.70153474690238, 51.41497422314844]}
            >
              <span> فروشگاه ما</span>
              <h3>آدرس فروشگاه حضوری قهوه ست (شعبه جم)</h3>
              <p>
                تهران – خ کریمخان زند – خ قائم مقام فراهانی – ابتدای خ فجر(جم) –
                شماره ۱۰
              </p>
              <p>021-88305827</p>
              <Link href="/about-us">درباره فروشگاه</Link>
            </Map>
          </section> */}
        </main>
      </div>


      <div className={styles.container}>
        <section className="flex flex-row flex-wrap px-2">
          <div className="flex w-full md:w-1/2"> <Form />   </div>
          <div className="flex w-full md:w-1/2">    <Information />
     </div>
          </section> 
      </div>

      <Footer />
    </>
  );
};

export default page;
