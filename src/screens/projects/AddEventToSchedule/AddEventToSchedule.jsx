import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toastOptions } from "../../../helper/toast";
import { useCurrentProject } from "../../../hooks/useCurrentProject";
import EventItemsTransfersAndIntro from "../../transfers/TransferList/EventItemsTransfersAndIntro";

const AddEventToSchedule = () => {
  const location = useLocation();
  const { addEventToSchedule } = useCurrentProject();
  const navigate = useNavigate();
  const [event] = useState(location.state.event);

  const { isVenue } = event;

  const handleAddTransfer = (transferService, selectedService, nrVehicles) => {
    const transferData = { ...transferService, selectedService };
    event.transfer = [];
    for (let i = 0; i < nrVehicles; i++) {
      event.transfer = [...event.transfer, transferData];
    }

    toast.success("Transfer added", toastOptions);
  };

  const handleAddIntro = (intro) => {
    event.introduction = [intro];
    toast.success("Introduction added", toastOptions);
  };

  const handleAddVenuePrices = (prices) => {
    console.log("venue prices", prices);
    event.venue_price = [prices];
    toast.success("Venue prices added", toastOptions);
  };

  const handleAddEvent = () => {
    addEventToSchedule({
      dayOfEvent: location.state.dayOfEvent,
      timeOfEvent: location.state.timeOfEvent,
      event,
    });

    toast.success("Event Added to Schedule", toastOptions);
    navigate("/app/project/schedule");
  };

  return (
    <div className="relative">
      <EventItemsTransfersAndIntro
        handleAddTransfer={handleAddTransfer}
        handleAddIntro={handleAddIntro}
        handleAddVenuePrices={isVenue ? handleAddVenuePrices : undefined}
        handleAddEvent={handleAddEvent}
      />
    </div>
  );
};

export default AddEventToSchedule;
