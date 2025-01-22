import { MapPin, Search, SlidersVertical } from "lucide-react";
import { Link } from "react-router-dom";
import Slider from "../components/Slider";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";
import { Menu, X } from "lucide-react";
import Footer from "../components/Footer";
import { useState } from "react";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // handle menu toggle (mobile)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-[#EDEBEB] flex flex-col justify-between">
      <header className="bg-[#001F3F] w-full py-4 px-4">
        <div className="flex flex-col w-full gap-4">
          <div className="flex items-center justify-between gap-4 ">
            {/* Logo container */}
            <div className="flex items-center gap-2 ">
              <img
                src="./directlyicon.png"
                className="w-8 h-8 md:w-12 md:h-12"
                alt="Directly Icon"
              />
              <img
                src="./directlyname.png"
                className="w-32 md:w-40"
                alt="Directly Name"
              />
            </div>

            {/* Search bar - desktop only */}
            <div className="hidden md:flex w-1/3 ">
              <SearchBar />
            </div>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center gap-6 ">
              <nav className="flex items-center gap-8">
                <Link to="/about" className="text-white hover:text-[#FF851B]">
                  About Us
                </Link>
                <Link
                  to="/services"
                  className="text-white hover:text-[#FF851B]"
                >
                  Services
                </Link>
                <Link
                  to="/how-it-works"
                  className="text-white hover:text-[#FF851B]"
                >
                  How it Works
                </Link>
                <Link to="/blogs" className="text-white hover:text-[#FF851B]">
                  Blogs
                </Link>
              </nav>
              <div className="flex items-center gap-4">
                <Link
                  to="/signin"
                  className="text-white hover:text-[#FF851B] font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-[#FF851B] text-[#001F3F] px-6 py-2 rounded-lg hover:bg-[#ff9642] transition-colors font-medium"
                >
                  Sign Up
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-white hover:text-[#FF851B] transition-colors"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile menu */}
          <div
            className={`md:hidden transition-all duration-300 ease-in-out ${
              isMenuOpen
                ? "max-h-[32rem] opacity-100"
                : "max-h-0 opacity-0 overflow-hidden"
            }`}
          >
            {/* Search bar - mobile only */}
            <div className="py-4">
              <SearchBar />
            </div>

            <nav className="flex flex-col gap-4 py-4">
              <Link to="/about" className="text-white hover:text-[#FF851B]">
                About Us
              </Link>
              <Link to="/services" className="text-white hover:text-[#FF851B]">
                Services
              </Link>
              <Link
                to="/how-it-works"
                className="text-white hover:text-[#FF851B]"
              >
                How it Works
              </Link>
              <Link to="/blogs" className="text-white hover:text-[#FF851B]">
                Blogs
              </Link>
            </nav>
            <div className="flex flex-col gap-4 py-4">
              <Link
                to="/signin"
                className="text-white hover:text-[#FF851B] text-center font-medium"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-[#FF851B] text-[#001F3F] py-2 rounded-lg hover:bg-[#ff9642] transition-colors text-center font-medium"
              >
                Sign Up
              </Link>
            </div>
          </div>
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
              className="bg-[#CBE9F4] w-full p-2 px-4 rounded-l-2xl"
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
      <div className="flex flex-col justify-center items-center">
        <div className="md:w-[90%] flex flex-col justify-center items-center gap-14 p-4 py-8 md:p-8">
          <p className="text-[#001F3F]  text-center w-full md:w-3/4 text-base md:text-lg">
            Our platform connects you with trusted professionals, ensuring
            quality and reliability. We offer a seamless experience with a
            user-friendly interface and a simple booking process. Your
            satisfaction is our priority.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-center ">
            <div className="flex flex-col justify-center items-center gap-4  bg-white rounded-lg p-2 md:py-8">
              <img
                src="./clean.svg"
                className="bg-[#001F3F] p-2 rounded-full w-8 h-8"
                alt=""
              />
              <p className="text-xl font-medium">200+ Services</p>
              <p>
                Lorem ipsum dolor sit amet consectetur. Nisi diam et odio
                pellentesque. Purus consectetur non tincidunt odio lectus. Amet
              </p>
            </div>
            <div className="flex flex-col justify-center items-center gap-4  bg-white rounded-lg p-4 py-8">
              <img
                src="./users.svg"
                className="bg-[#001F3F] p-2 rounded-full w-8 h-8"
                alt=""
              />
              <p className="text-xl font-medium">1500+ Service Providers</p>
              <p>
                Lorem ipsum dolor sit amet consectetur. Nisi diam et odio
                pellentesque. Purus consectetur non tincidunt odio lectus. Amet
              </p>
            </div>
            <div className="flex flex-col justify-center items-center gap-4  bg-white rounded-lg p-4 py-8">
              <img
                src="./happy.svg"
                className="bg-[#001F3F] p-2 rounded-full w-8 h-8"
                alt=""
              />
              <p className="text-xl font-medium">10k+ Happy customers</p>
              <p>
                Lorem ipsum dolor sit amet consectetur. Nisi diam et odio
                pellentesque. Purus consectetur non tincidunt odio lectus. Amet
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white flex flex-col justify-center items-center p-4 py-10 gap-16">
        <div className="flex flex-col justify-center items-center gap-4">
          <h2 className="text-xl text-center md:text-4xl font-bold">
            EXPLORE OUR SERVICE CATEGORIES
          </h2>
          <p className="text-center">
            Connecting you to skilled professionals for your home and personal
            needs
          </p>
        </div>
        <Slider />
      </div>

      <div className="bg-white my-20 p-4">
        <div className="w-full flex flex-col justify-between items-center m-auto">
          <div className="flex flex-row justify-between items-center gap-4 px-8">
            <div className="flex flex-col justify-between items-center gap-4 text-center">
              <h2 className="text-[#001F3F]  text-2xl font-bold">
                Need a Service Provider?
              </h2>
              <p>Sign up today to connect with trusted service provider</p>
              <Link
                to="/signup"
                className="bg-[#FF851B] text-[#001F3F] p-2 rounded-lg font-bold w-40"
              >
                Sign Up
              </Link>
            </div>
            <div className="hidden md:flex w-1/2 h-1/2 p-8">
              <img src="./directly4.png" className="w-1/4 md:w-full" alt="" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
