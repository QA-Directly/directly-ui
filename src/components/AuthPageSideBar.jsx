import image2 from "../assets/image2.png";
import image8 from "../assets/image8.png";
import image9 from "../assets/image9.png";
import image10 from "../assets/image10.png";
import logo from "../assets/logo.png";

const AuthPageSideBar = () => {
  return (
    <div className="h-full w-full bg-white p-8 pl-20 flex flex-col ">
      <img src={logo} alt="Directly logo" className="w-32 mb-4" />

      <div className="">
        <p className="text-gray-600 mb-8 ">
          Welcome to Directly, the ultimate web service for connecting you with
          trusted service providers in just a few taps. We've got you covered.
        </p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="grid grid-cols-2 gap-4 w-full ">
          <img
            src={image2}
            alt="Service provider"
            className="w-full h-48 object-cover"
          />
          <img
            src={image8}
            alt="Service provider"
            className="w-full h-48 object-cover"
          />
          <img
            src={image9}
            alt="Service provider"
            className="w-full h-48 object-cover"
          />
          <img
            src={image10}
            alt="Service provider"
            className="w-full h-48 object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthPageSideBar;
