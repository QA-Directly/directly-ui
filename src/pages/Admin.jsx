import NavBar from "../components/Admin/NavBar";
import Header from "../components/Dashoard/Header";

import { Outlet } from "react-router-dom";

function Admin() {
  return (
    <div className="flex flex-row">
      <NavBar />
      <div className="w-4/5  flex flex-col  bg-ash ml-[20%] gap-2">
        {/* <Header /> */}
        <div>
          <Header />
        </div>
        <div className=" flex justify-center ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Admin;
