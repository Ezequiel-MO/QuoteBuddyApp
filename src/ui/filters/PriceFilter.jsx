const PriceFilter = ({ setPrice }) => {
  return (
    <div className="flex flex-row justify-between my-1 max-w-[480px] mr-2">
      <label className="text-xl text-gray-100" htmlFor="price">
        Price Range
      </label>
      <select
        id="price"
        className="ml-10 flex-1 py-1 px-2 border-0 rounded-xl bg-green-50 text-center cursor-pointer"
        onChange={(e) => setPrice(Number(e.target.value))}
      >
        <option value={900}>--- All prices ---</option>
        <option value={25}>Less than €25</option>
        <option value={40}>Less than €40</option>
        <option value={60}>Less than €60</option>
      </select>
    </div>
  );
};

export default PriceFilter;
