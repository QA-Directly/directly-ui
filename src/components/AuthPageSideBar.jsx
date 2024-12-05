import banner from "../assets/banner.png";

const AuthPageSideBar = () => {
  return (
    <div className=" w-full h-screen flex flex-col justify-center items-center">
      <img src={banner} alt="banner" className="w-2/3" />
    </div>
  );
};

export default AuthPageSideBar;
