import TextInput from '../../../ui/inputs/TextInput'

const AddHotelPricesToProject = () => {
  return (
    <fieldset className='flex justify-center border border-orange-50 rounded-md border-dashed bg-black-50 p-5 my-5 '>
      <div className='w-[100px] '>
        <TextInput
          label='Number of DUIs'
          name='DUInr'
          placeholder='Ex. 40'
          type='number'
        />
      </div>
      <div className='w-[170px] ml-2'>
        <TextInput
          label='Rate per DUI'
          name='DUIprice'
          placeholder='Rate per night per room'
          type='number'
        />
      </div>
      <div className='w-[150px] ml-2'>
        <TextInput
          label='Breakfast'
          name='breakfast'
          placeholder='If included, enter 0'
          type='number'
        />
      </div>
      <div className='w-[180px] ml-2'>
        <TextInput
          label='Number of Double Rooms'
          name='DoubleRoomNr'
          placeholder='Number of Double Rooms'
          type='number'
        />
      </div>
      <div className='w-[180px] ml-2'>
        <TextInput
          label='Rate per Double Room'
          name='DoubleRoomPrice'
          placeholder='Rate per night per room'
          type='number'
        />
      </div>
      <div className='w-[190px] ml-2'>
        <TextInput
          label='City Tax'
          name='DailyTax'
          placeholder='City Tax p.person per night'
          type='number'
        />
      </div>
    </fieldset>
  )
}

export default AddHotelPricesToProject
