import React, { useEffect, useState } from "react";

import Button from "../PredDefinedComponents/Button";

import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Search = () => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        className="border-2 border-yellow-700 focus:border-yellow-700 focus:outline-none placeholder-yellow-600 text-yellow-700 rounded-2xl p-1 "
      />
      <Button />
    </div>
  );
};

export default Search;
