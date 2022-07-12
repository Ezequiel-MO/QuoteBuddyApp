import { Icon } from "@iconify/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import baseAPI from "../../../axios/axiosConfig";
import { toastOptions } from "../../../helper/toast";
import useGetCountries from "../../../hooks/useGetCountries";
import CountryListItem from "./CountryListItem";
import Spinner from "../../../ui/spinner/Spinner";

const CountryList = () => {
  const navigate = useNavigate();
  const [country] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { countries } = useGetCountries();

  const handleDeleteCountry = async (countryId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this country?"
    );

    if (confirmDelete) {
      try {
        await baseAPI.delete(`v1/countries/${countryId}`);
        toast("Country Deleted", toastOptions);
        setCountries(countries.filter((country) => country._id !== countryId));
      } catch (error) {
        toast.error(error.response.data.message, toastOptions);
      }
    } else {
      toast.warn("Client not deleted", toastOptions);
      setTimeout(() => window.location.reload(), 1500)();
    }
  };

  const countryList = countries
    ?.slice(0, 15)
    .map((item) => (
      <CountryListItem
        key={item._id}
        country={item}
        handleDeleteCountry={handleDeleteCountry}
      />
    ));

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-end items-start sm:space-x-6 mb-4 mr-8 ml-8">
        <div className="flex flex-col w-full">
          <h1 className="text-2xl">Country List</h1>
          <div className="flex flex-row justify-between">
            <button
              onClick={() =>
                navigate("/app/country/specs", { state: { country } })
              }
              className="focus:scale-110 hover:animate-pulse bg-transparent hover:bg-orange-50 text-white-100 uppercase font-semibold hover:text-black-50 py-2 px-4 border border-orange-50 hover:border-transparent rounded"
            >
              Create New Country
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
      <div className="flex flex-row">
        <div className="flex-1 m-4 flex-col">
          {isLoading ? <Spinner /> : countryList}
        </div>
      </div>
    </>
  );
};

export default CountryList;
