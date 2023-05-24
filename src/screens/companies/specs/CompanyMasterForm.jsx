import { useState , useEffect } from 'react'
import { ModalPictures } from '../../../components/molecules'
import { CompanyFormFields } from './CompanyFormFields'
import { useCompanyData } from './useCompanyData'

const CompanyMasterForm = ({
	clients,
	country,
	setCountry,
	data: initialData,
	setData: setInitialData,
	fileInput,
	handleSubmit,
	companyPath,
	validate,
	errors,
	setErrors
}) => {
	const [open, setOpen] = useState(false)
	const update = Object.keys(companyPath).length > 0 ? true : false

	const {
		data,
		setData,
		handleChange,
		handleColor,
		handleSelect,
		handleDeleteColor,
		handleDeleteClient
	} = useCompanyData(initialData, setInitialData, validate, setErrors)

	//este useEffect sirve cuando crea un "Client" en el "ModalClient...jsx"
	useEffect(()=>{
		setInitialData({...data})
	},[data.employees])

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
						handleDelete={handleDeleteColor}
						handleDeleteClient={handleDeleteClient}
						handleColor={handleColor}
						update={update}
						fileInput={fileInput}
						setOpen={setOpen}
						setData={setData}
					/>
				</form>
			</div>
		</>
	)
}

export default CompanyMasterForm
