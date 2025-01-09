// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Slider = () => {
  let slides = [
    { img: "./services/directl1.png", title: "Health & Beauty" },
    { img: "./services/directly2.png", title: "Cleaning service" },
    { img: "./services/directly3.png", title: "Computer & IT" },
    { img: "./services/directl1.png", title: "Health & Beauty" },
    { img: "./services/directly2.png", title: "Cleaning service" },
    { img: "./services/directly3.png", title: "Computer & IT" },
  ];
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true, enabled: true }}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      className="w-5/6"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <img src={slide.img} className="w-80 h-80" alt={slide.title} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default Slider;
