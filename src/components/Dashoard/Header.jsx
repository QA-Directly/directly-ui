import { Bell, Search } from "lucide-react";
import React from "react";

function Header() {
  return (
    <div className="bg-white p-8 shadow-md flex flex-row justify-between items-center">
      <div className="w-3/4 flex flex-row p-4 justify-between rounded bg-ash">
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
        <img
          src="./occupations/baber.png"
          alt=""
          className="w-12 h-12 rounded-full"
        />
        <p className="font-bold text-lg">Emeka Madu</p>
      </div>
    </div>
  );
}

export default Header;
