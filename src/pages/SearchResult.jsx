import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useProvider } from "../Contexts/ProviderContext";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";

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
    <div className="min-h-screen bg-[#EDEBEB]">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <SearchBar />
        </div>

        <div className="mb-4">
          <h2 className="text-2xl font-bold text-[#001F3F]">
            Search Results {query && `for "${query}"`}
            {location && ` in ${location}`}
          </h2>
          <p className="text-gray-600 mt-2">
            Found {filteredProviders.length} service providers
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-8">Loading...</div>
        ) : filteredProviders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">
              No service providers found matching your search criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProviders.map((provider) => (
              <Link
                key={provider.id}
                to={`/provider/${provider.id}`}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="p-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={provider.image}
                      alt={provider.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{provider.name}</h3>
                      <p className="text-[#FF851B]">{provider.service}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">{provider.location}</span>
                      <div className="flex items-center">
                        <span className="text-yellow-500">★</span>
                        <span className="ml-1">
                          {provider.starRating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResult;
