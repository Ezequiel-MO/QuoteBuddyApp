import { IEntertainment, IEntertainmentPrice, IRestaurant } from '../../../../../interfaces'
import { Icon } from '@iconify/react'
import { EntertainmentBreakdownRow } from './EntertainmentBreakdownRow'

interface Props {
  entertainment: IEntertainment
  isOpen: boolean
  date: string
  selectedRestaurant: IRestaurant
  typeMeal: 'lunch' | 'dinner'
  setEntertainment: React.Dispatch<React.SetStateAction<IEntertainment>>
}

export const EntertainmentBreakdownRows = ({
  entertainment,
  isOpen,
  date,
  selectedRestaurant,
  setEntertainment,
  typeMeal
}: Props) => {

  return (
    <tr>
      <td colSpan={6} className='p-0 bg-transparent relative'>
        <div
          className={
            `transition-all duration-700 ease-in-out overflow-hidden ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`
          }
        >
          <table className='w-full'>
            <div
              className='absolute inset-0 flex items-center justify-center opacity-40 dark:opacity-20 z-0'
              style={{ pointerEvents: "none" }}
            >
              <Icon
                icon='icon-park-outline:entertainment'
                width={240}
              />
            </div>
            <thead className='text-white-100 bg-zinc-800'>
              <tr>
                <th align='center'>Description</th>
                <th align='center'></th>
                <th align='center'></th>
                <th align='center'></th>
                <th align='center'>Cost</th>
              </tr>
            </thead>
            <tbody className='text-[#000] bg-white-100 dark:bg-[#a9ba9d]'>
              <EntertainmentBreakdownRow
                title='Artist Fee'
                date={date}
                entertaiment={entertainment}
                keyEntertainmentPrice="artistsFee"
                selectedRestaurant={selectedRestaurant}
                typeMeal={typeMeal}
                setEntertainment={setEntertainment}
              />
              <EntertainmentBreakdownRow
                title='AudioVisuals'
                date={date}
                entertaiment={entertainment}
                keyEntertainmentPrice='aavv'
                selectedRestaurant={selectedRestaurant}
                typeMeal={typeMeal}
                setEntertainment={setEntertainment}
              />
              <EntertainmentBreakdownRow
                title='Lighting'
                date={date}
                entertaiment={entertainment}
                keyEntertainmentPrice='lighting'
                selectedRestaurant={selectedRestaurant}
                typeMeal={typeMeal}
                setEntertainment={setEntertainment}
              />
              <EntertainmentBreakdownRow
                title='Travel Allowance'
                date={date}
                entertaiment={entertainment}
                keyEntertainmentPrice='travelAllowance'
                selectedRestaurant={selectedRestaurant}
                typeMeal={typeMeal}
                setEntertainment={setEntertainment}
              />
              <EntertainmentBreakdownRow
                title='Meal Allowance'
                date={date}
                entertaiment={entertainment}
                keyEntertainmentPrice='mealAllowance'
                selectedRestaurant={selectedRestaurant}
                typeMeal={typeMeal}
                setEntertainment={setEntertainment}
              />
              <EntertainmentBreakdownRow
                title='TOTAL COST'
                date={date}
                entertaiment={entertainment}
                keyEntertainmentPrice='other'
                selectedRestaurant={selectedRestaurant}
                typeMeal={typeMeal}
                setEntertainment={setEntertainment}
              />
            </tbody>
          </table>
        </div>
      </td>
    </tr>
  )
}
