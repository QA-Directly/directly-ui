import { useState } from "react";
import {
  Banknote,
  Bell,
  LaptopMinimalCheck,
  LockKeyholeOpen,
  LogOut,
  MessagesSquare,
  NotebookPen,
  SquarePen,
  Menu,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

import name from "../../assets/directlyname.png";
import icon from "../../assets/directlyicon.png";
import { useAuth } from "../../Contexts/AuthContext";

function NavBar() {
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Profile", icon: <SquarePen />, link: "/profile" },
    { name: "Messages", icon: <MessagesSquare />, link: "/messages" },
    { name: "Transations", icon: <Banknote />, link: "/transactions" },
    { name: "Notifications", icon: <Bell />, link: "/notifications" },
    { name: "Bookings", icon: <NotebookPen />, link: "/bookings" },
    {
      name: "Saved Provider",
      icon: <LaptopMinimalCheck />,
      link: "/savedProviders",
    },
    {
      name: "Change Password",
      icon: <LockKeyholeOpen />,
      link: "/resetPassword",
    },
  ];
  const handleLogout = async () => {
    try {
      await logout();
      // The logout function from AuthContext will handle the state clearing
      // and redirect will be handled by  protected route setup
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-primary text-lightText p-2 rounded"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Navbar */}
      <div
        className={`w-1/2 md:w-1/5 h-screen fixed bg-primary text-lightText flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <NavLink
          to="/"
          className="w-full py-4 flex justify-center items-center gap-2"
        >
          <img src={icon} alt="Icon" className="h-6 md:h-8" />
          <img src={name} alt="Logo" className="h-6 md:h-8" />
        </NavLink>
        <div className="border-b-2 border-lightText"></div>

        <div className="p-4 flex flex-col gap-4">
          <h2 className="font-bold text-xl md:text-2xl p-2">Dashboard</h2>
          {links.map((link, index) => (
            <NavLink
              to={`/dashboard${link.link}`}
              key={index}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded hover:bg-lightBlue hover:cursor-pointer text-sm md:text-base ${
                  isActive ? "bg-lightBlue" : ""
                }`
              }
            >
              {link.icon}
              <span>{link.name}</span>
            </NavLink>
          ))}
        </div>

        <div className="mt-auto border-t-2 border-lightText">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 p-4 px-6 text-red-500 font-bold text-lg md:text-xl"
          >
            <LogOut />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default NavBar;
