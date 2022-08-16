import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CityFilter from "../../../ui/filters/CityFilter";
import Spinner from "../../../ui/spinner/Spinner";
import { useCurrentProject } from "../../../hooks/useCurrentProject";
import TableHeaders from "../../../ui/TableHeaders";
import useGetVenues from "../../../hooks/useGetVenues";
import VenueListItem from "./VenueListItem";

const VenueList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [venue] = useState({});
  const { currentProject } = useCurrentProject();
  const { groupLocation } = currentProject;
  const [city, setCity] = useState(groupLocation || "");
  const { venues, isLoading } = useGetVenues(city);
  const currentProjectIsLive = Object.keys(currentProject).length !== 0;

  const addVenueToProject = (venue) => {
    navigate(`/app/project/schedule/${venue._id}`, {
      state: {
        event: venue,
        dayOfEvent: location.state.dayOfEvent,
        timeOfEvent: location.state.timeOfEvent,
      },
    });
  };

  const venueList = venues
    ?.slice(0, 15)
    .map((venue) => (
      <VenueListItem
        key={venue._id}
        venue={venue}
        addVenueToProject={addVenueToProject}
        canBeAddedToProject={location.state}
      />
    ));

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-end items-start sm:space-x-6 mb-4 mr-8 ml-8">
        <div className="flex flex-col w-full">
          <h1 className="text-2xl">Venue List</h1>
          <div className="flex flex-row justify-start">
            <div>
              {currentProjectIsLive ? null : (
                <CityFilter setCity={setCity} city={city} />
              )}
            </div>
            <button
              onClick={() => navigate("/app/venue/specs", { state: { venue } })}
              className="focus:scale-110 hover:animate-pulse bg-transparent hover:bg-orange-50 text-white-100 uppercase font-semibold hover:text-black-50 py-2 px-4 border border-orange-50 hover:border-transparent rounded"
            >
              Create New Venue
            </button>
          </div>
        </div>
      </div>

      <hr />
      {isLoading ? (
        <Spinner />
      ) : (
        <table className="w-full p-5">
          <TableHeaders headers="venue" />
          {venueList}
        </table>
      )}
    </>
  );
};

export default VenueList;
