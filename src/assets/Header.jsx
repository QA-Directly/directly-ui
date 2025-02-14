import {
  Bell,
  Heart,
  MessageCircle,
  User,
  Search,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import { useState } from "react";
import name from "../assets/directlyname.png";
import icon from "../assets/directlyicon.png";
function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // handle menu toggle (mobile)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // handle logout
  const handleLogOut = () => {
    logout();
    navigate("/");
  };

  // handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const encodedQuery = encodeURIComponent(searchQuery.trim());
      navigate(`/search?q=${encodedQuery}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  return (
    <header className="bg-primary w-full p-4 flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
      {/* Logo and Mobile Menu Section */}
      <div className="flex justify-between items-center w-full md:w-auto">
        <NavLink to="/" className="flex items-center gap-2">
          <img
            src={icon}
            className="w-8 h-8 md:w-12 md:h-12"
            alt="Directly Icon"
          />
          <img src={name} className="w-32 md:w-40" alt="Directly Name" />
        </NavLink>
        <button
          className="md:hidden text-[#CBE9F4] hover:text-[#FF851B] transition-colors"
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

      {/* Search Bar Section */}
      <div className="flex w-full md:w-1/3">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="I am looking for ..."
          className="bg-[#CBE9F4] w-full p-2 px-4 rounded-l-2xl outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-[#CBE9F4] text-[#001F3F] p-2 rounded-r-2xl hover:bg-[#a8d9e9] transition-colors"
        >
          <Search className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation and Buttons Section - Desktop */}
      <div className="hidden md:flex items-center gap-6">
        <nav className="flex items-center gap-6">
          <Link
            to="/dashboard/profile"
            className="text-[#CBE9F4] hover:text-[#FF851B] transition-colors"
          >
            <User className="w-6 h-6" />
          </Link>
          <Link
            to="/dashboard/notifications"
            className="text-[#CBE9F4] hover:text-[#FF851B] transition-colors"
          >
            <Heart className="w-6 h-6" />
          </Link>
          <Link
            to="/dashboard/notifications"
            className="text-[#CBE9F4] hover:text-[#FF851B] transition-colors"
          >
            <Bell className="w-6 h-6" />
          </Link>
          <Link
            to="/dashboard/messages"
            className="text-[#CBE9F4] hover:text-[#FF851B] transition-colors"
          >
            <MessageCircle className="w-6 h-6" />
          </Link>
        </nav>

        <NavLink
          to="/provider/application"
          className="bg-[#FF851B] text-[#001F3F] font-bold px-4 py-2 rounded-lg hover:bg-[#ff9642] transition-colors"
        >
          Provide a service
        </NavLink>
        <button
          onClick={handleLogOut}
          className="bg-[#CBE9F4] text-[#001F3F] font-bold px-4 py-2 rounded-lg hover:bg-[#a8d9e9] transition-colors"
        >
          <LogOut className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Navigation Menu - Toggleable */}
      <div
        className={`md:hidden flex flex-col gap-4 transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <nav className="flex justify-center gap-8">
          <Link
            to="/dashboard/profile"
            className="text-[#CBE9F4] hover:text-[#FF851B] transition-colors"
          >
            <User className="w-6 h-6" />
          </Link>
          <Link
            to="/dashboard"
            className="text-[#CBE9F4] hover:text-[#FF851B] transition-colors"
          >
            <Heart className="w-6 h-6" />
          </Link>
          <Link
            to="/dashbaord/notifications"
            className="text-[#CBE9F4] hover:text-[#FF851B] transition-colors"
          >
            <Bell className="w-6 h-6" />
          </Link>
          <Link
            to="/dashoard/messages"
            className="text-[#CBE9F4] hover:text-[#FF851B] transition-colors"
          >
            <MessageCircle className="w-6 h-6" />
          </Link>
        </nav>

        <div className="flex flex-col gap-3">
          <NavLink
            to="/provider/application"
            className="bg-[#FF851B] text-[#001F3F] font-bold py-2 rounded-lg text-center hover:bg-[#ff9642] transition-colors"
          >
            Provide a service
          </NavLink>
          <button
            onClick={handleLogOut}
            className="bg-[#CBE9F4] text-[#001F3F] font-bold py-2 rounded-lg hover:bg-[#a8d9e9] transition-colors flex items-center justify-center"
          >
            <LogOut className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
