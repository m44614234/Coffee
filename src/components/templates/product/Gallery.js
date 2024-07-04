"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useState } from "react";

const Gallery = ({productImage}) => {
  console.log("productImage =>", productImage);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  // const images = [
  //   "https://set-coffee.com/wp-content/uploads/2020/12/Gold-DG-700x700.jpg",
  //   "https://set-coffee.com/wp-content/uploads/2020/12/Gold-box-DG--150x150.jpg",
  // ];

  return (
    <section className="w-full my-auto md:w-1/3 ">
      {/* <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 gallery-slider"
      >
        {images.map((img) => (
          <SwiperSlide>
            <img src={img} />
          </SwiperSlide>
        ))}
      </Swiper> */}

      {/* <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="gallery-slider-2"
      >
        {images.map((img) => (
          <SwiperSlide key={Math.random()}>
            <img src={img} />
          </SwiperSlide>
        ))}
      </Swiper> */}

      <img src={productImage} />
    </section>
  );
};

export default Gallery;
