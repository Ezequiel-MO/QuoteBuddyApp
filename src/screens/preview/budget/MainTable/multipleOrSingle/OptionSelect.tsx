import { Icon } from '@iconify/react'
import {
  IEntertainment,
  IEvent,
  IGift,
  IHotel,
  IRestaurant
} from '../../../../interfaces'

interface OptionSelectProps {
  options: IEvent[] | IRestaurant[] | IHotel[] | IGift[] | IEntertainment[]
  value: string
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export const OptionSelect = ({
  options,
  value,
  handleChange
}: OptionSelectProps) => {
  return (
    <div className='min-w-[120px] relative text-black-50 py-1'>
      <div className='min-w-[15rem]'>
        <select
          value={value || ''}
          onChange={handleChange}
          className='my-2 dark:text-black-50 appearance-none bg-white-100 border border-gray-200 rounded-md shadow-sm py-2 pl-3 pr-10 w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-300'
        >
          {options.map((option) => (
            <option key={option._id} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
        <Icon
          icon='mdi:chevron-down'
          className='printable-icon absolute top-1/2 right-3 text-gray-500 transform -translate-y-1/2 pointer-events-none'
          color='#ea5933'
          width='1em'
          height='1em'
        />
      </div>
    </div>
  )
}
