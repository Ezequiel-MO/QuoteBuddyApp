import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import baseAPI from '../../../axios/axiosConfig'
import { errorToastOptions, toastOptions } from '../../../helper/toast'
import CountryMasterForm from './CountryMasterForm'

const CountrySpecs = () => {
	const navigate = useNavigate()
	const {
		state: { country }
	} = useLocation()

	const submitForm = async (values, endpoint, update) => {
		try {
			if (update === false) {
				await baseAPI.post('countries', values)
				toast.success('Country Created', toastOptions)
			} else {
				await baseAPI.patch(`countries/${country._id}`, values)
				toast.success('Country Updated', toastOptions)
			}
			setTimeout(() => {
				navigate('/app/country')
			}, 1000)
		} catch (error) {
			toast.error(
				`Error Creating/Updating Country, ${error.response.data.message}.`,
				errorToastOptions
			)
		}
	}
	return (
		<>
			<CountryMasterForm submitForm={submitForm} country={country} />
		</>
	)
}

export default CountrySpecs
