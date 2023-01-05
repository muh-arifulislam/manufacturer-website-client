import { faSquareCheck, faSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useEffect } from "react";
const FilterSection = ({ query, setQuery }) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);
  const onClickBtn = (value) => {
    setQuery(value);
  };
  return (
    <div>
      {/* filter by category  */}
      <div className="mb-4">
        <h4 className="text-xl mb-4">Filter By Category</h4>
        <div className="ml-2">
          <ul>
            {categories?.map((category, idx) => (
              <li key={idx}>
                <button
                  onClick={() => {
                    setQuery(category);
                    if (query === category) setQuery("");
                  }}
                >
                  <FontAwesomeIcon
                    size="lg"
                    color="blue"
                    icon={category === query ? faSquareCheck : faSquare}
                  ></FontAwesomeIcon>
                  <span className="ml-2">{category}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
