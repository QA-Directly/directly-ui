import { MapPin, Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="flex w-full mx-auto">
      <div className="flex w-full">
        <input
          type="text"
          placeholder="I am looking for ..."
          className="bg-[#CBE9F4] w-full p-2 px-4 rounded-l-2xl outline-none"
        />
        <div className="flex">
          <button className="bg-[#CBE9F4] text-[#001F3F] px-3 hover:bg-[#a8d9e9] transition-colors">
            <MapPin className="w-5 h-5" />
          </button>
          <button className="bg-[#FF851B] text-white px-3 rounded-r-2xl hover:bg-[#ff9642] transition-colors">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
