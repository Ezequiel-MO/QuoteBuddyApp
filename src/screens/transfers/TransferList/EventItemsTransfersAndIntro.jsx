import { useState, useEffect } from "react";
import baseAPI from "../../../axios/axiosConfig";
import { useCurrentProject } from "../../../hooks/useCurrentProject";
import TransferServiceFilter from "../../../ui/filters/TransferServiceFilter";
import TransferVendorFilter from "../../../ui/filters/TransferVendorFilter";
import VehicleSizeFilter from "../../../ui/filters/VehicleSizeFilter";
import AddIntroToEvent from "../../projects/AddIntro/AddIntroToEvent";
import accounting from "accounting";

const EventItemsTransfersAndIntro = ({
  handleAddTransfer,
  handleAddIntro,
  handleAddEvent,
}) => {
  const { currentProject } = useCurrentProject();
  const [company, setCompany] = useState("none");
  const [vehicleCapacity, setVehicleCapacity] = useState(0);
  const [service, setService] = useState("");
  const [transferService, setTransferService] = useState({});
  const [selectedServicePrice, setSelectedServicePrice] = useState(0);
  const [nrVehicles, setNrVehicles] = useState(0);
  const [intro, setIntro] = useState("");
  const [city, setCity] = useState(currentProject.groupLocation || "Barcelona");

  useEffect(() => {
    const getSelectedTransferPrice = async () => {
      try {
        const response = await baseAPI.get(
          `v1/transfers?company=${company}&vehicleCapacity=${vehicleCapacity}`
        );
        setSelectedServicePrice(response.data.data.data[0][service]);
        setTransferService(response.data.data.data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    if (company && service && vehicleCapacity) {
      getSelectedTransferPrice();
    }
  }, [company, vehicleCapacity, service]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddIntro(intro);
    handleAddTransfer(transferService, service, nrVehicles);
    handleAddEvent();
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl mb-4 indent-8">Add Transfer to an Event ? </h1>
      <form onSubmit={handleSubmit} className="flex flex-row">
        <div className="w-1/2 flex flex-col p-8">
          <div className="text-white-100 text-xl text-center">
            {company && vehicleCapacity && service && nrVehicles ? (
              <p>
                {`${nrVehicles}  x ${vehicleCapacity} seater vehicle(s)
              `}
                <span className="ml-2">
                  @ unit cost of{" "}
                  {accounting.formatMoney(selectedServicePrice, "€")}
                </span>
                <span className="mx-2 font-bold">
                  TOTAL{" "}
                  {accounting.formatMoney(
                    nrVehicles * selectedServicePrice,
                    "€"
                  )}
                </span>
              </p>
            ) : null}
          </div>
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
        <div className="w-1/2 flex flex-col p-8">
          <AddIntroToEvent setIntro={setIntro} intro={intro} />
        </div>
      </form>
    </div>
  );
};

export default EventItemsTransfersAndIntro;
