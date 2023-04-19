import { useState } from 'react'
import { Icon } from '@iconify/react'
import { CountryFilter } from '../../../ui'
import SelectClients from './SelectClients'
import {
	ModalPictures,
	RenderColorPalette
} from '../../../components/molecules'
import { TextInput } from '../../../ui/inputs/nativeInputs'

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
					<fieldset className="grid grid-cols-2 gap-4">
						<legend>
							<h1 className="text-2xl mb-4">General Company Data</h1>
						</legend>
						<div className="mb-6">
							<TextInput
								name="name"
								value={data.name}
								handleChange={handleChange}
								errors={errors.name}
							/>
							<label htmlFor="">Country</label>
							<CountryFilter
								name={'select country'}
								country={country}
								setCountry={setCountry}
							/>
							{country === 'none' && (
								<p className="bg-red-500 font-bold text-white-50">
									select country
								</p>
							)}
							<TextInput
								name="address"
								value={data.address}
								handleChange={handleChange}
								errors={errors.address}
							/>
							<label htmlFor="">employees</label>
							<SelectClients
								clients={clients}
								employees={data.employees}
								handleChange={handleSelect}
								data={data}
								handleDelete={handleDeleteClient}
							/>
							<label htmlFor="">Color</label>
							<input
								className="w-full
                              px-2
                              py-1
                              text-base
                              text-gray-700
                              border border-solid border-gray-300
                              rounded
                              focus:text-gray-700 focus:outline-none"
								type="color"
								placeholder="user given password"
								name="colorPalette"
								value={data.colorPalette[data.colorPalette.length - 1]}
								id={data.colorPalette[0]}
								onChange={handleColor}
							/>
							<TextInput
								name="fonts"
								value={data.fonts}
								handleChange={handleChange}
								errors={errors.fonts}
								placeholder='example Font Family: "Rockwell Extra Bold" , Arial , ...'
							/>
						</div>

						<div className="form-group mb-6">
							{!update && (
								<div
									className=" flex align-center justify-start"
									style={{ marginTop: '20px', marginLeft: '' }}
								>
									<label htmlFor="file-upload" className="custom-file-upload">
										<Icon icon="akar-icons:cloud-upload" width="40" />
									</label>
									<input
										className="absolute"
										style={{ marginLeft: '45px' }}
										id="file-upload"
										type="file"
										placeholder="user given email"
										name="imageContentUrl"
										multiple
										ref={fileInput}
									/>
								</div>
							)}
						</div>
						<input
							type="submit"
							className="cursor-pointer py-2 px-10 hover:bg-gray-600 bg-green-50 text-black-50 hover:text-white-50 fonrt-bold uppercase rounded-lg"
							value={!update ? 'Save new form Company' : 'Edit form Company'}
						/>
						{update && (
							<div className="flex align-center justify-start">
								<input
									onClick={() => setOpen(true)}
									type="button"
									className="cursor-pointer py-2 px-10 hover:bg-gray-600 bg-green-50 text-black-50 hover:text-white-50 fonrt-bold uppercase rounded-lg"
									value="Show images"
								/>
							</div>
						)}
					</fieldset>
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
