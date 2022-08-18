const NrStarsFilter = ({ setNumberStars, numberStars }) => {
  return (
    <div className="w-11/12 max-w-sm my-2 ml-0 mr-0">
      <form>
        <div className="flex items-center gap-2">
          <label className="text-xl text-gray-100" htmlFor="nrStars">
            Filter by Category
          </label>
          <select
            id="nrStars"
            className="flex-1 py-1 px-2 border-0 rounded-xl bg-green-50 text-center cursor-pointer"
            value={numberStars}
            onChange={(e) => setNumberStars(e.target.value)}
          >
            <option value="none">--- Select Category ---</option>
            <option value={3}>--- 3-star ---</option>
            <option value={4}>--- 4-star ---</option>
            <option value={5}>--- 5-star ---</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default NrStarsFilter;
