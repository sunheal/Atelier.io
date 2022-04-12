import React from "react";
import { useRef, useState } from "react";
import ReactDom from "react-dom";
import "./SearchBar.css";
import Window from "../../window.jsx";
import ReactCoreImageUpload from "react-core-image-upload";

const SearchBar = (props) => {
  const inputRef = useRef(null);
  // const [showQuestionForm, setQuestionFormStatus] = useState(false);
  // const [showQuestionForm, setQuestionFormStatus] = useState(false);

  const onSearchComponent = () => {
    let subtitle;
    const value = inputRef.current.value;
    if (value.length >= 3) {
      props.onSearch(value);
    } else {
      props.onSearch("");
    }
  };

  // const onClick =() => {
  //   setQuestionFormStatus(false);
  // }

  return (
    <div className="search" action="" method="">
      <input
        type="search"
        placeholder="Search your questions here"
        size="180"
        onChange={onSearchComponent}
        ref={inputRef}
      ></input>

    </div>
  );
};

export default SearchBar;
