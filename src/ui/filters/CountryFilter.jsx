import { useGetCountries } from '../../hooks'

export const CountryFilter = ({ setCountry, country ,name }) => {
  const { countries: options } = useGetCountries()
  return (
    <div className='w-60 max-w-sm my-2 ml-0 mr-0'>
      <form>
        <div className='flex items-center gap-2'>
          <select
            id='country'
            className='flex-1 py-1 px-2 border-0 rounded-xl bg-green-50 text-center cursor-pointer'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value='none'>
              {name ? name :  "--- Filter by country ---"}
            </option>
            {options?.map((option) => (
              <option key={option._id} value={option.accessCode}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  )
}
