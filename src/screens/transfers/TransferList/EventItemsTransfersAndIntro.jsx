import { useState, useEffect } from "react";
import baseAPI from "../../../axios/axiosConfig";
import Button from "../../../ui/Button";
import AddIntroToEvent from "../../projects/AddIntro/AddIntroToEvent";
import AddTransfersToEvent from "../../projects/AddTransfers/AddTransfersToEvent";
import AddVenuePricesToRestaurant from "../../restaurants/AddVenuePrices/AddVenuePricesToRestaurant";

const EventItemsTransfersAndIntro = ({
  handleAddTransfer,
  handleAddIntro,
  handleAddVenuePrices,
  handleAddEvent,
}) => {
  const [company, setCompany] = useState("none");
  const [vehicleCapacity, setVehicleCapacity] = useState(0);
  const [service, setService] = useState("");
  const [transferService, setTransferService] = useState({});
  const [selectedServicePrice, setSelectedServicePrice] = useState(0);
  const [nrVehicles, setNrVehicles] = useState(1);
  const [intro, setIntro] = useState("");
  const [venuePrices, setVenuePrices] = useState({
    rental: "",
    cocktail_units: "",
    cocktail_price: "",
    catering_units: "",
    catering_price: "",
    staff_units: "",
    staff_menu_price: "",
    audiovisuals: "",
    cleaning: "",
    security: "",
    entertainment: "",
  });

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
    if (handleAddVenuePrices) handleAddVenuePrices(venuePrices);
    handleAddEvent();
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl mb-4 indent-8">Add Transfer to an Event ? </h1>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row p-4">
        <div className="w-full sm:w-1/2 flex flex-col">
          <div className="flex flex-col">
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
            <div>
              {handleAddVenuePrices && (
                <AddVenuePricesToRestaurant
                  venuePrices={venuePrices}
                  setVenuePrices={setVenuePrices}
                />
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col p-8 w-full md:w-1/2">
          <AddIntroToEvent setIntro={setIntro} intro={intro} />
          <div className="mt-4">
            <Button>Submit choices</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EventItemsTransfersAndIntro;
