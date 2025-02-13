import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import wellness from "../assets/services/directl1.png";
import cleaning from "../assets/services/directly2.png";
import ict from "../assets/services/directly3.png";

const ServiceSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);

  // Update slides per view based on window size
  useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(window.innerWidth < 768 ? 1 : 3);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const services = [
    {
      title: "Health & Beauty",
      image: wellness,
      description: "Professional beauty and wellness services",
    },
    {
      title: "Cleaning Services",
      image: cleaning,
      description: "Expert cleaning solutions",
    },
    {
      title: "Computer & IT Services",
      image: ict,
      description: "Technical support and repairs",
    },
    // Add more services as needed
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + slidesPerView;
      console.log("Current Slide", currentIndex);
      console.log("Next Slide", nextIndex);
      console.log(" Slides per view", slidesPerView);

      return nextIndex >= services.length ? prevIndex : nextIndex;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex - slidesPerView);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(${
                -currentIndex * (100 / slidesPerView)
              }%)`,
              width: `${(services.length / slidesPerView) * 100}%`,
            }}
          >
            {services.map((service, index) => (
              <div
                key={index}
                className="px-3"
                style={{ width: `${100 / slidesPerView}%` }}
              >
                <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="relative aspect-square">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 bg-white">
                    <h3 className="font-semibold text-lg">{service.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={prevSlide}
            className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50 disabled:opacity-50"
            disabled={currentIndex === 0}
            aria-label="Previous slides"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50 disabled:opacity-50"
            disabled={currentIndex >= services.length - slidesPerView}
            aria-label="Next slides"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceSlider;
