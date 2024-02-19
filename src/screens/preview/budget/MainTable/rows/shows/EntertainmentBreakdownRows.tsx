import { IEntertainment, IEntertainmentPrice } from '../../../../../interfaces'
import { Icon } from '@iconify/react'
import { EntertainmentBreakdownRow } from './EntertainmentBreakdownRow'

interface Props {
  entertainment: IEntertainment
  isOpen: boolean
}

export const EntertainmentBreakdownRows = ({
  entertainment,
  isOpen
}: Props) => {
  const { artistsFee, aavv, lighting, travelAllowance, mealAllowance } =
    entertainment?.price as IEntertainmentPrice

  return (
    <tr
      className={`transition-all duration-500 ease-in-out ${
        isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <td colSpan={6} className='p-0 bg-transparent relative'>
        {isOpen && (
          <>
            <Icon
              icon='icon-park-outline:entertainment'
              width={250}
              className='absolute inset-0 mx-auto opacity-10 dark:opacity-20 z-0'
            />
            <table className='w-full'>
              <thead className='text-white-100 bg-zinc-800'>
                <tr>
                  <th align='center'>Description</th>
                  <th align='center'></th>
                  <th align='center'></th>
                  <th align='center'></th>
                  <th align='center'>Total Cost</th>
                </tr>
              </thead>
              <tbody className='text-[#000] bg-white-100 dark:bg-[#a9ba9d]'>
                <EntertainmentBreakdownRow
                  title='Artist Fee'
                  rate={artistsFee}
                />
                <EntertainmentBreakdownRow title='AudioVisuals' rate={aavv} />
                <EntertainmentBreakdownRow title='Lighting' rate={lighting} />
                <EntertainmentBreakdownRow
                  title='Travel Allowance'
                  rate={travelAllowance}
                />
                <EntertainmentBreakdownRow
                  title='Meal Allowance'
                  rate={mealAllowance}
                />
              </tbody>
            </table>
          </>
        )}
      </td>
    </tr>
  )
}
