const AddVenuePricesToRestaurant = ({ venuePrices, setVenuePrices }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVenuePrices({
      ...venuePrices,
      [name]: parseFloat(value),
    });
  };
  return (
    <div className="flex flex-col max-w-full text-white-100 my-10">
      <hr />
      <h1 className="text-2xl uppercase mb-5">Venue Prices</h1>
      <div className="flex flex-row justify-between xl:justify-around">
        <div>
          <div className="flex flex-row justify-between mb-1">
            <label htmlFor="rental">Venue Rental</label>
            <input
              className="rounded px-2 py-1 ml-5 text-black-50"
              type="number"
              id="rental"
              name="rental"
              placeholder="Dry hire rental price ..."
              value={venuePrices.rental}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-row justify-between mb-1">
            <label htmlFor="cocktail_units">Cocktail Units</label>
            <input
              className="rounded px-2 py-1 text-black-50"
              type="number"
              id="cocktail_units"
              name="cocktail_units"
              placeholder="ex 100 ..."
              value={venuePrices.cocktail_units}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-row justify-between mb-1">
            <label htmlFor="cocktail_price">Cocktail Price</label>
            <input
              className="rounded px-2 py-1 text-black-50"
              type="number"
              id="cocktail_price"
              name="cocktail_price"
              placeholder="ex 20 ..."
              value={venuePrices.cocktail_price}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-row justify-between mb-1">
            <label htmlFor="catering_units">Catering Units</label>
            <input
              className="rounded px-2 py-1 text-black-50"
              type="number"
              id="catering_units"
              name="catering_units"
              placeholder="ex 100 ..."
              value={venuePrices.catering_units}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-row justify-between mb-1">
            <label htmlFor="catering_price">Catering Price</label>
            <input
              className="rounded px-2 py-1 text-black-50"
              type="number"
              id="catering_price"
              name="catering_price"
              placeholder="ex 62 ..."
              value={venuePrices.catering_price}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-row justify-between mb-1">
            <label htmlFor="staff_units">Staff Units</label>
            <input
              className="rounded px-2 py-1 text-black-50"
              type="number"
              id="staff_units"
              name="staff_units"
              placeholder="ex 5 ..."
              value={venuePrices.staff_units}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <div className="flex flex-row justify-between mb-1">
            <label htmlFor="staff_menu_price">Staff Menu Price</label>
            <input
              className="rounded px-2 py-1 ml-5 text-black-50"
              type="number"
              id="staff_menu_price"
              name="staff_menu_price"
              placeholder="ex 35 ..."
              value={venuePrices.staff_menu_price}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-row justify-between mb-1">
            <label htmlFor="audiovisuals">AudioVisuals</label>
            <input
              className="rounded px-2 py-1 text-black-50"
              type="number"
              id="audiovisuals"
              name="audiovisuals"
              placeholder="ex 4500 ..."
              value={venuePrices.audiovisuals}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-row justify-between mb-1">
            <label htmlFor="cleaning">Cleaning</label>
            <input
              className="rounded px-2 py-1 text-black-50"
              type="number"
              id="cleaning"
              name="cleaning"
              placeholder="ex 1400 ..."
              value={venuePrices.cleaning}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-row justify-between mb-1">
            <label htmlFor="security">Security</label>
            <input
              className="rounded px-2 py-1 text-black-50"
              type="number"
              id="security"
              name="security"
              placeholder="ex 1800 ..."
              value={venuePrices.security}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-row justify-between mb-1">
            <label htmlFor="entertainment">Entertainment</label>
            <input
              className="rounded px-2 py-1 text-black-50"
              type="number"
              id="entertainment"
              name="entertainment"
              placeholder="ex 5000 ..."
              value={venuePrices.entertainment}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVenuePricesToRestaurant;
