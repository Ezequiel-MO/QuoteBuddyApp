import React from "react";

const PriceFilter = ({ setPrice }) => {
  return (
    <div className="w-11/12 max-w-sm my-2 ml-0 mr-0">
      <form>
        <div className="flex items-center gap-8">
          <label className="text-xl text-gray-100" htmlFor="price">
            Price Range
          </label>
          <select
            id="price"
            className="flex-1 py-1 px-2 border-0 rounded-xl bg-green-50 text-center cursor-pointer"
            onChange={(e) => setPrice(Number(e.target.value))}
          >
            <option value={900}>--- All prices ---</option>
            <option value={25}>Less than €25</option>
            <option value={40}>Less than €40</option>
            <option value={60}>Less than €60</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default PriceFilter;
