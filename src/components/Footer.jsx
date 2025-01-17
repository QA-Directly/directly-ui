import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaXTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="flex flex-col p-4 md:p-8 py-8 md:py-16 bg-[#001F3F] text-white justify-center items-center">
      <div className="w-full md:w-[90%] flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-4 mb-6 md:mb-10">
        {/* Company Logo and Contact */}
        <div className="flex flex-col gap-2 w-full md:w-auto">
          <div className="flex flex-row justify-start items-center">
            <img src="./directlyicon.png" alt="Directly Icon" className="h-8 md:h-auto" />
            <img
              src="./directlyname.png"
              className="w-[60%] h-[20%]"
              alt="Directly"
            />
          </div>
          <p className="text-sm md:text-base">hellodirectly@outlook.com</p>
          <p className="text-sm md:text-base">+234 812 390 5432</p>
        </div>

        {/* Links Sections */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 w-full md:w-auto">
          {/* Company Links */}
          <div className="flex flex-col gap-2">
            <h2 className="text-base md:text-lg font-bold text-[#CBE9F4] mb-2">Company</h2>
            <Link to="/about" className="text-sm md:text-base hover:text-[#CBE9F4]">About Us</Link>
            <Link to="/blogs" className="text-sm md:text-base hover:text-[#CBE9F4]">Blogs</Link>
            <Link to="/careers" className="text-sm md:text-base hover:text-[#CBE9F4]">Careers</Link>
            <Link to="/pricing" className="text-sm md:text-base hover:text-[#CBE9F4]">Pricing</Link>
          </div>

          {/* Resources Links */}
          <div className="flex flex-col gap-2">
            <h2 className="text-base md:text-lg font-bold text-[#CBE9F4] mb-2">Resources</h2>
            <Link to="/about" className="text-sm md:text-base hover:text-[#CBE9F4]">Documentation</Link>
            <Link to="/blogs" className="text-sm md:text-base hover:text-[#CBE9F4]">Service Center</Link>
            <Link to="/careers" className="text-sm md:text-base hover:text-[#CBE9F4]">Safety Tips</Link>
            <Link to="/pricing" className="text-sm md:text-base hover:text-[#CBE9F4]">Free Demo</Link>
          </div>

          {/* Legal Links */}
          <div className="flex flex-col gap-2">
            <h2 className="text-base md:text-lg font-bold text-[#CBE9F4] mb-2">Legal</h2>
            <Link to="/about" className="text-sm md:text-base hover:text-[#CBE9F4]">Terms & Conditions</Link>
            <Link to="/blogs" className="text-sm md:text-base hover:text-[#CBE9F4]">Billing Policy</Link>
            <Link to="/careers" className="text-sm md:text-base hover:text-[#CBE9F4]">Refund Policy</Link>
            <Link to="/pricing" className="text-sm md:text-base hover:text-[#CBE9F4]">Privacy Policy</Link>
          </div>
        </div>
      </div>

      <img src="./Line.png" alt="Divider" className="w-full md:w-[90%] my-4" />

      {/* Footer Bottom */}
      <div className="flex flex-col md:flex-row justify-between items-center w-full md:w-[90%] gap-4 md:gap-0">
        <div>
          <p className="text-[#FF851B] text-sm md:text-base text-center md:text-left">
            &copy; 2024 Directly. All rights reserved
          </p>
        </div>
        <div className="flex flex-row justify-center items-center gap-4">
          <FaFacebook className="w-5 h-5 hover:text-[#CBE9F4] cursor-pointer" />
          <FaXTwitter className="w-5 h-5 hover:text-[#CBE9F4] cursor-pointer" />
          <FaLinkedin className="w-5 h-5 hover:text-[#CBE9F4] cursor-pointer" />
          <FaInstagram className="w-5 h-5 hover:text-[#CBE9F4] cursor-pointer" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;