"use client";
import Product from "@/components/modules/product/Product";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";

const MoreProducts = ({relateProduct}) => {
  return (
    <div data-aos="fade-right" className="w-full">
      <section>
        <h2>محصولات مرتبط</h2>
        <div
          style={{
            height: "2px",
            width: "70px",
            background: "black",
            marginTop: "10px",
          }}>

          </div>
      </section>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        dir="rtl"
        rewind={true}
        autoplay={{ delay: 1500, disableOnInteraction: false }}
        loop={true}
        navigation={true}
        modules={[Navigation, Autoplay]}
        className="mySwiper articles_slider"
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 20
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 2,
            spaceBetween: 1
          },
          // when window width is >= 640px
          640: {
            slidesPerView: 3,
            spaceBetween: 20
          },
          720:{
            slidesPerView: 4,
            spaceBetween: 20
          }
        }
      }
      >

{
  relateProduct.map(product => (
  
   <SwiperSlide key={product._id}>
          <Product {...product} />
        </SwiperSlide>
        
        
        
  ))
}

     
     </Swiper>
    </div>
  );
};

export default MoreProducts;
