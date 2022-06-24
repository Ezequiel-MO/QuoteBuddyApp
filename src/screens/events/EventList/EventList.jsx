import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import baseAPI from "../../../axios/axiosConfig";
import { toast } from "react-toastify";
import { toastOptions } from "../../../helper/toast";
import EventListItem from "./EventListItem";
import CityFilter from "../../../ui/filters/CityFilter";
import PriceFilter from "../../../ui/filters/PriceFilter";
import Spinner from "../../../ui/spinner/Spinner";
import "react-toastify/dist/ReactToastify.css";
import { useCurrentProject } from "../../../hooks/useCurrentProject";

const EventList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [events, setEvents] = useState([]);
  const [event] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [city, setCity] = useState("");
  const [price, setPrice] = useState(900);
  const { currentProject } = useCurrentProject();
  const currentProjectIsLive = Object.keys(currentProject).length !== 0;

  useEffect(() => {
    if (currentProjectIsLive) {
      const { groupLocation } = currentProject;
      setCity(groupLocation);
    }
  }, [currentProject, currentProjectIsLive]);

  useEffect(() => {
    const getEventList = async () => {
      try {
        setIsLoading(true);
        const response = await baseAPI.get(
          `/v1/events?city=${city}&price[lte]=${price}`
        );
        setEvents(response.data.data.data);
        setIsLoading(false);
      } catch (error) {
        toast.error(error, toastOptions);
      }
    };
    if (city && price) {
      getEventList();
    }
  }, [city, price]);

  const handleDeleteEvent = async (eventId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (confirmDelete) {
      try {
        await baseAPI.delete(`v1/events/${eventId}`);
        toast("Event Deleted", toastOptions);
        setEvents(events.filter((event) => event._id !== eventId));
      } catch (error) {
        toast.error(error.response.data.message, toastOptions);
      }
    } else {
      toast.warn("Event not deleted", toastOptions);
      setTimeout(() => window.location.reload(), 1500)();
    }
  };

  const addEventToProject = (event) => {
    navigate(`/app/project/schedule/${event._id}`, {
      state: {
        event,
        dayOfEvent: location.state.dayOfEvent,
        timeOfEvent: location.state.timeOfEvent,
      },
    });
  };

  const eventList = events
    .slice(0, 15)
    .map((event) => (
      <EventListItem
        key={event._id}
        event={event}
        handleDeleteEvent={handleDeleteEvent}
        addEventToProject={addEventToProject}
        canBeAddedToProject={location.state}
      />
    ));

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-end items-start sm:space-x-6 mb-4 mr-8 ml-8">
        <div className="flex flex-col w-full">
          <h1 className="text-2xl">Event List</h1>
          <div className="flex flex-row justify-between">
            <div>
              {currentProjectIsLive ? null : <CityFilter setCity={setCity} />}
              <PriceFilter setPrice={setPrice} />
            </div>
            <button
              onClick={() => navigate("/app/event/specs", { state: { event } })}
              className="focus:scale-110 hover:animate-pulse bg-transparent hover:bg-orange-50 text-white-100 uppercase font-semibold hover:text-black-50 py-2 px-4 border border-orange-50 hover:border-transparent rounded"
            >
              Create New Event
            </button>
            <p className="flex flex-row items-center">
              <Icon icon="ic:baseline-swipe-left" color="#ea5933" width="40" />
              <span className="ml-2">
                Swipe list elements right to update / left to remove element
              </span>
            </p>
          </div>
        </div>
      </div>
      <hr />
      <div className="flex-1 m-4 flex-col">
        {isLoading ? <Spinner /> : eventList}
      </div>
    </>
  );
};

export default EventList;
