import React from "react";

const AccountMngrFilter = ({ setAccountManager }) => {
  return (
    <div className="w-11/12 max-w-sm my-2 ml-0 mr-0">
      <form>
        <div className="flex items-center gap-8">
          <label className="text-xl text-gray-100" htmlFor="accMngr">
            ... by Acc. Manager
          </label>
          <select
            id="accMngr"
            className="flex-1 py-1 px-2 border-0 rounded-xl bg-green-50 text-center cursor-pointer"
            onChange={(e) => setAccountManager(e.target.value)}
          >
            <option value="none">--- Select an Acc. Manager ---</option>
            <option value="Montse Miranda">--- Montse Miranda ---</option>
            <option value="Minerva Martinez">--- Minerva Martínez ---</option>
            <option value="Merche Sanchez">--- Merche Sánchez ---</option>
            <option value="Alicia Tercero">--- Alicia Tercero ---</option>
            <option value="Ezequiel Martinez">--- Ezequiel Martínez ---</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default AccountMngrFilter;
