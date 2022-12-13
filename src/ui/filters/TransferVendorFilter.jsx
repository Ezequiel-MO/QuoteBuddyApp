import { useGetTransferCompaniesByCity } from '../../hooks'

export const TransferVendorFilter = ({ setCompany, company, city }) => {
  const { companies } = useGetTransferCompaniesByCity(city)
  return (
    <div className='w-60 max-w-sm my-2 ml-0 mr-0'>
      <div className='flex items-center gap-2'>
        <select
          id='company'
          value={company}
          className='flex-1 py-1 px-2 border-0 rounded-xl bg-green-50 text-center cursor-pointer'
          onChange={(e) => setCompany(e.target.value)}
        >
          <option value='none'>--- Filter by Vendor ---</option>
          {companies.map((company) => (
            <option key={company} value={company}>
              {` --- ${company} --- `}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
