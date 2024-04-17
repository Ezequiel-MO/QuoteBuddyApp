import { useState } from 'react'
import accounting from 'accounting'
import { EditableCellVenue } from "./EditableCellVenue"
import { useContextBudget } from '../../../context/BudgetContext'
import { getDayIndex, existRestaurant } from "../../../helpers"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


interface Props {
  date: string
  id: 'lunch' | 'dinner'
  restaurantId: string
  units: number
  title: string
  rate: number
  keyVenueUnit:
  | "cocktail_units"
  | "catering_units"
  | "staff_units"
  | "unit"
  keyVenuePrice:
  | "rental"
  | "cocktail_price"
  | "catering_price"
  | "catering_price"
  | "staff_menu_price"
  | "audiovisuals"
  | "cleaning"
  | "security"
  | "entertainment"
}


type KeyVenueUpdate =
  | "cocktail_units"
  | "catering_units"
  | "staff_units"
  | "unit"
  | "rental"
  | "cocktail_price"
  | "catering_price"
  | "catering_price"
  | "staff_menu_price"
  | "audiovisuals"
  | "cleaning"
  | "security"
  | "entertainment"

type KeyVenue =
  | "cocktail_units"
  | "catering_units"
  | "staff_units"
  | "rental"
  | "cocktail_price"
  | "catering_price"
  | "catering_price"
  | "staff_menu_price"
  | "audiovisuals"
  | "cleaning"
  | "security"
  | "entertainment"


export const VenueBreakdownRow = ({
  date,
  id,
  restaurantId,
  units,
  title,
  rate,
  keyVenueUnit,
  keyVenuePrice
}: Props) => {
  const mySwal = withReactContent(Swal)

  const { dispatch, state } = useContextBudget()

  const [venue, setVenue] = useState({
    [keyVenueUnit]: units,
    [keyVenuePrice]: rate
  })

  const titles = ["cleaning", "audiovisual equipment", "full day rental rate", "security", "entertainment"]


  const handleUpdate = async (value: number, KeyVenueUpdate: KeyVenueUpdate, type: "unit" | "price") => {
    try {
      if (!restaurantId) throw Error("restaurant not found")
      const dayIndex = getDayIndex(date, state)
      existRestaurant(dayIndex, state, id, restaurantId)
      dispatch({
        type: "UPDATE_RESTAURANT_VENUE",
        payload: {
          value: type === "unit" ? Math.round(value) : value,
          dayIndex,
          restaurantId,
          keyVenue: KeyVenueUpdate as KeyVenue,
          typeMeal: id
        }
      })
      setVenue(prev => ({
        ...prev,
        [KeyVenueUpdate]: type === "unit" ? Math.round(value) : value
      }))
    } catch (error: any) {
      console.log(error)
      await mySwal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonColor: 'green',
        allowEnterKey: false
      })
    }
  }


  // if (units === 0 || rate === 0) return null

  return (
    <tr className='border-b border-gray-200 hover:bg-gray-100 hover:text-[#000]'>
      <th scope='row' className='py-3 px-6 text-left whitespace-nowrap flex items-center font-medium'>
        {title}
      </th>
      <td className='text-center'>
        {
          titles.includes(title.toLowerCase()) ?
            <span className='bg-orange-50 text-[#fff] font-extrabold py-1 px-3 rounded-full text-sm'>
              {venue[keyVenueUnit]}
            </span>
            :
            <EditableCellVenue
              typeValue='unit'
              value={venue[keyVenueUnit]}
              onSave={(newValue) => handleUpdate(newValue, keyVenueUnit, "unit")}
            />
        }
      </td>
      <td></td>
      <td className='text-center'>
        <EditableCellVenue
          typeValue='price'
          value={venue[keyVenuePrice]}
          onSave={(newValue) => handleUpdate(newValue, keyVenuePrice, "price")}
        />
      </td>
      <td className='text-center'>
        {accounting.formatMoney(venue[keyVenueUnit] * venue[keyVenuePrice], '€')}
      </td>
    </tr>
  )
}
