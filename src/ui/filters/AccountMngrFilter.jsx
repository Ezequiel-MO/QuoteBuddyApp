import { useEffect, useState } from "react";
import baseAPI from "../../axios/axiosConfig";

const AccountMngrFilter = ({ setAccountManager, accountManager }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const getAccountManagers = async () => {
      const response = await baseAPI.get(`v1/users?confirmed=true`);
      const namesArray = response.data.data.data.map((user) => {
        return {
          name: user.name,
          email: user.email,
        };
      });
      setOptions(namesArray);
    };

    getAccountManagers();
  }, []);

  return (
    <div className="w-full max-w-lg my-2 ml-0 mr-0">
      <form>
        <div className="flex items-center gap-8">
          <label className="text-xl text-gray-100" htmlFor="accMngr">
            ... by Acc. Manager
          </label>
          <select
            id="accMngr"
            className="flex-1 py-1 px-2 border-0 rounded-xl bg-green-50 text-center cursor-pointer"
            value={accountManager}
            onChange={(e) => setAccountManager(e.target.value)}
          >
            {options.map((option) => (
              <option
                key={option.email}
                value={option.name}
              >{`--- ${option.name} ${option.email} ---`}</option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};

export default AccountMngrFilter;
