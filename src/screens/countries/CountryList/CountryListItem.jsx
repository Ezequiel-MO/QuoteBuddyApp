import { useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { removeItemFromList } from '../../../helper/RemoveItemFromList'

const CountryListItem = ({ country, countries, setCountries }) => {
  const navigate = useNavigate()

  return (
    <tbody>
      <tr className='mb-2 p-1 bg-gray-900 hover:bg-green-100 hover:text-black-50 rounded-md text-white-50'>
        <td
          onClick={() =>
            navigate(`/app/country/specs`, {
              state: { country }
            })
          }
          className='hover:text-blue-600 hover:underline cursor-pointer'
        >
          {country.name}{' '}
        </td>
        <td>{country.accessCode}</td>
        <td>{country.quoteLanguage}</td>
        <td className='cursor-pointer'>
          <button
            disabled
            onClick={() =>
              removeItemFromList(
                'countries',
                country._id,
                setCountries,
                countries
              )
            }
          >
            <Icon icon='fluent:delete-16-regular' color='#ea5933' />
          </button>
        </td>
      </tr>
    </tbody>
  )
}

export default CountryListItem
