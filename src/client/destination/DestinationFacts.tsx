import { Icon } from '@iconify/react'
import { ILocation } from '../../interfaces/location'

interface Props {
  locationObj: ILocation
}

export const DestinationFacts = ({ locationObj }: Props) => {
  const { inFigures, name } = locationObj || {}

  return (
    <div className='w-full p-4 grid grid-cols-1 sm:grid-cols-2 gap-4'>
      <h3 className='text-2xl font-bold col-span-full'>
        <Icon icon='raphael:list' className='w-6 h-6 inline-block' />
        <span className='ml-2'>{`${name} In Figures`}</span>
      </h3>
      {inFigures?.map((fact, index) => (
        <div
          key={index}
          className='flex items-center space-x-2 p-4 border rounded-lg bg-gray-100 border-dashed dark:bg-gray-800'
        >
          <Icon
            icon='material-symbols:check-box'
            className='w-4 h-4 dark:text-white-0 text-black-50'
          />
          <span className='dark:text-white-0 text-black-50 text-lg'>
            <strong>{fact.title}:</strong> {fact.description}
          </span>
        </div>
      ))}
    </div>
  )
}
