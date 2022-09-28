import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MasterTransfer = () => {
  const navigate = useNavigate();
  const [transfer] = useState({});
  return (
    <div className="container ">
      <h1 className="text-2xl">Manage Transfers</h1>
      <ul className="indent-6 text-white-100">
        <li
          onClick={() => navigate("/app/transfer/list")}
          className="hover:text-orange-50 border-l-4 border-transparent hover:border-white-50 hover:cursor-pointer"
        >
          Get a List of All Transfers in the Data Base
        </li>

        <li
          onClick={() =>
            navigate("/app/transfer/specs", { state: { transfer } })
          }
          className="hover:text-orange-50 border-l-4 border-transparent hover:border-white-50 hover:cursor-pointer"
        >
          Create a New Transfer service and Save in the Data Base
        </li>
      </ul>
    </div>
  );
};

export default MasterTransfer;
