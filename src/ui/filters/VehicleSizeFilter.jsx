import { useState, useEffect } from "react";
import baseAPI from "../../axios/axiosConfig";

const VehicleSizeFilter = ({ company, vehicleSize, setVehicleSize }) => {
  const [options, setOptions] = useState(
    JSON.parse(localStorage.getItem("vehicleSizes")) || []
  );
  useEffect(() => {
    const getVehicleSizesByCompany = async () => {
      try {
        const response = await baseAPI.get(`v1/transfers?company=${company}`);
        const vehicleSizes = response.data.data.data.map(
          (transfer) => transfer.vehicleCapacity
        );
        const uniqueVehicleSizes = [...new Set(vehicleSizes)];
        localStorage.setItem(
          "vehicleSizes",
          JSON.stringify(uniqueVehicleSizes)
        );
        setOptions(uniqueVehicleSizes);
      } catch (error) {
        console.log(error);
      }
    };

    if (company) {
      getVehicleSizesByCompany();
    }
  }, [company]);

  return (
    <div className="flex flex-row justify-between my-1">
      <label className="text-xl text-gray-100" htmlFor="vehicleSize">
        ... by Vehicle Size
      </label>
      <select
        id="vehicleSize"
        value={vehicleSize}
        className="py-1 px-2 border-0 rounded-xl bg-green-50 text-center cursor-pointer w-[360px]"
        onChange={(e) => setVehicleSize(e.target.value)}
      >
        <option value={0}>--- Select a vehicle ---</option>
        {options.map((vehicleSize) => (
          <option key={vehicleSize} value={vehicleSize}>
            {` --- ${vehicleSize} seater ${
              vehicleSize <= 3
                ? "Sedan Car"
                : vehicleSize === 6
                ? "Mini Van"
                : vehicleSize === 20
                ? "Mini Bus"
                : "Bus"
            }--- `}
          </option>
        ))}
      </select>
    </div>
  );
};

export default VehicleSizeFilter;
