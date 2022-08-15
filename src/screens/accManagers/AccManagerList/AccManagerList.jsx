import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../ui/spinner/Spinner";
import AccManagerListItem from "./AccManagerListItem";
import useGetAccManagers from "../../../hooks/useGetAccManagers";
import TableHeaders from "../../../ui/TableHeaders";

const AccManagerList = () => {
  const navigate = useNavigate();
  const [accManager] = useState({});
  const { isLoading, accManagers } = useGetAccManagers();

  const accManagerList = accManagers
    ?.slice(0, 15)
    .map((accManager) => (
      <AccManagerListItem key={accManager._id} accManager={accManager} />
    ));

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-end items-start sm:space-x-6 mb-4 mr-8 ml-8">
        <div className="flex flex-col w-full">
          <h1 className="text-2xl">Account Managers List</h1>
          <div className="flex flex-row justify-start">
            <button
              onClick={() =>
                navigate("/app/accManager/specs", { state: { accManager } })
              }
              className="focus:scale-110 hover:animate-pulse bg-transparent hover:bg-orange-50 text-white-100 uppercase font-semibold hover:text-black-50 py-2 px-4 border border-orange-50 hover:border-transparent rounded"
            >
              Create New Account Manager
            </button>
          </div>
        </div>
      </div>

      <hr />

      <div className="flex-1 m-4 flex-col">
        <table className="w-full p-5">
          <TableHeaders headers="accManager" />
          {isLoading ? <Spinner /> : accManagerList}
        </table>
      </div>
    </>
  );
};

export default AccManagerList;
