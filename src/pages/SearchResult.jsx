import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useProvider } from "../Contexts/ProviderContext";
import Header from "../assets/Header";

import Footer from "../components/Footer";
import NotFound from "../components/NotFound";
import { MapPin } from "lucide-react";

function SearchResult() {
  const [searchParams] = useSearchParams();
  const { providers } = useProvider();
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const query = searchParams.get("q")?.toLowerCase() || "";
  const location = searchParams.get("location")?.toLowerCase() || "";

  useEffect(() => {
    setIsLoading(true);
    // Filter providers based on search query and location
    const filtered = providers.filter((provider) => {
      const matchesQuery =
        provider.name.toLowerCase().includes(query) ||
        provider.service.toLowerCase().includes(query) ||
        provider.description.toLowerCase().includes(query);

      const matchesLocation =
        !location || provider.location.toLowerCase().includes(location);

      return matchesQuery && matchesLocation;
    });

    setFilteredProviders(filtered);
    setIsLoading(false);
  }, [query, location, providers]);

  return (
    <div className="w-full min-h-screen bg-[#EDEBEB]">
      <Header />

      <div className=" container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="text-center py-8">Loading...</div>
        ) : filteredProviders.length === 0 ? (
          <NotFound />
        ) : (
          <div className="w-[90%] m-auto bg-white rounded-lg shadow">
            <div className="flex justify-between items-center px-6 py-4 border-b-2">
              <h2 className="text-xl font-semibold">Search results</h2>
              <span className="text-gray-600">
                Over {providers.length.toLocaleString()} ads found
              </span>
            </div>

            <div className="flex flex-col">
              {filteredProviders.map((provider) => (
                <Link
                  to={`/provider/${provider.id}`}
                  key={provider.id}
                  className="p-6 border-b flex flex-row gap-6 hover:bg-ash/50"
                >
                  <div className="flex">
                    <img
                      src={provider.image}
                      alt={provider.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-orange-500"
                    />
                  </div>

                  <div className="w-full flex flex-row justify-between items-center">
                    <div>
                      <h3 className="text-xl font-semibold">{provider.name}</h3>
                      <p className="text-gray-600">{provider.service}</p>
                      <div className="flex items-center gap-1 text-gray-600 mt-1">
                        <MapPin size={16} />
                        <span>{provider.location}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mt-3 max-w-2xl">
                      {provider.description}
                    </p>
                    <div className="text-right">
                      <div
                        className={`inline-block px-3 py-1 rounded-full text-sm ${
                          provider.status === "Available"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {(provider.status = "Available")}
                      </div>

                      <div className="mt-2">
                        <div className="font-semibold">
                          {provider.starRating} rating
                        </div>
                        <div className="flex items-center justify-end">
                          {[...Array(5)].map((_, index) => (
                            <span
                              key={index}
                              className={`text-xl ${
                                index < Math.floor(provider.starRating)
                                  ? "text-gold"
                                  : "text-gray-300"
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          Open: 9am - 7pm
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default SearchResult;
