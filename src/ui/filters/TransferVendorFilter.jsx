import React, { useEffect, useState } from "react";
import baseAPI from "../../axios/axiosConfig";

const TransferVendorFilter = ({ setCompany, company, city }) => {
  const [options, setOptions] = useState(
    JSON.parse(localStorage.getItem("companies")) || []
  );

  useEffect(() => {
    const getTransferCompaniesByCity = async () => {
      const response = await baseAPI.get(`v1/transfers?city=${city}`);
      const companies = response.data.data.data.map(
        (transfer) => transfer.company
      );
      const uniqueCompanies = [...new Set(companies)];
      localStorage.setItem("companies", JSON.stringify(uniqueCompanies));
      setOptions(uniqueCompanies);
    };
    getTransferCompaniesByCity();
  }, [company, city]);

  return (
    <div className="w-11/12 max-w-sm my-2 ml-0 mr-0">
      <form>
        <div className="flex items-center gap-8">
          <label className="text-xl text-gray-100" htmlFor="company">
            ... by Vendor
          </label>
          <select
            id="company"
            value={company}
            className="flex-1 py-1 px-2 border-0 rounded-xl bg-green-50 text-center cursor-pointer"
            onChange={(e) => setCompany(e.target.value)}
          >
            <option value="none">--- Select a Vendor ---</option>
            {options.map((company) => (
              <option key={company} value={company}>
                {` --- ${company} --- `}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};

export default TransferVendorFilter;
