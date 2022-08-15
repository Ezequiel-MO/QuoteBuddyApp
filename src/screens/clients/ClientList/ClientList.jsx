import { useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import CountryFilter from "../../../ui/filters/CountryFilter";
import Spinner from "../../../ui/spinner/Spinner";
import ClientListItem from "./ClientListItem";
import useGetClients from "../../../hooks/useGetClients";
import TableHeaders from "../../../ui/TableHeaders";

const ClientList = () => {
  const navigate = useNavigate();
  const [client] = useState({});
  const [country, setCountry] = useState("");
  const { clients, isLoading } = useGetClients(country);

  const clientList = clients
    ?.slice(0, 15)
    .map((client) => <ClientListItem key={client._id} client={client} />);

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-end items-start sm:space-x-6 mb-4 mr-8 ml-8">
        <div className="flex flex-col w-full">
          <h1 className="text-2xl">Client List</h1>
          <div className="flex flex-row justify-start">
            <div>
              <CountryFilter setCountry={setCountry} />
            </div>
            <button
              onClick={() =>
                navigate("/app/client/specs", { state: { client } })
              }
              className="focus:scale-110 hover:animate-pulse bg-transparent hover:bg-orange-50 text-white-100 uppercase font-semibold hover:text-black-50 py-2 px-4 border border-orange-50 hover:border-transparent rounded"
            >
              Create New Client
            </button>
          </div>
        </div>
      </div>
      <hr />
      <div className="flex flex-row">
        <table className="w-full p-5">
          <TableHeaders headers="client" />
          {isLoading ? <Spinner /> : clientList}
        </table>
      </div>
    </>
  );
};

export default ClientList;
