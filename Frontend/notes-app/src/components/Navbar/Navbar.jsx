/* eslint-disable react/prop-types */
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate } from "react-router-dom"; // Correct import
import { useState } from "react"; // Correct import
import SearchBar from "../SearchBar/SearchBar";

const Navbar = ({ userInfo, onSearchNotes,handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate(); // Corrected: Added parentheses

  const onLogout = () => {
    localStorage.clear();
    navigate("/login"); // Corrected: Calling navigate as a function
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNotes(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">Notes</h2>
      <SearchBar
        value={searchQuery}
        onChange={({ target }) => {
          setSearchQuery(target.value);
        }}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />
      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  );
};

export default Navbar;
