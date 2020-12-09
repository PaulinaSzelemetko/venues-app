import React from "react";
import { useState } from "react";
import '../styles/Searching.css';


const Searching = (props) => {
  const [value, setValue] = useState("");

  const searchInputHandler = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(value);
  };

  return (
    <div className="searching">
      <form>
        <input
          type="text"
          onChange={searchInputHandler}
          value={value}
          placeholder="Search for venues..."
        />
        <button onClick={handleSubmit}>Search</button>
      </form>
    </div>
  );
};

export default Searching;
