import Button from "./Button";
import { Search as SearchIcon } from "lucide-react";

function Search({ setSearch, search, handleSearchProduct, placeHolder }) {
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearch(value);
  };

  return (
    <div className="mb-3 mt-2 xl:w-96">
      <form onSubmit={handleSearchProduct}>
        <div className="relative mb-4 flex items-center w-full flex-wrap outline-none">
          <input
            className="w-full rounded-lg bg-[#E4F8E2] hover:bg-[#daf3d7] border-green-200  px-4 py-2 outline-none"
            placeholder={placeHolder ? placeHolder : "Search"}
            value={search}
            onChange={handleInputChange}
          />

          {/* <!--Search icon--> */}
          <Button
            type="submit"
            className="absolute right-2 cursor-pointer text-green-900"
          >
            <SearchIcon size={18}/>
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Search;
