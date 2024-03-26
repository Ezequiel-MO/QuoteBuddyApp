import { Icon } from '@iconify/react'

interface Props {
  groupLocation: string
}

export const DestinationHeader = ({ groupLocation }: Props) => {
  return (
    <div className='w-full my-2 p-4 bg-gradient-to-r from-primary to-secondary text-white-0'>
      <h2 className='text-3xl font-bold'>{groupLocation}</h2>
      <div className='flex items-center mt-2'>
        <Icon icon='mdi:map-marker' className='w-6 h-6' />
        <span className='ml-2'>Corporate Events Destination</span>
      </div>
    </div>
  )
}
