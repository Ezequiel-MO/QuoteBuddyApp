import { useEffect, useState } from 'react'
import baseAPI from '../../axios/axiosConfig'

const TransferVendorFilter = ({ setCompany, company, city }) => {
  const [options, setOptions] = useState([])

  useEffect(() => {
    const getTransferCompaniesByCity = async () => {
      const response = await baseAPI.get(`v1/transfers?city=${city}`)
      const companies = response.data.data.data.map(
        (transfer) => transfer.company
      )
      const uniqueCompanies = [...new Set(companies)]
      localStorage.setItem('companies', JSON.stringify(uniqueCompanies))
      setOptions(uniqueCompanies)
    }
    if (city) {
      getTransferCompaniesByCity()
    }
  }, [company, city])

  return (
    <div className='w-60 max-w-sm my-2 ml-0 mr-0'>
      <form>
        <div className='flex items-center gap-2'>
          <select
            id='company'
            value={company}
            className='flex-1 py-1 px-2 border-0 rounded-xl bg-green-50 text-center cursor-pointer'
            onChange={(e) => setCompany(e.target.value)}
          >
            <option value='none'>--- Filter by Vendor ---</option>
            {options.map((company) => (
              <option key={company} value={company}>
                {` --- ${company} --- `}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  )
}

export default TransferVendorFilter
