import {
  Bell,
  Heart,
  MessageCircle,
  User,
  Search,
  MapPin,
  SlidersVertical,
  Scissors,
  Car,
  Baby,
  BookOpen,
  Hammer,
  Leaf,
  Monitor,
  Music,
  Dumbbell,
  Plus,
  Star,
  StarHalf,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import { Link, NavLink, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useAuth } from "../Contexts/AuthContext";
import { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import Header from "../assets/Header";
import { useProvider } from "../Contexts/ProviderContext";
import placeholder from "../assets/occupations/baber.png";

// import images

const Products = () => {
  const categories = [
    { name: "Health & Beauty Services", icon: Heart },
    { name: "Building & Trade Services", icon: Scissors },
    { name: "Chauffeur & Airport Transfer Services", icon: Car },
    { name: "Childcare Services", icon: Baby },
    { name: "Educational Services", icon: BookOpen },
    { name: "Cleaning Services", icon: Hammer },
    { name: "Landscaping & Gardening Services", icon: Leaf },
    { name: "Computer & IT Services", icon: Monitor },
    { name: "DJ & Entertainment Services", icon: Music },
    { name: "Fitness & Personal Training Services", icon: Dumbbell },
  ];

  // get data from context
  const { providers, loading, error } = useProvider();
  useEffect(() => {
    console.log("Retrieved Providers: ", providers);
  }, [providers]);
  // render stars
  const renderStars = (rating) => {
    const fullStar = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStar; i++) {
      stars.push(<Star key={i} stroke="none" size={20} fill="orange" />);
    }

    if (halfStar) {
      stars.push(<StarHalf key="half" stroke="none" size={20} fill="orange" />);
    }
    return stars;
  };
  // loading

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF851B]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Error loading providers: {error}
      </div>
    );
  }

  return (
    <div className="bg-[#EDEBEB] flex flex-col justify-between">
      {/* Header */}
      <Header />

      {/* Existing Hero Section */}
      <div className=" bg-white flex flex-row justify-center items-center gap-14 p-2 md:p-8">
        {/* Left img (hidden on mobile) */}
        <div className="hidden md:flex relative top-8 right-10">
          <img src="./leftLine.svg" className="w-10rem" alt="" />
        </div>
        {/* Hero Content */}
        <div className="flex flex-col justify-center items-center gap-8 md:gap-14 p-2 md:p-8 md:mt-4">
          <div className="flex flex-col justify-center items-center gap-4 ">
            <h2 className="text-xl text-center md:text-4xl font-bold">
              Your Path to Seamless Solutions
            </h2>
            <p className="text-center font-normal text-sm md:text-lg">
              Connecting you to what matters most. Connecting people ready to
              work with people who need work done
            </p>
          </div>
          {/* Location and search */}
          <div className="flex flex-row justify-between items-center gap-2 md:gap-4  ">
            <p className="text-sm md:text-xl font-medium">
              Find Service Providers in
            </p>
            <button className="flex flex-row justify-center items-center md:gap-2 bg-[#001F3F] text-white text-sm font-medium md:text-base p-1 md:px-4 rounded-xl">
              <MapPin size={15} /> NIGERIA
            </button>
          </div>
          {/* Search Input */}
          <div className=" w-full flex flex-row justify-between items-center md:px-4 rounded-2xl">
            <input
              type="text"
              placeholder="I am looking for ..."
              className="bg-[#CBE9F4] w-full p-2 px-4 rounded-l-2xl outline-none"
            />
            <div className="flex flex-row justify-between items-center  ">
              <div className="bg-[#CBE9F4] hover:opacity-60 text-[#001F3F] p-2 md:px-4">
                <SlidersVertical />
              </div>
              <div className="bg-[#FF851B] hover:bg-[#001F3F] text-white p-2 md:px-4 rounded-r-2xl ">
                <Search />
              </div>
            </div>
          </div>
        </div>
        {/* Right img (hidden on mobile) */}
        <div className="hidden md:flex relative bottom-16 left-8">
          <img src="./rightLine.svg" alt="" />
        </div>
      </div>

      {/* Categories and Carousel */}
      <div className="flex flex-col md:flex-row gap-8 p-4 md:p-8">
        {/* Categories List */}
        <div className="w-full md:w-1/4 bg-white p-4 rounded-lg flex flex-col gap-4 justify-between">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex flex-row text-sm gap-4 md:gap-6 items-center hover:text-[#FF851B] font-medium"
            >
              <category.icon />
              <p className="">{category.name}</p>
            </div>
          ))}
        </div>
        {/* Carousel */}
        <div className="flex justify-center items-center m-auto w-full md:w-1/2">
          <Carousel />
        </div>

        {/* How to use/Provide service boxes */}
        <div className=" flex  flex-col justify-between items-center gap-8">
          <div className="w-full md:w-[80%] h-1/2 bg-[#CBE9F4] pb-2 rounded-lg p-2 text-center flex flex-col justify-around shadow-md">
            <p className="text-2xl font-bold">How to use Directly ?</p>
            <p>Follow these steps</p>
            <NavLink>View more</NavLink>
          </div>
          <div className="w-full md:w-[80%] h-1/2 bg-[#FF851B] pt-4 p-2 rounded-lg  flex flex-col justify-around shadow-md">
            <p className="text-2xl text-white font-bold text-center">
              Want to provide a service
            </p>
            <div className="w-16 h-16 rounded-full bg-white flex justify-center items-center m-auto">
              <Plus size={40} color="#FF851B" />
            </div>
          </div>
        </div>
      </div>

      {/* Trending Service Providers */}
      <div className="w-full flex flex-col md:p-8">
        {/* Header */}
        <div className="w-full flex flex-row justify-between items-between m-auto bg-[#86DFFF] px-4 md:px-8 py-2 rounded-t-lg">
          <h2 className=" text-xs md:text-xl font-normal md:font-medium">
            Trending Service Providers
          </h2>
          <NavLink className="text-xs ">See all</NavLink>
        </div>
        {/* Providers Grid */}
        <div className="bg-white grid grid-cols-1 md:grid-cols-4 justify-between items-center m-auto gap-10 md:gap-20 px-2 md:px-8 rounded-b-lg shadow-md py-8 md:py-12">
          {providers.map((serviceProvider) => (
            <Link
              to={`/provider/${serviceProvider._id}`}
              key={serviceProvider._id}
              className="w-full h-full border flex flex-col justify-between gap-2 shadow-sm hover:shadow-md p-2 pb-4 md:p-4 rounded-lg"
            >
              {serviceProvider.mediaFiles ? (
                <img
                  src={serviceProvider.mediaFiles[0]}
                  className="w-full h-56 rounded-lg"
                />
              ) : (
                <img src={placeholder} className="w-full h-56 rounded-lg" />
              )}
              <p className="font-bold text-xl">
                {serviceProvider.businessName}
              </p>
              <p>{serviceProvider.service}</p>
              <div className="flex flex-col items-start gap-4">
                {serviceProvider.reviews.map((review, index) => (
                  <div key={index} className="flex flex-row gap-1">
                    {renderStars(review.rating)}
                    <p className="text-sm">{review.rating} rating</p>
                  </div>
                ))}
                <Link
                  to={`/book/${serviceProvider._id}`}
                  className="bg-[#001F3F] text-white py-2 px-4 rounded-lg"
                >
                  Book Now
                </Link>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Products;
