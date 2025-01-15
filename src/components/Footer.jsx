import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaXTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="flex flex-col p-8 py-16 bg-[#001F3F] text-white justify-center items-center">
      <div className="w-[90%] flex flex-row justify-between items-center mb-10">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-center items-center">
            <img src="./directlyicon.png" alt="" />
            <img src="./directlyname.png" className="w-[60%] h-[20%]" alt="" />
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
  );
};

export default Footer;
