import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import baseAPI from '../../../axios/axiosConfig'
import { errorToastOptions, toastOptions } from '../../../helper/toast'
import TransferMasterForm from './TransferMasterForm'

const TransferSpecs = () => {
  const navigate = useNavigate()
  const {
    state: { transfer }
  } = useLocation()

  const submitForm = async (values, endpoint, update) => {
    try {
      if (update === false) {
        await baseAPI.post('v1/transfers', values)
        toast.success('Transfer Created', toastOptions)
      } else {
        await baseAPI.patch(`v1/transfers/${transfer._id}`, values)
        toast.success('Transfer Updated', toastOptions)
      }
      setTimeout(() => {
        navigate('/app/transfer')
      }, 1000)
    } catch (error) {
      toast.error(
        `Error Creating/Updating Transfer, ${error.response.data.message}`,
        errorToastOptions
      )
    }
  }

  return (
    <>
      <TransferMasterForm submitForm={submitForm} transfer={transfer} />
    </>
  )
}

export default TransferSpecs
