import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MasterLocation = () => {
  const navigate = useNavigate();
  const [location] = useState({});
  return (
    <div className="container">
      <h1 className="text-2xl">Manage Locations</h1>
      <ul className="indent-6 text-white-100">
        <li
          onClick={() => navigate("/app/location/list")}
          className="hover:text-orange-50 border-l-4 border-transparent hover:border-white-50 hover:cursor-pointer"
        >
          Get a List of All Available locations in the Data Base
        </li>
        <li
          onClick={() =>
            navigate("/app/location/specs", { state: { location } })
          }
          className="hover:text-orange-50 border-l-4 border-transparent hover:border-white-50 hover:cursor-pointer"
        >
          Create a New Location and Save in the Data Base
        </li>
      </ul>
    </div>
  );
};

export default MasterLocation;
