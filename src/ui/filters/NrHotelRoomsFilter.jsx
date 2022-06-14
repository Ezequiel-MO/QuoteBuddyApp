import React from "react";

const NrHotelRoomsFilter = ({ setNumberRooms }) => {
  return (
    <div className="w-11/12 max-w-sm my-2 ml-0 mr-0">
      <form>
        <div className="flex items-center gap-2">
          <label className="text-xl text-gray-100" htmlFor="numberRooms">
            Filter by Number of Rooms
          </label>
          <select
            id="numberRooms"
            className="flex-1 py-1 px-2 border-0 rounded-xl bg-green-50 text-center cursor-pointer"
            onChange={(e) => setNumberRooms(Number(e.target.value))}
          >
            <option value="none">--- All options ---</option>
            <option value={50}>--- up to 50 ---</option>
            <option value={100}>--- up to 100 ---</option>
            <option value={200}>--- up to 200 ---</option>
            <option value={600}>--- up to 600 ---</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default NrHotelRoomsFilter;
