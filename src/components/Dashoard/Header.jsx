import { Bell, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import user from "../../assets/occupations/plumber.png";
import { useAuth } from "../../Contexts/AuthContext";

function Header() {
  const { userProfile } = useAuth();
  const [dp, setDp] = useState(user);

  useEffect(() => {
    userProfile.profilePicture
      ? setDp(userProfile.profilePicture)
      : setDp(user);
  }, [userProfile]);

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
        <img src={dp} alt="" className="w-12 h-12 rounded-full" />
        <p className="font-bold text-lg">{userProfile.firstName}</p>
      </div>
    </div>
  );
}

export default Header;
