import Header from "../components/Header";

function SearchResult() {
  return (
    <div className="flex flex-col gap-8">
      <Header />
      <div className="w-4/5 flex flex-row justify-between items-center m-auto border-b-2 border-[#001F3F] p-4">
        <p>Search results</p>
        <p>Over 254,800 ads found</p>
      </div>
    </div>
  );
}

export default SearchResult;
