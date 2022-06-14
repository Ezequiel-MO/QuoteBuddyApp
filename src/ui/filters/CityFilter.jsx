import React from "react";

const CityFilter = ({ setCity }) => {
  return (
    <div className="w-11/12 max-w-sm my-2 ml-0 mr-0">
      <form>
        <div className="flex items-center gap-8">
          <label className="text-xl text-gray-100" htmlFor="city">
            Filter by City
          </label>
          <select
            id="city"
            className="flex-1 py-1 px-2 border-0 rounded-xl bg-green-50 text-center cursor-pointer"
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="none">--- Select a city ---</option>
            <option value="Barcelona">--- Barcelona ---</option>
            <option value="Valencia">--- Valencia ---</option>
            <option value="Madrid">--- Madrid ---</option>
            <option value="Mallorca">--- Palma Mallorca ---</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default CityFilter;
