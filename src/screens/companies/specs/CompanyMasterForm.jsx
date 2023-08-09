import { useState, useEffect } from 'react'
import { ModalPictures, AddImagesModal } from '../../../components/molecules'
import { CompanyFormFields } from './CompanyFormFields'
import { useCompanyData } from './useCompanyData'
import { useImageState } from "../../../hooks"

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
	const [openAddModal, setOpenAddModal] = useState(false)
	const update = Object.keys(companyPath).length > 0 ? true : false
	const { selectedFiles, handleFileSelection, setSelectedFiles } = useImageState()

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
	useEffect(() => {
		setInitialData({ ...data })
	}, [data.employees])

	return (
		<>
			<AddImagesModal
				open={openAddModal}
				setOpen={setOpenAddModal}
				selectedFiles={selectedFiles}
				setSelectedFiles={setSelectedFiles}
				handleFileSelection={handleFileSelection}
				fileInput={fileInput}
				multipleCondition={false}
			/>
			<ModalPictures
				screen={companyPath}
				submitForm={handleSubmit}
				open={open}
				setOpen={setOpen}
				initialValues={data}
				multipleCondition={false}
				nameScreen="client_companies"
			/>

			<div className="block p-6 rounded-lg shadow-lg bg-black-50 2xl:w-3/4">
				<form
					onSubmit={(event) => handleSubmit(event, selectedFiles ?? [])}
					className="space-y-4"
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
						setOpen={update && setOpen || setOpenAddModal}
						setData={setData}
						selectedFiles={selectedFiles}
					/>
				</form>
			</div>
		</>
	)
}

export default CompanyMasterForm
