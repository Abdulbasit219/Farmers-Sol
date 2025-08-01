import { useState } from "react";
import { IoIosSearch } from "react-icons/io";

function Search({ onSearch }) {
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    onSearch(value);
  }
  return (
    <div className="mb-3 mt-2 xl:w-96">
      <div className="relative mb-4 flex items-center w-full flex-wrap outline-none">
        <input
          className="w-full rounded-lg bg-green-100 border-green-200 hover:bg-green-200 px-4 py-2 outline-none"
          placeholder="Search"
          value={input}
          onChange={handleInputChange}
        />

        {/* <!--Search icon--> */}
        <span className="absolute right-2 cursor-pointer text-green-900">
          <IoIosSearch />
        </span>
      </div>
    </div>
  );
}

export default Search;
