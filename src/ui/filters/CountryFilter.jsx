import useGetCountries from "../../hooks/useGetCountries";

const CountryFilter = ({ setCountry }) => {
  const { countries } = useGetCountries();
  return (
    <div className="w-11/12 max-w-sm my-2 ml-0 mr-0">
      <form>
        <div className="flex items-center gap-8">
          <label className="text-xl text-gray-100" htmlFor="country">
            Filter by Country
          </label>
          <select
            id="country"
            className="flex-1 py-1 px-2 border-0 rounded-xl bg-green-50 text-center cursor-pointer"
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="none">--- Select a country ---</option>
            {countries?.map((country) => (
              <option key={country._id} value={country.accessCode}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};

export default CountryFilter;
