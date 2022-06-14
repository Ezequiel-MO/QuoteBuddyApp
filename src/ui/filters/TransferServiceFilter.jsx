const TransferServiceFilter = ({ setService }) => {
  return (
    <div className="w-11/12 max-w-sm my-2 ml-0 mr-0">
      <form>
        <div className="flex items-center gap-8">
          <label className="text-xl text-gray-100" htmlFor="transferService">
            ... by Service
          </label>
          <select
            id="transferService"
            className="flex-1 py-1 px-2 border-0 rounded-xl bg-green-50 text-center cursor-pointer"
            onChange={(e) => setService(e.target.value)}
          >
            <option value="">--- Choose type of Service ---</option>
            <option value="transfer_in_out">Transfer In/Out Airport</option>
            <option value="dispo_4h">4h At Disposal</option>
            <option value="hextra">Extra Hour</option>
            <option value="hextra_night">Extra Hour Night</option>
            <option value="dispo_5h_out">5h At Disposal Outside City</option>
            <option value="dispo_4h_airport">
              4h Dispo start/end at Airport
            </option>
            <option value="dispo_4h_night">4h At Disposal Night</option>
            <option value="transfer_in_out_night">
              Transfer In/Out Airport Night
            </option>
            <option value="dispo_6h_night">6h Dispo Night</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default TransferServiceFilter;
