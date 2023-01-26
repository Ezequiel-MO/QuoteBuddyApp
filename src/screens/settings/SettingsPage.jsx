import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import baseAPI from '../../axios/axiosConfig'
import { errorToastOptions, toastOptions } from '../../helper/toast'
import { Toggle } from '../../ui'
import SettingsForm from './SettingsForm'

const SettingsPage = () => {
	const fileInput = useRef()
	const navigate = useNavigate()
	const [check, setCheck] = useState(false)

	const [data, setData] = useState({
		name: '',
		colorPalette: [],
		font: ''
	})

	const submitForm = async (event) => {
		event.preventDefault()
		try {
			await baseAPI.post('v1/company_features', data)
			toast.success('Company Features Created', toastOptions)
			navigate('/app/project')
		} catch (err) {
			toast.error(
				`Error Creating/Updating Company Features, ${err.response.data.msg}`,
				errorToastOptions
			)
		}
	}

	return (
		<div>
			<Toggle check={check} setCheck={setCheck} />
			{check && (
				<SettingsForm
					data={data}
					setData={setData}
					fileInput={fileInput}
					handleSubmit={submitForm}
				/>
			)}
		</div>
	)
}

export default SettingsPage
