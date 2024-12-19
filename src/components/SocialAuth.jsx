import facebook from "../assets/facebook.svg";
import google from "../assets/google.svg";

const SocialAuth = ({ action }) => {
  return (
    <div className=" w-full flex flex-col justify-center gap-4 items-center ">
      <div className="w-full flex flex-row justify-center items-center">
        <div className="w-1/2 border-t-2"></div>
        <p className=" w-full text-center">Or {action} with</p>
        <div className="w-1/2 border-t-2"></div>
      </div>
      <div className=" flex flex-row justify-center gap-8 items-center">
        <img src={facebook} alt="" className="w-6 h-6" />
        <img src={google} alt="" className="w-6 h-6" />
      </div>
    </div>
  );
};

export default SocialAuth;
