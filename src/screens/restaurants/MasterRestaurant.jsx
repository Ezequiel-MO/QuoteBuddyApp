import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MasterRestaurant = () => {
  const navigate = useNavigate();
  const [restaurant] = useState({});
  return (
    <div className="container">
      <h1 className="text-2xl">Manage Restaurants</h1>
      <ul className="indent-6 text-white-100">
        <li
          onClick={() => navigate("/app/restaurant")}
          className="hover:text-orange-50 border-l-4 border-transparent hover:border-white-50 hover:cursor-pointer"
        >
          Get a List of All Restaurants in the Data Base
        </li>
        <li
          onClick={() =>
            navigate("/app/restaurant/specs", { state: { restaurant } })
          }
          className="hover:text-orange-50 border-l-4 border-transparent hover:border-white-50 hover:cursor-pointer"
        >
          Create a New Restaurant and Save in the Data Base
        </li>
      </ul>
    </div>
  );
};

export default MasterRestaurant;
