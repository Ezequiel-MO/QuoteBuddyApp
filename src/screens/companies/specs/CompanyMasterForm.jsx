import { useState } from 'react'
import {
	ModalPictures,
	RenderColorPalette
} from '../../../components/molecules'

import { CompanyFormFields } from './CompanyFormFields'

const CompanyMasterForm = ({
	clients,
	country,
	setCountry,
	data,
	setData,
	fileInput,
	handleSubmit,
	companyPath,
	validate,
	errors,
	setErrors
}) => {
	const [open, setOpen] = useState(false)
	const update = Object.keys(companyPath).length > 0 ? true : false

	const handleChange = (event) => {
		setData({
			...data,
			[event.target.name]: event.target.value
		})
		setErrors(
			validate({
				...data,
				[event.target.name]: event.target.value
			})
		)
	}

	const handleColor = (event) => {
		if (!data.colorPalette.includes(event.target.value)) {
			setData({
				...data,
				colorPalette: [...data.colorPalette, event.target.value]
			})
		}
	}

	function handleSelect(event) {
		setData({
			...data,
			employees:
				event.target.value === 'none'
					? data.employees
					: !data.employees.includes(event.target.value)
					? [...data.employees, event.target.value]
					: data.employees
		})
	}

	const handleDelete = (event) => {
		setData({
			...data,
			colorPalette: data.colorPalette.filter((el) => el !== event)
		})
	}

	const handleDeleteClient = (event) => {
		setData({
			...data,
			employees: data.employees.filter((el) => el !== event)
		})
	}

	return (
		<>
			<ModalPictures
				screen={companyPath}
				submitForm={handleSubmit}
				open={open}
				setOpen={setOpen}
				initialValues={data}
				multipleCondition={false}
				nameScreen="client_companies"
			/>

			<div className="block p-6 rounded-lg shadow-lg bg-white w-3/4">
				<form
					onSubmit={(event) => handleSubmit(event, fileInput.current ?? [])}
				>
					<CompanyFormFields
						data={data}
						handleChange={handleChange}
						errors={errors}
						country={country}
						setCountry={setCountry}
						clients={clients}
						handleSelect={handleSelect}
						handleDeleteClient={handleDeleteClient}
						handleColor={handleColor}
						update={update}
						fileInput={fileInput}
						setOpen={setOpen}
					/>
					<RenderColorPalette
						colors={data.colorPalette}
						handleDelete={handleDelete}
					/>
				</form>
			</div>
		</>
	)
}

export default CompanyMasterForm
