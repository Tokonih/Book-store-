import React, { FC, useState } from "react";
import { GoSearch } from "react-icons/go";

interface SearchBarProps {
  placeholder: string;
  onSearch: (searchTerm: string) => void;
  className?: string;
}

const SearchBar: FC<SearchBarProps> = ({ placeholder, onSearch, className = "" }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchTerm);
  };

  return (
    <div
      className={`flex items-center justify-between max-w-[960px] w-[900px] font-[loto] pl-[6px] text-[14px] ${className}`}
      style={{ border: "1px solid #3e5962" }}
    >
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        className="w-[95%] outline-none"
      />
      <button
        onClick={handleSearchClick}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "39px",
        }}
        className="color-[white] bg-[#3e5962] border border-[#3e5962] h-[100%] w-[60px] font-semibold text-[1.077rem] rounded-none transition duration-150 ease-in-out hover:bg-[#32474f]"
      >
        <GoSearch style={{ color: "white" }} />
      </button>
    </div>
  );
};

export default SearchBar;
