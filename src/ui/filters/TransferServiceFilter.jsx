import { useEffect, useState } from "react";
import baseAPI from "../../axios/axiosConfig";

const TransferServiceFilter = ({
  company,
  vehicleSize,
  service,
  setService,
}) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const getServicesByCompanyAndVehicleSize = async () => {
      try {
        const response = await baseAPI.get(
          `v1/transfers?company=${company}&vehicleCapacity=${vehicleSize}`
        );
        const serviceOptions = Object.keys(response.data.data.data[0]).filter(
          (key) =>
            [
              "city",
              "company",
              "_id",
              "vehicleType",
              "vehicleCapacity",
              "selectedService",
            ].indexOf(key) === -1
        );

        setOptions(serviceOptions);
      } catch (error) {
        console.log(error);
      }
    };

    if (company && vehicleSize) {
      getServicesByCompanyAndVehicleSize();
    }
  }, [company, vehicleSize]);

  return (
    <div className="flex flex-row justify-between my-1">
      <label className="text-xl text-gray-100" htmlFor="transferService">
        ... by Service
      </label>
      <select
        id="transferService"
        value={service}
        className="py-1 px-2 border-0 rounded-xl bg-green-50 text-center cursor-pointer w-[360px]"
        onChange={(e) => setService(e.target.value)}
      >
        <option value="">--- Choose type of Service ---</option>
        {options.map((service) => (
          <option key={service} value={service}>
            {` --- ${
              service === "dispo_4h"
                ? "4 Hours at Disposal"
                : service === "dispo_4h_airport"
                ? "4 Hours at Disposal from Airport"
                : service === " dispo_4h_night"
                ? "4 Hours at Disposal Night hours"
                : service === "dispo_5h_out"
                ? "5 Hours at Disposal Out of City"
                : service === "dispo_6h_night"
                ? "6 Hours at Disposal Night hours"
                : service === "hextra_night"
                ? "Extra hours night time"
                : service === "transfer_in_out"
                ? "Transfer in/out of city"
                : service === "transfer_in_out_night"
                ? "Transfer in/out of city night time"
                : service
            } --- `}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TransferServiceFilter;
