import useManageTransferOptions from './useManageTransferOptions'

const TransferServiceFilter = ({ transfers, service, setService }) => {
  const { options } = useManageTransferOptions(transfers)
  return (
    <div className='w-60 max-w-sm my-2 ml-0 mr-0'>
      <div className='flex items-center gap-2'>
        <select
          id='transferService'
          value={service}
          className='flex-1 py-1 px-2 border-0 rounded-xl bg-green-50 text-center cursor-pointer'
          onChange={(e) => setService(e.target.value)}
        >
          <option value=''>--- Type of Service ---</option>
          {options.map((option) => {
            const [key, value] = Object.entries(option)[0]
            return (
              <option key={key} value={key}>
                {value}
              </option>
            )
          })}
        </select>
      </div>
    </div>
  )
}

export default TransferServiceFilter
