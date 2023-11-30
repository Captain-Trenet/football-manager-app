"use client";
import { useState } from "react";
import styles from "./search-bar.module.scss";
import { useDispatch } from "react-redux";
import Close from "./../../../../assets/close";
import Search from "./../../../../assets/search";
import { setFilteredPlayers } from "@/redux/reducers/playersSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [closeIcon, setCloseIcon] = useState(false);
  const [searchBtn, setSearchBtn] = useState(true);

  const filterResults = () => {
    const temp = searchTerm.toLowerCase().trim();

    dispatch(setFilteredPlayers(temp));
    setCloseIcon(true);
    setSearchBtn(false);
  };

  const clearResults = () => {
    setSearchTerm("");
    dispatch(setFilteredPlayers(""));
    setCloseIcon(false);
    setSearchBtn(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      filterResults();
    } else if (e.key === "Escape") {
      setSearchTerm("");
      setCloseIcon(false);
      setSearchBtn(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    if (!value) {
      setSearchBtn(true);
    }
    setSearchTerm(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchbar}>
        <Search />
        <input
          onKeyDown={handleKeyPress}
          onChange={handleChange}
          className={styles.search}
          type="text"
          placeholder="Find Player"
          value={searchTerm}
        />
        {searchTerm && searchBtn && (
          <span onClick={filterResults} className={styles.searchBtn}>
            Search
          </span>
        )}
        {!searchBtn && searchTerm && closeIcon && (
          <div onClick={() => clearResults()} className={styles.clear}>
            <Close />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
