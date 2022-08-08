import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MasterEvent = () => {
  const navigate = useNavigate();
  const [event] = useState({});
  return (
    <div className="container ">
      <h1 className="text-2xl">Manage Events</h1>
      <ul className="indent-6 text-white-100">
        <li
          onClick={() => navigate("/app/event/list")}
          className="hover:text-orange-50 border-l-4 border-transparent hover:border-white-50 hover:cursor-pointer"
        >
          Get a List of All Events in the Data Base
        </li>
        <li
          onClick={() => navigate("/app/event/specs", { state: { event } })}
          className="hover:text-orange-50 border-l-4 border-transparent hover:border-white-50 hover:cursor-pointer"
        >
          Create a New Event and Save in the Data Base
        </li>
      </ul>
    </div>
  );
};

export default MasterEvent;
