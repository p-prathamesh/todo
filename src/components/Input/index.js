import React from "react";
import "./searchInput.css";

const SearchInput = React.memo(({fetchInput, placeholder, value}) => {
  return (
      <div className="center-align mt-3">
        <input
          type="text"
          className="form-control m-0"
          placeholder={placeholder}
          value={value}
          onChange={(event) => fetchInput(event.target.value)}
        ></input>
      </div>
  );
})

export default SearchInput;