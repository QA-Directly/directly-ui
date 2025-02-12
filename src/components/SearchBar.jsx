import { MapPin, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page

    // Encode the search parameters to handle special characters
    const encodedQuery = encodeURIComponent(searchQuery.trim());
    const encodedLocation = encodeURIComponent(location.trim());

    // Navigate to search results
    navigate(`/search?q=${encodedQuery}&location=${encodedLocation}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  return (
    <div className="flex w-full mx-auto">
      <div className="flex w-full">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="I am looking for ..."
          className="bg-[#CBE9F4] w-full p-2 px-4 rounded-l-2xl outline-none"
        />
        <div className="flex">
          <button className="bg-[#CBE9F4] text-[#001F3F] px-3 hover:bg-[#a8d9e9] transition-colors">
            <MapPin className="w-5 h-5" />
          </button>
          <button
            onClick={handleSearch}
            type="button"
            className="bg-[#FF851B] text-white px-3 rounded-r-2xl hover:bg-[#ff9642] transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
