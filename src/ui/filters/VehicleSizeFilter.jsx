import React from "react";

const VehicleSizeFilter = ({ setVehicleCapacity }) => {
  return (
    <div className="w-11/12 max-w-sm my-2 ml-0 mr-0">
      <form>
        <div className="flex items-center gap-8">
          <label className="text-xl text-gray-100" htmlFor="vehicleSize">
            ... by Vehicle Size
          </label>
          <select
            id="vehicleSize"
            className="flex-1 py-1 px-2 border-0 rounded-xl bg-green-50 text-center cursor-pointer"
            onChange={(e) => setVehicleCapacity(e.target.value)}
          >
            <option value="none">--- Select a vehicle ---</option>
            <option value={3}>--- Sedan Car ---</option>
            <option value={6}>--- MiniVan ---</option>
            <option value={20}>--- MiniBus ---</option>
            <option value={30}>--- 30-seater Bus ---</option>
            <option value={50}>--- 50-seater Bus ---</option>
            <option value={70}>--- 70-seater Bus ---</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default VehicleSizeFilter;
