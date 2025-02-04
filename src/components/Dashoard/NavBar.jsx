import {
  Banknote,
  Bell,
  LaptopMinimalCheck,
  LockKeyholeOpen,
  LogOut,
  MessagesSquare,
  NotebookPen,
  SquarePen,
} from "lucide-react";
import { NavLink } from "react-router-dom";

function NavBar() {
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

  return (
    <div className="w-1/5 h-screen fixed bg-primary text-lightText flex flex-col">
      <div className="w-full py-4 flex justify-center items-center gap-2">
        <img src="./directlyicon.png" alt="Icon" className="h-8" />
        <img src="./directlyname.png" alt="Logo" className="h-8" />
      </div>
      <div className="border-b-2 border-lightText"></div>

      <div className="p-4 flex flex-col gap-4">
        <h2 className="font-bold text-2xl p-2">Dashboard</h2>
        {links.map((link, index) => (
          <NavLink
            to={`/dashboard${link.link}`}
            key={index}
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded hover:bg-lightBlue hover:cursor-pointer ${
                isActive ? "bg-lightBlue" : ""
              }`
            }
          >
            {link.icon}
            <span>{link.name}</span>
          </NavLink>
        ))}
      </div>
      {/* Logout */}
      <div className="mt-auto border-t-2 border-lightText">
        <button className="flex items-center gap-2 p-4 px-6 text-red-500 font-bold text-xl">
          <LogOut />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}

export default NavBar;
