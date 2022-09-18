import EventMasterForm from './EventMasterForm'
import { useLocation, useNavigate } from 'react-router-dom'
import baseAPI from '../../../axios/axiosConfig'
import { toast } from 'react-toastify'
import { errorToastOptions, toastOptions } from '../../../helper/toast'

const EventSpecs = () => {
  const navigate = useNavigate()
  const {
    state: { event }
  } = useLocation()

  const fillFormData = (values, files) => {
    let formData = new FormData()
    formData.append('name', values.name)
    formData.append('city', values.city)
    formData.append('textContent', JSON.stringify(values.textContent))
    formData.append('price', values.price)
    formData.append('location[coordinates][0]', values.latitude)
    formData.append('location[coordinates][1]', values.longitude)
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

    return jsonData
  }

  const submitForm = async (values, files, endpoint, update) => {
    let dataToPost
    try {
      if (update === false) {
        dataToPost = fillFormData(values, files)
        await baseAPI.post('v1/events', dataToPost)
        toast.success('Event Created', toastOptions)
      } else {
        dataToPost = fillJSONData(values)
        await baseAPI.patch(`v1/events/${event._id}`, dataToPost)
        toast.success('Event Updated', toastOptions)
      }
      setTimeout(() => {
        navigate('/app/event')
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
      <EventMasterForm submitForm={submitForm} event={event} />
    </>
  )
}

export default EventSpecs
