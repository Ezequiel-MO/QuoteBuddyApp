import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MasterHotel = () => {
  const navigate = useNavigate();
  const [hotel] = useState({});
  return (
    <div className="container">
      <h1 className="text-2xl">Manage Hotels</h1>
      <ul className="indent-6 text-white-100">
        <li
          onClick={() => navigate("/app/hotel/list")}
          className="hover:text-orange-50 border-l-4 border-transparent hover:border-white-50 hover:cursor-pointer"
        >
          Get a List of All Hotels in the Data Base
        </li>
        <li
          onClick={() => navigate("/app/hotel/specs", { state: { hotel } })}
          className="hover:text-orange-50 border-l-4 border-transparent hover:border-white-50 hover:cursor-pointer"
        >
          Create a New Hotel and Save in the Data Base
        </li>
      </ul>
    </div>
  );
};

export default MasterHotel;
