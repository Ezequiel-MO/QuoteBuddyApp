import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import baseAPI from '../../../axios/axiosConfig'
import { errorToastOptions, toastOptions } from '../../../helper/toast'
import UserMasterForm from "./UserMasterForm"

const validate = (input)=>{
    const errors={}
    if(!input.name){
        errors.name = "required name"
    }
	if(!input.email){
		errors.email = "required email"
	}
	if(!input.password){
		errors.password = "required password"
	}
    return errors
}


const UserSpecs = () => {
	const navigate = useNavigate()
	const { state: { user } } = useLocation()

	const update = Object.keys(user).length > 0 ? true : false

	const [data, setData] = useState({
		name: user.name || "",
		email: user.email || "",
		password: user.password || "",
	})
	const [errors , setErrors] = useState({})

	const arrErrors = Object.values(errors)
	const arrData = Object.values(data)
	
	const submitForm = async (event) => {
		event.preventDefault();
		try {
			if(arrErrors.length > 0 || arrData(data).includes("")){
				toast.error(" complete the form",errorToastOptions)
			}
			if(!update){
				await baseAPI.post('v1/users/signup', data)
				toast.success('User Created', toastOptions)
			}
			if(update){
				await baseAPI.patch(`v1/users/${user._id}`, data)
				toast.success('User Updated', toastOptions)
			}
			setTimeout(() => {
				navigate('/app/user')
			}, 1000)
		} catch (err) {
			toast.error(`Error Creating/Updating User, ${err.response.data.msg}`,
				errorToastOptions)
		}
	}

	return (
		<>

			<UserMasterForm
				user={user}
				data={data}
				setData={setData}
				handleSubmit={submitForm}
				validate={validate}
				errors={errors}
				setErrors={setErrors}
			/>

		</>
	)

}

export default UserSpecs