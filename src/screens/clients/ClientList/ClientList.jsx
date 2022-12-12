import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CountryFilter from '../../../ui/filters/CountryFilter'
import Spinner from '../../../ui/spinner/Spinner'
import ClientListItem from './ClientListItem'
import TableHeaders from '../../../ui/TableHeaders'
import SearchInput from '../../../ui/inputs/SearchInput'
import { useCurrentInvoice, useGetClients } from '../../../hooks'

const ClientList = () => {
  const navigate = useNavigate()
  const [client] = useState({})
  const [country, setCountry] = useState('')
  const [searchItem, setSearchItem] = useState('')
  const { clients, setClients, isLoading } = useGetClients(country)
  const [foundClients, setFoundClients] = useState([])

  const { changePostingStatus } = useCurrentInvoice()

  useEffect(() => {
    setFoundClients(clients)
  }, [clients])

  const filterList = (e) => {
    setSearchItem(e.target.value)
    const result = clients.filter(
      (data) =>
        data.firstName.toLowerCase().includes(e.target.value.toLowerCase()) ||
        data.familyName.toLowerCase().includes(e.target.value.toLowerCase())
    )
    setFoundClients(result)
    if (searchItem === '') {
      setFoundClients(clients)
    }
  }

  const handleClick = () => {
    changePostingStatus('posting')
    navigate('/app/client/specs', { state: { client } })
  }
  const clientList = foundClients?.map((client) => (
    <ClientListItem
      key={client._id}
      client={client}
      clients={clients}
      setClients={setClients}
    />
  ))

  return (
    <>
      <div className='flex flex-col sm:flex-row sm:items-end items-start sm:space-x-6 mb-4 mr-8 ml-8'>
        <div className='flex flex-col w-full'>
          <h1 className='text-2xl'>Client List</h1>
          <div className='flex flex-row justify-start items-center'>
            <div>
              <CountryFilter setCountry={setCountry} country={country} />
            </div>
            <button
              onClick={handleClick}
              className='mx-5 focus:scale-110 hover:animate-pulse bg-transparent hover:bg-orange-50 text-white-100 uppercase font-semibold hover:text-black-50 py-2 px-4 border border-orange-50 hover:border-transparent rounded'
            >
              Create New Client
            </button>
            <SearchInput searchItem={searchItem} filterList={filterList} />
          </div>
        </div>
      </div>
      <hr />
      <div className='flex flex-row'>
        {isLoading ? (
          <Spinner />
        ) : (
          <table className='w-full p-5'>
            <TableHeaders headers='client' />
            {clientList}
          </table>
        )}
      </div>
    </>
  )
}

export default ClientList
