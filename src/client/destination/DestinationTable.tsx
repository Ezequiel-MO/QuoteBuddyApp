import { ILocation } from '../../interfaces/location'

interface Props {
  locationObj: ILocation
}

export const DestinationTable = ({ locationObj }: Props) => {
  const { corporateFacts } = locationObj || {}
  return (
    <div className='py-8'>
      <h2 className='text-2xl font-semibold mb-4'>Corporate Event Details</h2>
      <table className='w-full text-left border-collapse '>
        <thead className='dark:text-black-50'>
          <tr className='bg-gray-100'>
            <th className='px-4 py-2 text-black-50'>Category</th>
            <th className='px-4 py-2 text-black-50'>Details</th>
          </tr>
        </thead>
        <tbody className='text-black-50 font-extrabold'>
          {corporateFacts?.map((fact, index) => (
            <tr className='border-t bg-slate-400 opacity-70' key={index}>
              <td className='px-4 py-2'>{fact.title}</td>
              <td className='px-4 py-2'>{fact.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
