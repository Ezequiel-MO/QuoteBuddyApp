import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import baseAPI from '../../../axios/axiosConfig'
import { errorToastOptions, toastOptions } from '../../../helper/toast'
import AccManagerMasterForm from './AccManagerMasterForm'

const AccManagerSpecs = () => {
  const navigate = useNavigate()
  const {
    state: { accManager }
  } = useLocation()

  const fillFormData = (values, files) => {
    let formData = new FormData()
    formData.append('firstName', values.firstName)
    formData.append('familyName', values.familyName)
    formData.append('email', values.email)
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append('imageContentUrl', files[i])
      }
    }
    return formData
  }

  const updateimageData = (values, files) => {
    let formData = new FormData()
    if (values?.imageContentUrl.length > 0) {
      formData.append('imageUrls', values.imageContentUrl)
    }
    if (values?.deletedImage?.length > 0) {
      formData.append('deletedImage', values.deletedImage)
    }
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append('imageContentUrl', files[i])
      }
    }
    return formData
  }

  const fillJSONData = (values) => {
    let jsonData = {}
    jsonData.firstName = values.firstName
    jsonData.familyName = values.familyName
    jsonData.email = values.email
    return jsonData
  }

  const submitForm = async (values, files, endpoint, update) => {
    let dataToPost
    try {
      if (update === false) {
        dataToPost = fillFormData(values, files)
        await baseAPI.post('v1/accManagers', dataToPost)
        toast.success('Account Manager Created', toastOptions)
      }
      if(endpoint === "accManagers/image" ){
        dataToPost = updateimageData(values, files)
        await baseAPI.patch(`v1/accManagers/images/${accManager._id}`,dataToPost)
      }
      if(update === true){
        dataToPost = fillJSONData(values)
        await baseAPI.patch(`v1/accManagers/${accManager._id}`, dataToPost)
        toast.success('Account Manager Updated', toastOptions)
      }
      setTimeout(() => {
        navigate('/app/accManager')
      }, 1000)
    } catch (error) {
      toast.error(
        `Error Creating/Updating Account Manager, ${error.response.data.message}`,
        errorToastOptions
      )
    }
  }

  return (
    <>
      <AccManagerMasterForm submitForm={submitForm} accManager={accManager} />
    </>
  )
}

export default AccManagerSpecs
