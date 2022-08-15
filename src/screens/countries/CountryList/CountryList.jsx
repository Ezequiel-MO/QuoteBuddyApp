import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetCountries from "../../../hooks/useGetCountries";
import CountryListItem from "./CountryListItem";
import Spinner from "../../../ui/spinner/Spinner";
import TableHeaders from "../../../ui/TableHeaders";

const CountryList = () => {
  const navigate = useNavigate();
  const [country] = useState({});
  const [isLoading] = useState(false);

  const { countries } = useGetCountries();

  const countryList = countries
    ?.slice(0, 15)
    .map((item) => <CountryListItem key={item._id} country={item} />);

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-end items-start sm:space-x-6 mb-4 mr-8 ml-8">
        <div className="flex flex-col w-full">
          <h1 className="text-2xl">Country List</h1>
          <div className="flex flex-row justify-start">
            <button
              onClick={() =>
                navigate("/app/country/specs", { state: { country } })
              }
              className="focus:scale-110 hover:animate-pulse bg-transparent hover:bg-orange-50 text-white-100 uppercase font-semibold hover:text-black-50 py-2 px-4 border border-orange-50 hover:border-transparent rounded"
            >
              Create New Country
            </button>
          </div>
        </div>
      </div>
      <hr />
      <div className="flex-1 m-4 flex-col">
        <table className="w-full p-5">
          <TableHeaders headers="country" />
          {isLoading ? <Spinner /> : countryList}
        </table>
      </div>
    </>
  );
};

export default CountryList;
