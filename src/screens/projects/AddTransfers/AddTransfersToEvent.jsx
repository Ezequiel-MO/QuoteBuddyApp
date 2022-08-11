import accounting from "accounting";
import { useState } from "react";
import { useCurrentProject } from "../../../hooks/useCurrentProject";
import {
  TransferServiceFilter,
  TransferVendorFilter,
  VehicleSizeFilter,
} from "../../../ui/filters";

const AddTransfersToEvent = ({
  company,
  setCompany,
  vehicleCapacity,
  setVehicleCapacity,
  service,
  setService,
  nrVehicles,
  setNrVehicles,
  selectedServicePrice,
}) => {
  const { currentProject } = useCurrentProject();
  const [city, setCity] = useState(currentProject.groupLocation || "Barcelona");
  return (
    <div className="w-1/2 flex flex-col p-8">
      <p className="text-white-100 text-xl text-center">
        {`${nrVehicles}  x ${vehicleCapacity} seater vehicle(s)
      `}
        <span className="ml-2">
          @ unit cost of {accounting.formatMoney(selectedServicePrice, "€")}
        </span>
        <span className="mx-2 font-bold">
          TOTAL {accounting.formatMoney(nrVehicles * selectedServicePrice, "€")}
        </span>
      </p>
      <div className="flex flex-col mt-2">
        <TransferVendorFilter
          setCompany={setCompany}
          company={company}
          city={city}
        />
        <VehicleSizeFilter
          company={company}
          vehicleCapacity={vehicleCapacity}
          setVehicleCapacity={setVehicleCapacity}
        />
        <TransferServiceFilter
          company={company}
          vehicleCapacity={vehicleCapacity}
          service={service}
          setService={setService}
        />
        <div className="flex flex-row justify-between my-1">
          <label className="text-xl text-gray-100" htmlFor="nrVehicles">
            Number of Vehicles{" "}
          </label>
          <input
            type="number"
            name="nrVehicles"
            value={nrVehicles}
            onChange={(e) => setNrVehicles(e.target.value)}
            className="px-2 py-1 border-0 rounded-xl bg-green-50 text-center cursor-pointer"
          />
        </div>
        <input
          className="text-xl text-gray-100 cursor-pointer mt-20"
          type="submit"
          value="Submit choices"
        />
      </div>
    </div>
  );
};

export default AddTransfersToEvent;
