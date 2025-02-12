import { Bell, Search } from "lucide-react";
import React from "react";
import user from "../../../public/occupations/plumber.png";

function Header() {
  return (
    <div className="bg-white p-6 shadow-md flex flex-row justify-between items-center">
      <div className="w-[65%] flex flex-row p-3 justify-between rounded bg-ash">
        <input
          type="search"
          placeholder="Search"
          className="outline-none bg-inherit"
        />
        <Search />
      </div>
      <div>
        <Bell />
      </div>
      <div className="flex flex-row gap-4 justify-center items-center">
        <img src={user} alt="" className="w-12 h-12 rounded-full" />
        <p className="font-bold text-lg">Emeka Madu</p>
      </div>
    </div>
  );
}

export default Header;
