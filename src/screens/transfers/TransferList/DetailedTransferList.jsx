import { useState } from "react";
import { useCurrentProject } from "../../../hooks/useCurrentProject";
import TransferServiceFilter from "../../../ui/filters/TransferServiceFilter";
import TransferVendorFilter from "../../../ui/filters/TransferVendorFilter";
import VehicleSizeFilter from "../../../ui/filters/VehicleSizeFilter";

const DetailedTransferList = ({ handleAddTransfer }) => {
  const { currentProject } = useCurrentProject();
  const [company, setCompany] = useState("none");
  const [service, setService] = useState("");
  const [vehicleSize, setVehicleSize] = useState(0);
  const [city, setCity] = useState(currentProject.groupLocation || "Barcelona");
  return (
    <>
      <h1 className="text-2xl mb-4 indent-8">Add Transfer to an Event ? </h1>
      <TransferVendorFilter
        setCompany={setCompany}
        company={company}
        city={city}
      />
      <VehicleSizeFilter
        company={company}
        vehicleSize={vehicleSize}
        setVehicleSize={setVehicleSize}
      />
      <TransferServiceFilter
        company={company}
        vehicleSize={vehicleSize}
        service={service}
        setService={setService}
      />
    </>
  );
};

export default DetailedTransferList;
