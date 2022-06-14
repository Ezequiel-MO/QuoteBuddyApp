import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import baseAPI from "../../../axios/axiosConfig";
import { toastOptions } from "../../../helper/toast";
import CountryFilter from "../../../UI/filters/CountryFilter";
import Spinner from "../../../UI/spinner/Spinner";
import ClientListItem from "./ClientListItem";

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [country, setCountry] = useState("");

  const handleDeleteClient = async (clientId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this client?"
    );

    if (confirmDelete) {
      try {
        await baseAPI.delete(`v1/clients/${clientId}`);
        toast("Client Deleted", toastOptions);
        setClients(clients.filter((client) => client._id !== clientId));
      } catch (error) {
        toast.error(error.response.data.message, toastOptions);
      }
    } else {
      toast.warn("Client not deleted", toastOptions);
      setTimeout(() => window.location.reload(), 1500)();
    }
  };

  useEffect(() => {
    const getClientList = async () => {
      try {
        if (country) {
          setIsLoading(true);
          const response = await baseAPI.get(`/v1/clients?country=${country}`);
          setClients(response.data.data.data);
          setIsLoading(false);
        } else {
          setIsLoading(true);
          const response = await baseAPI.get(`/v1/clients`);
          setClients(response.data.data.data);
          setIsLoading(false);
        }
      } catch (error) {
        toast.error(error, toastOptions);
      }
    };

    getClientList();
  }, [country]);

  const clientList = clients
    ?.slice(0, 15)
    .map((client) => (
      <ClientListItem
        key={client._id}
        client={client}
        handleDeleteClient={handleDeleteClient}
      />
    ));

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-end items-start sm:space-x-6 mb-4 mr-8 ml-8">
        <div className="flex flex-col w-full">
          <h1 className="text-2xl">Client List</h1>
          <div className="flex flex-row">
            <div className="flex-1">
              <CountryFilter setCountry={setCountry} />
            </div>
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
      <div className="flex flex-row">
        <div className="flex-1 m-4 flex-col">
          {isLoading ? <Spinner /> : clientList}
        </div>
      </div>
    </>
  );
};

export default ClientList;
