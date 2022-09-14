import { useLocation, useNavigate } from 'react-router-dom'
import { postToEndpoint } from '../../../helper/PostToEndpoint'
import HotelMasterForm from './HotelMasterForm'

const HotelSpecs = () => {
  const navigate = useNavigate()
  const {
    state: { hotel }
  } = useLocation()

  const fillFormData = (values, files) => {
    let formData = new FormData()
    formData.append('name', values.name)
    formData.append('city', values.city)
    formData.append('address', values.address)
    formData.append('numberStars', values.numberStars)
    formData.append('numberRooms', values.numberRooms)
    formData.append('checkin_out', values.checkin_out)
    formData.append('wheelChairAccessible', values.wheelChairAccessible)
    formData.append('wifiSpeed', values.wifiSpeed)
    formData.append('swimmingPool', values.swimmingPool)
    formData.append('restaurants', values.restaurants)
    formData.append('textContent', JSON.stringify(values.textContent))
    formData.append('meetingRooms', values.meetingRooms)
    formData.append('location[coordinates][0]', values.latitude)
    formData.append('location[coordinates][1]', values.longitude)

    for (let i = 0; i < files.length; i++) {
      formData.append('imageContentUrl', files[i])
    }
    return formData
  }

  const fillJSONData = (values) => {
    let jsonData = {}

    jsonData.name = values.name
    jsonData.city = values.city
    jsonData.address = values.address
    jsonData.numberStars = values.numberStars
    jsonData.numberRooms = values.numberRooms
    jsonData.meetingRooms = values.meetingRooms
    jsonData.checkin_out = values.checkin_out
    jsonData.wheelChairAccessible = values.wheelChairAccessible
    jsonData.wifiSpeed = values.wifiSpeed
    jsonData.swimmingPool = values.swimmingPool
    jsonData.restaurants = values.restaurants
    jsonData.textContent = values.textContent
    jsonData.location = {
      type: 'Point',
      coordinates: [values.latitude, values.longitude]
    }

    return jsonData
  }

  const submitForm = (values, files, endpoint, update) => {
    let dataToPost
    if (update === false) {
      dataToPost = fillFormData(values, files)
    } else {
      dataToPost = fillJSONData(values)
      console.log('data to port', dataToPost)
    }
    postToEndpoint(dataToPost, endpoint, 'Hotel', hotel._id, update)
    setTimeout(() => {
      navigate('/app/hotel')
    }, 1000)
  }

  return (
    <div>
      <HotelMasterForm submitForm={submitForm} hotel={hotel} />
    </div>
  )
}

export default HotelSpecs
