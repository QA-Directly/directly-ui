import { SendHorizontal } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Header from "./Header";

// Import providers data
import { providersData } from "../utils/ProvidersData";
import Footer from "../components/Footer";

function Provider() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the provider ID from URL

  // Find provider by ID
  const provider = providersData.find((p) => p.id === Number(id));

  if (!provider) {
    return <div>Provider not found</div>;
  }
  const StarRating = ({ rating }) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className="text-xl">
            {star <= rating ? (
              <span className="text-gold">★</span>
            ) : (
              <span className="text-gold">☆</span>
            )}
          </span>
        ))}
      </div>
    );
  };
  return (
    <div className="bg-[#EDEBEB] flex flex-col justify-between">
      <Header />

      {/*  profile */}
      <div className="w-[90%] md:w-4/5 rounded-2xl border-4 flex flex-row justify-evenly items-center mt-8 p-4 md:p-8 bg-white m-auto">
        <div className="hidden w-1/4 md:flex flex-col justify-center items-center gap-2">
          <img src={provider.image} className="rounded-full w-4/5" alt="" />
          <p className="hidden md:flex bg-[#CBE9F4] w-2/3 p-1 rounded-3xl items-start mr-40 justify-center">
            {provider.verifiedId ? "Verified ID" : "Unverified"}
          </p>
        </div>
        <div className="w-full md:w-2/3 flex flex-col gap-4">
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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 justify-between items-center">
              <div className="flex flex-col gap-1">
                <h2 className="uppercase text-xs md:text-lg font-medium">
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
                  LOCATION
                </h2>
                <p className="text-xs md:text-lg font-semibold">
                  {provider.location}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row w-full justify-between gap-4 md:gap-20 pt-4 md:p-4 text-center">
            <Link
              to={`/book/${provider.id}`}
              className="w-full rounded-xl p-3 bg-[#FF851B]"
            >
              BOOK NOW
            </Link>
            <Link
              to="/dashboard/messages"
              className="w-full rounded-xl p-3 bg-[#CBE9F4]"
            >
              Send a Message
            </Link>
          </div>
        </div>
      </div>

      {/* service descriptions */}
      <div className="w-[90%] md:w-4/5 rounded-2xl flex flex-row justify-evenly items-center mt-8 p-4 md:p-8 bg-white m-auto">
        <div className="flex flex-col gap-6">
          <div className="text-black text-xl font-bold uppercase">
            Service Description
          </div>
          <div className="text-black text-sm md:text-lg font-light">
            {provider.description}
          </div>
        </div>
      </div>

      {/* Review & Gallery */}
      <div className="w-[90%] border-2 md:w-4/5 flex flex-col-reverse md:flex-row bg-[#edebeb] mt-8 rounded-2xl justify-between gap-12 items-start m-auto">
        <div className="w-1/3 bg-white rounded-2xl pb-4 mb-12 ">
          <div className="w-full bg-[#86dfff] rounded-t-2xl p-4 text-[#001f3f] text-center font-bold text-xl">
            Reviews
          </div>
          <div className="flex flex-col p-4">
            <div className="flex flex-col">
              {provider.reviews.map((review, index) => (
                <div
                  key={index}
                  className="flex flex-col border-b border-gray-200 py-3"
                >
                  <div className="flex justify-between items-center mb-1">
                    <h2 className="font-semibold text-lg">{review.name}</h2>
                    <StarRating rating={review.rating} />
                  </div>
                  <p className="text-gray-700">{review.text}</p>
                </div>
              ))}
            </div>
            <button className="text-[#001f3f] underline text-center mt-4">
              View more reviews
            </button>
            <div className="w-full flex items-center relative mt-8">
              <input
                type="text"
                placeholder="Leave a review"
                className="w-full outline-none rounded-lg p-2 bg-[#edebeb] pr-12"
              />
              <button className="absolute right-3 text-gold">
                <SendHorizontal size={20} />
              </button>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[60%] bg-white rounded-2xl pb-4 mb-12">
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
      <Footer />
    </div>
  );
}

export default Provider;
