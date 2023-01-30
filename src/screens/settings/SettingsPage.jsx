import { useState, useRef } from "react"
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import baseAPI from '../../axios/axiosConfig'
import { errorToastOptions, toastOptions } from '../../helper/toast'
import { Toggle } from '../../ui'
import SettingsForm from "./SettingsForm"



const SettingsPage = () => {
  const fileInput = useRef()
  const navigate = useNavigate()

  const [check, setCheck] = useState(false)

  const [data, setData] = useState({
    name: "",
    colorPalette: [],
    fonts: "",
  })



  const submitForm = async (event ,files) => {
    event.preventDefault();
    try {
      let formData = new FormData()
      formData.append("name" , data.name)
      if(data.colorPalette.length > 0){
        for(let i=0 ; i<data.colorPalette.length; i++){
          formData.append("colorPalette" , data.colorPalette[i])
        }
      }
        for (let i = 0; i < files.files.length; i++) {
          formData.append('imageContentUrl', files.files[i])
        }
      if(data.fonts.length > 0){
        const fonts = data.fonts.split(",").filter(el=> el !== " ")
        for(let i=0; i < fonts.length; i++){
          formData.append("fonts" , fonts[i])
        }
      }
      await baseAPI.post('v1/company_features',formData)
      toast.success('Company Features Created', toastOptions)
      setTimeout(() => {
				navigate('/app/project')
			}, 1000)
    } catch (err) {
      console.log(err.response);
      toast.error(`Error Creating/Updating User, ${err.response.data.msg}`,
        errorToastOptions)
    }
  }

  return (
    <div>
      <Toggle check={check} setCheck={setCheck} />
      {
        check &&
        <SettingsForm
          data={data}
          setData={setData}
          fileInput={fileInput}
          handleSubmit={submitForm}
        />
      }
    </div>
  )
}

export default SettingsPage
