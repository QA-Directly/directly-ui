import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import { useProvider } from "../Contexts/ProviderContext";
import { useEffect } from "react";

export default function Carousel() {
  const { providers } = useProvider();

  // Filter out providers without mediaFiles
  const providersWithMedia = providers.filter(
    (provider) => provider.mediaFiles && provider.mediaFiles.length > 0
  );


  return (
    <Swiper
      slidesPerView={1}
      modules={[Navigation, Autoplay]}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      navigation
    >
      {providersWithMedia.map((provider) => (
        <SwiperSlide key={provider._id}>
          <Link to={`/provider/${provider._id}`} className="block">
            <div className="flex flex-col justify-start  rounded-lg">
              <div className="h-96 w-full">
                <img
                  src={provider.mediaFiles[0]}
                  alt={`${provider.businessName || "Business"} workspace`}
                  className="w-full h-full object-cover rounded-t-lg"
                  onError={(e) => {
                    e.target.src = "/api/placeholder/400/300";
                  }}
                />
              </div>
              <p className="bg-primary py-3 text-center rounded-b-lg text-white">
                {
                  provider.category ||
                  "Service Provider"}
              </p>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
