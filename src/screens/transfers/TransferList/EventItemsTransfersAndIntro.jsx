import { useState, useEffect } from "react";
import baseAPI from "../../../axios/axiosConfig";
import AddIntroToEvent from "../../projects/AddIntro/AddIntroToEvent";
import AddTransfersToEvent from "../../projects/AddTransfers/AddTransfersToEvent";

const EventItemsTransfersAndIntro = ({
  handleAddTransfer,
  handleAddIntro,
  handleAddEvent,
}) => {
  const [company, setCompany] = useState("none");
  const [vehicleCapacity, setVehicleCapacity] = useState(0);
  const [service, setService] = useState("");
  const [transferService, setTransferService] = useState({});
  const [selectedServicePrice, setSelectedServicePrice] = useState(0);
  const [nrVehicles, setNrVehicles] = useState(0);
  const [intro, setIntro] = useState("");

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
        <AddTransfersToEvent
          company={company}
          setCompany={setCompany}
          vehicleCapacity={vehicleCapacity}
          setVehicleCapacity={setVehicleCapacity}
          service={service}
          setService={setService}
          nrVehicles={nrVehicles}
          setNrVehicles={setNrVehicles}
          selectedServicePrice={selectedServicePrice}
        />
        <div className="w-1/2 flex flex-col p-8">
          <AddIntroToEvent setIntro={setIntro} intro={intro} />
        </div>
      </form>
    </div>
  );
};

export default EventItemsTransfersAndIntro;
