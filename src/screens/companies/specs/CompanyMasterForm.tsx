import React, { useState, useEffect, FC } from 'react'
import { ModalPictures, AddImagesModal } from '../../../components/molecules'
import { CompanyFormFields } from './CompanyFormFields'
import { useCompanyData } from './useCompanyData'
import { useImageState } from '../../../hooks'
import { SubmitInput, ShowImagesButton } from '../../../components/atoms'
import { IClientCompany } from "src/interfaces/clientCompany"
import { IClient } from "@interfaces/client"

type SubmitFormType = (
	event: React.FormEvent<HTMLFormElement>,
	files: File[],
	endpoint: string,
) => void

interface CompanyMasterFormProps {
	initialData: IClientCompany
	setInitialData: React.Dispatch<React.SetStateAction<any>>
	clients: IClient[]
	country: string
	setCountry: React.Dispatch<React.SetStateAction<string>>
	fileInput: React.RefObject<HTMLInputElement>
	submitForm: SubmitFormType
	companyPath: any
	validate: (input: { [key: string]: string | undefined }) => object
	errors: { [key: string]: string | undefined }
	setErrors: React.Dispatch<React.SetStateAction<any>>
}

const CompanyMasterForm: FC<CompanyMasterFormProps> = ({
	clients,
	country,
	setCountry,
	initialData,
	setInitialData,
	fileInput,
	submitForm,
	companyPath,
	validate,
	errors,
	setErrors
}) => {
	const [open, setOpen] = useState(false)
	const [openAddModal, setOpenAddModal] = useState(false)
	const update = Object.keys(companyPath).length > 0 ? true : false
	const { selectedFiles, handleFileSelection, setSelectedFiles } =
		useImageState()

	const {
		data,
		setData,
		handleChange,
		handleColor,
		handleSelect,
		handleDeleteColor,
		handleDeleteClient
	} = useCompanyData(initialData, setInitialData, validate, setErrors)

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
				submitForm={submitForm}
				open={open}
				setOpen={setOpen}
				initialValues={data}
				multipleCondition={false}
				nameScreen="client_companies"
			/>

			<div className="justify-center items-center">
				<form
					onSubmit={(event) => {
						event.stopPropagation()
						submitForm(event, selectedFiles ?? [] , "")
					}}
					className="space-y-2"
				>
					<CompanyFormFields
						data={data}
						handleChange={handleChange}
						errors={errors}
						country={country}
						setCountry={setCountry}
						clients={clients}
						handleSelect={handleSelect}
						handleDeleteColor={handleDeleteColor}
						handleDeleteClient={handleDeleteClient}
						handleColor={handleColor}
						update={update}
						setData={setData}
					/>
					<div className="flex justify-center items-center">
						<SubmitInput update={update} title="Company" />
						<ShowImagesButton
							name={true}
							setOpen={update ? setOpen : setOpenAddModal}
							nameValue={!update ? 'add images' : undefined}
						>
							{!update && (
								<span>
									{`${selectedFiles?.length} files selected for upload`}
								</span>
							)}
						</ShowImagesButton>
					</div>
				</form>
			</div>
		</>
	)
}

export default CompanyMasterForm
