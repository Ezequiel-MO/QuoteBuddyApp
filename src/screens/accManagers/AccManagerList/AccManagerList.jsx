import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import baseAPI from "../../../axios/axiosConfig";
import { toast } from "react-toastify";
import { toastOptions } from "../../../helper/toast";
import Spinner from "../../../ui/spinner/Spinner";

const AccManagerList = () => {
  const navigate = useNavigate();

  const [accManagers, setAccManagers] = useState([]);
  const [accManager] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAccManagers = async () => {
      try {
        setIsLoading(true);
        const response = await baseAPI.get("/v1/accManagers");
        setAccManagers(response.data.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getAccManagers();
  }, []);

  const handleDeleteAccManager = async (accManagerId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Account Manager ?"
    );
    if (confirmDelete) {
      try {
        await baseAPI.delete(`v1/accManagers/${accManagerId}`);
        toast.success("Account Manager Deleted", toastOptions);
        setAccManagers(
          accManagers.filter((accManager) => accManager._id !== accManagerId)
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.warn("Account Manager Not Deleted", toastOptions);
      setTimeout(() => window.location.reload(), 1500)();
    }
  };

  const accManagerList = accManagers
    .slice(0, 15)
    .map((accManager) => (
      <accManagerListItem
        key={accManager._id}
        accManager={accManager}
        handleDeleteAccManager={handleDeleteAccManager}
      />
    ));

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-end items-start sm:space-x-6 mb-4 mr-8 ml-8">
        <div className="flex flex-col w-full">
          <h1 className="text-2xl">Account Managers List</h1>
          <div className="flex flex-row justify-between">
            <button
              onClick={() =>
                navigate("/app/accManager/specs", { state: { accManager } })
              }
              className="focus:scale-110 hover:animate-pulse bg-transparent hover:bg-orange-50 text-white-100 uppercase font-semibold hover:text-black-50 py-2 px-4 border border-orange-50 hover:border-transparent rounded"
            >
              Create New Account Manager
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
        {isLoading ? <Spinner /> : accManagerList}
      </div>
    </>
  );
};

export default AccManagerList;
