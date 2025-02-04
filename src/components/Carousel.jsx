import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

export default function Carousel() {
  const slides = [
    { image: "/carousel/fashion.png", occupation: "Fashion Designer" },
    { image: "/carousel/makeUp.png", occupation: "Make Up Artist" },
    { image: "/carousel/plumber.png", occupation: "Plumber " },
    { image: "/carousel/interior.png", occupation: "Interior Designer " },
  ];
  return (
    <Swiper
      slidesPerView={1}
      modules={[Navigation, Autoplay]}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      navigation
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div>
            <img
              src={slide.image}
              alt=""
              className="h-2/3 w-full rounded-t-lg"
            />
            <p className="bg-[#001F3F] p-2 text-center rounded-b-lg text-white">
              {slide.occupation}
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
