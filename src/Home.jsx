import {
  Facebook,
  FacebookIcon,
  MapPin,
  Search,
  SlidersVertical,
} from "lucide-react";
import { Link } from "react-router-dom";
import Slider from "./components/Slider";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";

const Home = () => {
  return (
    <div className="bg-[#EDEBEB] flex flex-col justify-between">
      <header className="bg-[#001F3F] roboto w-full py-5 px-8 flex flex-row justify-between items-center">
        <div className="flex flex-row justify-between items-center">
          <img src="./directlyicon.png" className="w-16 h-16" alt="" />
          <img src="./directlyname.png" className="" alt="" />
        </div>
        <div className="flex flex-row justify-between items-center gap-10">
          <Link to="/about" className="text-white">
            About Us
          </Link>
          <Link to="/services" className="text-white">
            Services
          </Link>
          <Link to="/how-it-works" className="text-white">
            How it Works
          </Link>
          <Link to="/blogs" className="text-white">
            Blogs
          </Link>
        </div>
        <div className="flex flex-row justify-between items-center gap-10">
          <Link
            to="/signin"
            className="text-white hover:text-[#FF851B] text-md font-bold"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="text-[#001F3F] bg-[#FF851B] hover:bg-[#fff] rounded-lg w-40 p-2 text-md font-bold text-center"
          >
            Sign Up
          </Link>
        </div>
      </header>
      <div className="bg-white flex flex-row justify-center items-center gap-14 p-8 ">
        <div className="relative top-16 right-10">
          <img src="./leftLine.svg" className="w-10rem" alt="" />
        </div>
        <div className="flex flex-col justify-center items-center gap-14 p-8 mt-4">
          <div className="flex flex-col justify-center items-center gap-4 ">
            <h2 className="text-4xl font-bold">
              Your Path to Seamless Solutions
            </h2>
            <p className="text-center font-normal text-lg">
              Connecting you to what matters most. Connecting people ready to
              work with people who need work done
            </p>
          </div>
          <div className="flex flex-row justify-center items-center gap-4 ">
            <p className="text-xl font-medium">Find Service Providers in</p>
            <button className="flex flex-row justify-center items-center gap-2 bg-[#001F3F] text-white p-2 px-4 rounded-lg">
              <MapPin /> NIGERIA
            </button>
          </div>
          <div className=" w-full flex flex-row justify-between items-center px-4 rounded-2xl">
            <input
              type="text"
              placeholder="I am looking for ..."
              className="bg-[#CBE9F4] w-full p-2 px-4 rounded-l-2xl"
            />
            <div className="flex flex-row justify-between items-center  ">
              <div className="bg-[#CBE9F4] hover:opacity-60 text-[#001F3F] p-2 px-4">
                <SlidersVertical />
              </div>
              <div className="bg-[#FF851B] hover:bg-[#001F3F] text-white p-2 px-4 rounded-r-2xl ">
                <Search />
              </div>
            </div>
          </div>
        </div>
        <div className="relative bottom-24 left-8">
          <img src="./rightLine.svg" alt="" />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="w-[90%] flex flex-col justify-center items-center gap-14 p-8">
          <p className="text-[#001F3F]  text-center w-3/4 text-lg">
            Our platform connects you with trusted professionals, ensuring
            quality and reliability. We offer a seamless experience with a
            user-friendly interface and a simple booking process. Your
            satisfaction is our priority.
          </p>
          <div className="flex flex-row justify-center items-center gap-8 text-center ">
            <div className="flex flex-col justify-center items-center gap-4  bg-white rounded-lg p-4 py-8">
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
          <h2 className="text-4xl font-bold">EXPLORE OUR SERVICE CATEGORIES</h2>
          <p>
            Connecting you to skilled professionals for your home and personal
            needs
          </p>
        </div>
        <Slider />
      </div>

      <div className="bg-white my-20 ">
        <div className="w-full flex flex-col justify-between items-center m-auto">
          <div className="flex flex-row justify-between items-center gap-4 px-8">
            <div className="flex flex-col justify-between items-base gap-4">
              <h2 className="text-[#001F3F] text-2xl font-bold">
                Need a Service Provider?
              </h2>
              <p>Sign up today to connect with trusted service provider</p>
              <button className="bg-[#FF851B] text-[#001F3F] p-2 rounded-lg font-bold w-40">
                Sign Up
              </button>
            </div>
            <div className="w-1/2 h-1/2 p-8">
              <img src="./directly4.png" className="w-full" alt="" />
            </div>
          </div>
        </div>
      </div>
      <footer className="flex flex-col p-8 py-16 bg-[#001F3F] text-white justify-center items-center">
        <div className="w-[90%] flex flex-row justify-between items-center mb-10">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-center items-center">
              <img src="./directlyicon.png" alt="" />
              <img
                src="./directlyname.png"
                className="w-[60%] h-[20%]"
                alt=""
              />
            </div>
            <p>hellodirectly@outlook.com</p>
            <p>+234 812 390 5432</p>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold text-[#CBE9F4] mb-2">Company</h2>
            <Link to="/about">About Us</Link>
            <Link to="/blogs">Blogs</Link>
            <Link to="/careers">Careers</Link>
            <Link to="/pricing">Pricing</Link>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold text-[#CBE9F4] mb-2">Resources</h2>
            <Link to="/about">Documentation</Link>
            <Link to="/blogs">Service Center</Link>
            <Link to="/careers">Safety Tips</Link>
            <Link to="/pricing">Free Demo</Link>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold text-[#CBE9F4] mb-2">Legal</h2>
            <Link to="/about">Terms & Conditions</Link>
            <Link to="/blogs">Billing Policy</Link>
            <Link to="/careers">Refund Policy</Link>
            <Link to="/pricing">Privacy Policy</Link>
          </div>
        </div>
        <img src="./Line.png" alt="" />
        <div className="flex flex-row justify-between items-center w-[90%] mt-4">
          <div>
            <p className="text-[#FF851B]">
              &copy; 2024 Directly. All rights reserved{" "}
            </p>
          </div>
          <div className="flex flex-row justify-center items-center gap-4">
            <FaFacebook />
            <FaXTwitter />
            <FaLinkedin />
            <FaInstagram />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
