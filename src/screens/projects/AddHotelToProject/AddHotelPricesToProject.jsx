const AddHotelPricesToProject = ({ handleChange }) => {
  return (
    <fieldset className='flex justify-center border border-orange-50 rounded-md border-dashed bg-black-50 p-5 my-5 '>
      <div className='w-[155px] ml-2'>
        <label htmlFor='DUInr'>Number of DUIs</label>
        <input
          name='DUInr'
          onChange={handleChange}
          type='number'
          className='px-3 py-1.5 text-gray-700 text-base border border-solid rounded'
        />
      </div>
      <div className='w-[170px] ml-2'>
        <label htmlFor='DUIprice'>DUI Price</label>
        <input
          name='DUIprice'
          onChange={handleChange}
          type='number'
          className='px-3 py-1.5 text-gray-700 text-base border border-solid rounded'
        />
      </div>
      <div className='w-[155px] ml-2'>
        <label htmlFor='DoubleRoomNr'>Number of Double Rooms</label>
        <input
          name='DoubleRoomNr'
          onChange={handleChange}
          type='number'
          className='px-3 py-1.5 text-gray-700 text-base border border-solid rounded'
        />
      </div>

      <div className='w-[180px] ml-2'>
        <label htmlFor='DoubleRoomPrice'>Rate per Double Room</label>
        <input
          name='DoubleRoomPrice'
          onChange={handleChange}
          type='number'
          className='px-3 py-1.5 text-gray-700 text-base border border-solid rounded'
        />
      </div>
      <div className='w-[180px] ml-2'>
        <label htmlFor='breakfast'>Breakfast</label>
        <input
          label='Breakfast'
          name='breakfast'
          onChange={handleChange}
          type='number'
          className='px-3 py-1.5 text-gray-700 text-base border border-solid rounded'
        />
      </div>
      <div className='w-[190px] ml-2'>
        <label htmlFor='DailyTax'>City Tax</label>
        <input
          name='DailyTax'
          type='number'
          onChange={handleChange}
          className='px-3 py-1.5 text-gray-700 text-base border border-solid rounded'
        />
      </div>
    </fieldset>
  )
}

export default AddHotelPricesToProject
