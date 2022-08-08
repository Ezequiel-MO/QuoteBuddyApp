import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MasterClient = () => {
  const navigate = useNavigate();
  const [client] = useState({});
  return (
    <div className="container ">
      <h1 className="text-2xl">Manage Clients</h1>
      <ul className="indent-6 text-white-100">
        <li
          onClick={() => navigate("/app/client/list")}
          className="hover:text-orange-50 border-l-4 border-transparent hover:border-white-50 hover:cursor-pointer"
        >
          Get a List of All Clients in the Data Base
        </li>
        <li
          onClick={() => navigate("/app/client/specs", { state: { client } })}
          className="hover:text-orange-50 border-l-4 border-transparent hover:border-white-50 hover:cursor-pointer"
        >
          Create a New Client and Save in the Data Base
        </li>
      </ul>
    </div>
  );
};

export default MasterClient;
