import React from "react";
import { useRef } from "react";
import "./SearchBar.css";

const SearchBar = (props) => {
  const inputRef = useRef(null);

  const onSearchComponent = () => {
    const value = inputRef.current.value;
    if (value.length>=3) {
      props.onSearch(value)
    }else {
      props.onSearch('')
    }

  };

  return (
    <div className="search" action="" method="">
      <input
        type="search"
        placeholder="Search your questions here"
        size="150"
        onChange={onSearchComponent}
        ref={inputRef}
      ></input>
    </div>
  );
};

export default SearchBar;
