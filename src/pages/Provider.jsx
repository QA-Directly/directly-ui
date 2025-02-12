import {
  Bell,
  Heart,
  MessageCircle,
  User,
  Search,
  LogOut,
  Menu,
  X,
  SendHorizontal,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import { useProvider } from "../Contexts/ProviderContext";
import { useState } from "react";
import Header from "../components/Header";

function Provider() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams(); // Get the provider ID from URL
  const { getProviderById } = useProvider();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Get provider data
  const provider = getProviderById(Number(id));

  if (!provider) {
    return <div>Provider not found</div>;
  }

  // handle menu toggle (mobile)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // handle logout
  const handleLogOut = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="bg-[#EDEBEB] flex flex-col justify-between">
      <Header />

      {/*  profile*/}
      <div className="w-[90%] md:w-4/5 rounded-2xl border-4 flex flex-row justify-evenly items-center mt-8 p-4 md:p-8 bg-white m-auto">
        <div className="hidden w-1/4 md:flex flex-col justify-center items-center gap-2">
          <img src={provider.image} className="rounded-full w-4/5" alt="" />
          <p className="hidden md:flex bg-[#CBE9F4] w-2/3 p-1 rounded-3xl items-start mr-40 justify-center ">
            {provider.verifiedId ? "Verified ID" : "Unverified"}
          </p>
        </div>
        <div className="w-full md:w-2/3 flex flex-col gap-4 ">
          <div className="flex flex-row justify-between items-center">
            <img
              src={provider.image}
              className="flex md:hidden rounded-full w-1/3"
              alt=""
            />
            <h2 className="text-lg md:text-3xl font-bold">{provider.name}</h2>
            <div className="flex md:hidden bg-[#CBE9F4] h-6 p-2 rounded-xl text-xs justify-center items-center">
              {provider.verifiedId ? "Verified ID" : "Unverified"}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 justify-between items-center ">
              <div className="flex flex-col gap-1">
                <h2 className="uppercase  text-xs md:text-lg font-medium ">
                  Service Category
                </h2>
                <p className="text-xs md:text-lg font-semibold">
                  {provider.service}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="uppercase text-xs md:text-lg font-medium">
                  PHONE NUMBER
                </h2>
                <p className="text-xs md:text-lg font-semibold">
                  {provider.phone}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="uppercase text-xs md:text-lg font-medium">
                  EMAIL ADDRESS
                </h2>
                <p className="text-xs md:text-lg font-semibold">
                  {provider.email}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="uppercase text-xs md:text-lg font-medium">
                  LOCATION{" "}
                </h2>
                <p className="text-xs md:text-lg font-semibold">
                  {provider.location}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row w-full justify-between gap-4 md:gap-20 pt-4  md:p-4">
            <button className="w-full rounded-xl p-3 bg-[#FF851B]">
              BOOK NOW
            </button>
            <button className="w-full rounded-xl p-3 bg-[#CBE9F4]">
              Send a Message
            </button>
          </div>
        </div>
      </div>

      {/* service descriptions */}
      <div className="w-[90%] md:w-4/5 rounded-2xl flex flex-row justify-evenly items-center mt-8 p-4 md:p-8 bg-white m-auto">
        <div className="flex flex-col gap-6">
          <div className=" text-black text-xl font-bold uppercase">
            Service Description
          </div>
          <div className=" text-black text-sm md:text-lg font-light ">
            {provider.description}
          </div>
        </div>
      </div>

      {/* Review & Gallery */}
      <div className="w-[90%] border-2 md:w-4/5 flex flex-col-reverse md:flex-row bg-[#edebeb] mt-8  rounded-2xl justify-between gap-12 items-start m-auto">
        <div className=" bg-white rounded-2xl  pb-4 mb-12">
          <div className="w-full bg-[#86dfff] rounded-t-2xl p-4 text-[#001f3f] text-center font-bold text-xl">
            Reviews
          </div>
          <div className="flex flex-col  gap-40 p-2">
            <div className="h-full flex flex-col justify-between items-center">
              {provider.reviews.map((review, index) => (
                <div key={index} className="flex flex-col border-b-2 p-2 gap-4">
                  <div className="flex flex-row justify-between items-center">
                    <h2 className="font-bold text-xl">{review.name}</h2>
                    <p>{review.rating} stars</p>
                  </div>
                  <p>{review.text}</p>
                </div>
              ))}
              <p className="underline mt-4 text-[#001f3f]">View more reviews</p>
            </div>
            <div className="w-full flex justify-center m-auto px-4">
              <input
                type="text"
                placeholder="Leave a review"
                className="w-full m-auto outline-none rounded-lg p-2 bg-[#edebeb] shadow-md"
              />
              <div className="relative right-10 top-2 text-[#ff851b]">
                <SendHorizontal />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[60%] bg-white rounded-2xl pb-4">
          <div className="bg-[#001f3f] rounded-t-2xl p-4 text-white text-center font-bold text-xl">
            Gallery
          </div>
          <div className="w-full p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 place-items-center">
              {provider.gallery.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt=""
                  className="w-full max-w-[256px] h-64 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Provider;
