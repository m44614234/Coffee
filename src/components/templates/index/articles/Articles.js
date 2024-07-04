"use client";
import styles from "./articles.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import Article from "./Article";

const Articles = ({blogs}) => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>مقالات ما</p>
      <span className={styles.description}>دانستنی های جذاب دنیای قهوه</span>
      <main>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          dir="rtl"
          autoplay={{ delay: 1500, disableOnInteraction: false }}
          //   rewind={true}
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
            }
          }
        }
          // when window width is >= 320px}
        >
         

          {blogs.map((blog) => (
            <SwiperSlide key={blog.id}>
              <Article
                title={blog.title}
                img={blog.img}
                comments={blog.comments}
                date={blog.createdAt}
                _id={blog._id}
                userName={blog.user?.name || "کاربر"  }
              />
            </SwiperSlide>
          ))}
         
        </Swiper>
      </main>
    </div>
  );
};

export default Articles;
