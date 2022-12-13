import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import baseAPI from '../../../axios/axiosConfig'
import { errorToastOptions, toastOptions } from '../../../helper/toast'
import RestaurantMasterForm from './RestaurantMasterForm'

const RestaurantSpecs = () => {
  const navigate = useNavigate()
  const {
    state: { restaurant }
  } = useLocation()

  const fillFormData = (values, files) => {
    let formData = new FormData()
    formData.append('name', values.name)
    formData.append('city', values.city)
    formData.append('textContent', JSON.stringify(values.textContent))
    formData.append('price', values.price)
    formData.append('location[coordinates][0]', values.latitude)
    formData.append('location[coordinates][1]', values.longitude)
    formData.append('isVenue', values.isVenue)
    // if(values?.imageContentUrl.length > 0){
    //   formData.append('imageUrls', values.imageContentUrl)
    // }
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
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append('imageContentUrl', files[i])
      }
    }
    return formData
  }

  const fillJSONData = (values) => {
    let jsonData = {}
    jsonData.name = values.name
    jsonData.city = values.city
    jsonData.textContent = JSON.stringify(values.textContent)
    jsonData.price = values.price
    jsonData.location = {
      type: 'Point',
      coordinates: [values.latitude, values.longitude]
    }
    jsonData.isVenue = values.isVenue

    return jsonData
  }

  const submitForm = async (values, files, endpoint, update) => {
    let dataToPost
    try {
      if (update === false) {
        dataToPost = fillFormData(values, files)
        await baseAPI.post('v1/restaurants', dataToPost)
        toast.success('Restaurant Created', toastOptions)
      } else if (endpoint == 'restaurants/image') {
        dataToPost = updateimageData(values, files)
        await baseAPI.patch(
          `v1/restaurants/images/${restaurant._id}`,
          dataToPost
        )
        toast.success('Restaurant images Updated', toastOptions)
      } else {
        dataToPost = fillJSONData(values)
        await baseAPI.patch(`v1/restaurants/${restaurant._id}`, dataToPost)
        toast.success('Restaurant Updated', toastOptions)
      }
      setTimeout(() => {
        navigate('/app/restaurant')
      }, 1000)
    } catch (error) {
      toast.error(
        `Error Creating/Updating Restaurant, ${error.response.data.message}`,
        errorToastOptions
      )
    }
  }

  return (
    <>
      <RestaurantMasterForm submitForm={submitForm} restaurant={restaurant} />
    </>
  )
}

export default RestaurantSpecs
