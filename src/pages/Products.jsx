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
} from "lucide-react";

import { Link } from "react-router-dom";
import Footer from "../components/Footer";

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
  const servicesProviders = [
    {
      name: "John Doe",
      service: "Barber",
      starRating: 2.8,
      image: "https://example.com/images/john_doe.jpg",
    },
    {
      name: "Emily Smith",
      service: "Driver",
      starRating: 4.6,
      image: "https://example.com/images/emily_smith.jpg",
    },
    {
      name: "Michael Brown",
      service: "Personal Trainer",
      starRating: 4.9,
      image: "https://example.com/images/michael_brown.jpg",
    },
    {
      name: "Sophia Johnson",
      service: "Childcare",
      starRating: 4.7,
      image: "https://example.com/images/sophia_johnson.jpg",
    },
    {
      name: "Daniel Lee",
      service: "Gardener",
      starRating: 4.5,
      image: "https://example.com/images/daniel_lee.jpg",
    },
    {
      name: "Olivia Martinez",
      service: "House Cleaner",
      starRating: 4.8,
      image: "https://example.com/images/olivia_martinez.jpg",
    },
    {
      name: "Liam Wilson",
      service: "DJ",
      starRating: 4.9,
      image: "https://example.com/images/liam_wilson.jpg",
    },
    {
      name: "Emma Davis",
      service: "Makeup Artist",
      starRating: 4.6,
      image: "https://example.com/images/emma_davis.jpg",
    },
    {
      name: "Noah Taylor",
      service: "IT Specialist",
      starRating: 4.7,
      image: "https://example.com/images/noah_taylor.jpg",
    },
    {
      name: "Ava Harris",
      service: "Fitness Coach",
      starRating: 4.8,
      image: "https://example.com/images/ava_harris.jpg",
    },
  ];
  const renderStars = (rating) => {
    const fullStar = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStar; i++) {
      stars.push(<Star key={i} stroke="none" size={20} fill="orange" />);
    }
    console.log(stars);
    if (halfStar) {
      stars.push(<StarHalf key="half" stroke="none" size={20} fill="orange" />);
    }
    return stars;
  };
  return (
    <div className="bg-[#EDEBEB] flex flex-col justify-between">
      <header className="bg-[#001F3F] roboto w-full py-2 md:py-5 px-2 md:px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row">
            <img
              src="./directlyicon.png"
              className="w-8 h-8 md:w-16 md:h-16 "
              alt=""
            />
            <img
              src="./directlyname.png"
              className="md:ml-4 w-[50%] md:w-full"
              alt=""
            />
          </div>
          <img src="./menu.svg" className="md:hidden" alt="" />
        </div>
        <div className="w-1/3  flex flex-row justify-between items-center md:px-4  rounded-full">
          <input
            type="text"
            placeholder="I am looking for ..."
            className="bg-[#CBE9F4] w-full p-2 px-4 rounded-l-2xl outline-none"
          />
          <div className="flex flex-row justify-between items-center  ">
            <div className="bg-[#CBE9F4] text-[#001F3F] p-2 md:px-4 rounded-r-2xl ">
              <Search />
            </div>
          </div>
        </div>
        <div className="hidden w-[35%] md:flex flex-row justify-between items-center px-10 ">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-4 md:mb-0">
            <Link
              to="/profile"
              className="text-[#CBE9F4] hover:text-[#FF851B] text-lg md:text-xl font-bold"
            >
              <User />
            </Link>
            <Link
              to="/profile"
              className="text-[#CBE9F4] hover:text-[#FF851B] text-lg md:text-xl font-bold"
            >
              <Heart />
            </Link>
            <Link
              to="/profile"
              className="text-[#CBE9F4] hover:text-[#FF851B] text-lg md:text-xl font-bold"
            >
              <Bell />
            </Link>
            <Link
              to="/profile"
              className="text-[#CBE9F4] hover:text-[#FF851B] text-lg md:text-xl font-bold"
            >
              <MessageCircle />
            </Link>
          </div>
          <button className="bg-[#FF851B] text-[#001F3F] font-bold p-2 md:px-4 rounded-lg ">
            Provide a service
          </button>
        </div>
      </header>
      <div className=" bg-white flex flex-row justify-center items-center gap-14 p-2 md:p-8 ">
        <div className="hidden md:flex relative top-16 right-10">
          <img src="./leftLine.svg" className="w-10rem" alt="" />
        </div>
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
          <div className="flex flex-row justify-between items-center gap-2 md:gap-4  ">
            <p className="text-sm md:text-xl font-medium">
              Find Service Providers in
            </p>
            <button className="flex flex-row justify-center items-center md:gap-2 bg-[#001F3F] text-white text-sm font-medium md:text-base p-1 md:px-4 rounded-xl">
              <MapPin size={15} /> NIGERIA
            </button>
          </div>
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
        <div className="hidden md:flex relative bottom-24 left-8">
          <img src="./rightLine.svg" alt="" />
        </div>
      </div>
      <div className="flex flex-row gap-8 p-8">
        <div className="w-1/4 bg-white p-4 rounded-lg flex flex-col justify-between">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex flex-row gap-6 items-center text-sm hover:text-[#FF851B] font-medium"
            >
              <category.icon />
              <p className="">{category.name}</p>
            </div>
          ))}
        </div>
        <div className="w-1/2">
          <img
            src="./heroImage.png"
            alt=""
            className="h-2/3 w-full rounded-t-lg"
          />
          <p className="bg-[#001F3F] p-2 text-center rounded-b-lg text-white">
            Fashion Designer
          </p>
        </div>
        <div className="w-1/5 flex flex-col justify-between items-center gap-8">
          <div className="w-[80%] h-1/2 bg-[#CBE9F4] rounded-lg p-2 text-center flex flex-col justify-around shadow-md">
            <p className="text-2xl font-bold">How to use Directly ?</p>
            <p>Follow these steps</p>
            <Link>View more</Link>
          </div>
          <div className="w-[80%] h-1/2 bg-[#FF851B] pt-4 p-2 rounded-lg border-2 flex flex-col justify-around shadow-md">
            <p className="text-xl text-white font-bold text-center">
              Want to provide a service
            </p>
            <div className="w-16 h-16 rounded-full bg-white flex justify-center items-center m-auto">
              <Plus size={40} color="#FF851B" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col p-8">
        <div className="w-full flex flex-row justify-between items-center m-auto bg-[#86DFFF] px-8 py-2 rounded-t-lg">
          <h2 className="text-xl font-medium">Trending Service Providers</h2>
          <Link>See all</Link>
        </div>
        <div className="bg-white grid grid-cols-4 justify-between items-center m-auto gap-20 px-8 rounded-b-lg shadow-md p-8 py-12">
          {servicesProviders.map((serviceProvider, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 shadow-sm hover:shadow-md p-4 rounded-lg"
            >
              <img src="./heroImage.png" />
              <p className="font-bold text-xl">{serviceProvider.name}</p>
              <p>{serviceProvider.service}</p>
              <div className="flex flex-col  items-start gap-4">
                <div className="w-full flex flex-row justify-between gap-1">
                  <div className="flex flex-row gap-1">
                    {renderStars(serviceProvider.starRating)}
                  </div>
                  <p className="text-sm">{serviceProvider.starRating} rating</p>
                </div>
                <button className="bg-[#001F3F] text-white py-1 px-4 rounded-lg">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Products;
