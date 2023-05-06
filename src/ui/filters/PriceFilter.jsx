export const PriceFilter = ({ setPrice, price ,otherPrices }) => {
  
  if(otherPrices){
    return(
      <div className='w-60 max-w-sm my-2 ml-0 mr-0'>
        <div className='flex items-center gap-2'>
          <select
            id='price'
            className='flex-1 py-1 px-2 border-0 rounded-xl bg-green-50 text-center cursor-pointer'
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          >
            <option value='none'>--- Filter by price(all) ---</option>
            {
              otherPrices.map((el,index)=>(
                <option value={el.value} key={index} >{el.name}</option>
              ))
            }
          </select>
        </div>
    </div>
    )
  }

  return (
    <div className='w-60 max-w-sm my-2 ml-0 mr-0'>
      <form>
        <div className='flex items-center gap-2'>
          <select
            id='price'
            className='flex-1 py-1 px-2 border-0 rounded-xl bg-green-50 text-center cursor-pointer'
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          >
            <option value='none'>--- Filter by price ---</option>
            <option value={25}>Less than €25</option>
            <option value={40}>Less than €40</option>
            <option value={60}>Less than €60</option>
          </select>
        </div>
      </form>
    </div>
  )
}
