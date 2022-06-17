import { useEffect, useState } from "react";
import baseAPI from "../../axios/axiosConfig";

const TransferServiceFilter = ({
  company,
  vehicleSize,
  service,
  setService,
}) => {
  const [options, setOptions] = useState(
    JSON.parse(localStorage.getItem("serviceOptions")) || []
  );

  useEffect(() => {
    const getServicesByCompanyAndVehicleSize = async () => {
      try {
        const response = await baseAPI.get(
          `v1/transfers?company=${company}&vehicleCapacity=${vehicleSize}`
        );
        //filter outcity, company, _id, vehicleType and vehicleCapacity from response.data.data.data
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
        localStorage.setItem("serviceOptions", JSON.stringify(serviceOptions));
        const renameObject = {
          dispo_4h: "4 Hours at Disposal",
          dispo_4h_airport: "4 Hours at Disposal from Airport",
          dispo_4h_night: "4 Hours at Disposal Night hours",
          dispo_5h_out: "5 Hours at Disposal Out of City",
          dispo_6h_night: "6 Hours at Disposal Night hours",
          hextra: "Extra hours",
          hextra_night: "Extra hours night time",
          transfer_in_out: "Transfer in/out of city",
          transfer_in_out_night: "Transfer in/out of city night time",
        };
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
    <div className="w-11/12 max-w-sm my-2 ml-0 mr-0">
      <form>
        <div className="flex items-center gap-8">
          <label className="text-xl text-gray-100" htmlFor="transferService">
            ... by Service
          </label>
          <select
            id="transferService"
            className="flex-1 py-1 px-2 border-0 rounded-xl bg-green-50 text-center cursor-pointer"
            onChange={(e) => setService(e.target.value)}
          >
            <option value="">--- Choose type of Service ---</option>
            {options.map((service) => (
              <option key={service} value={service}>
                {` --- ${service} --- `}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};

export default TransferServiceFilter;
