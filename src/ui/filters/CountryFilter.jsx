import React from "react";

const CountryFilter = ({ setCountry }) => {
  return (
    <div className="w-11/12 max-w-sm my-2 ml-0 mr-0">
      <form>
        <div className="flex items-center gap-8">
          <label className="text-xl text-gray-100" htmlFor="country">
            Filter by Country
          </label>
          <select
            id="country"
            className="flex-1 py-1 px-2 border-0 rounded-xl bg-green-50 text-center cursor-pointer"
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="none">--- Select a country ---</option>
            <option value="DE">--- Germany ---</option>
            <option value="DK">--- Denmark ---</option>
            <option value="EN">--- UK ---</option>
            <option value="ES">--- Spain ---</option>
            <option value="RO">--- Romania ---</option>
            <option value="SE">--- Sweden ---</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default CountryFilter;
