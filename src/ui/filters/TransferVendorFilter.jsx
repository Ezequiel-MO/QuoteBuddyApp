import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectTransferCompanies } from "../../redux/features/TransferCompaniesSlice";

const TransferVendorFilter = ({ setCompany }) => {
  const transferCos = useSelector(selectTransferCompanies);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (transferCos) {
      setOptions(options);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transferCos]);

  return (
    <div className="w-11/12 max-w-sm my-2 ml-0 mr-0">
      <form>
        <div className="flex items-center gap-8">
          <label className="text-xl text-gray-100" htmlFor="company">
            ... by Vendor
          </label>
          <select
            id="company"
            className="flex-1 py-1 px-2 border-0 rounded-xl bg-green-50 text-center cursor-pointer"
            onChange={(e) => setCompany(e.target.value)}
          >
            <option value="none">--- Select a Vendor ---</option>
            {transferCos.map((company) => (
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
