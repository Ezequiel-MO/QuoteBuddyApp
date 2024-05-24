import React, { FC } from "react"
import { useLocation } from 'react-router-dom'
import { CountryFilter } from '../../../ui'
import { SelectClients } from './SelectClients'
import { ColorInput, TextInput } from '../../../components/atoms'
import { RenderColorPalette } from '../../../components/molecules'
import { IClientCompany } from "src/interfaces/clientCompany"
import { IClient } from "@interfaces/client"

interface CompanyFormFieldsProps {
	data: IClientCompany
	setData: React.Dispatch<React.SetStateAction<any>>
	country: string
	setCountry: React.Dispatch<React.SetStateAction<string>>
	clients: IClient[]
	errors: { [key: string]: string | undefined }
	handleChange: (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => void
	handleSelect: (
		event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
	) => void
	handleDeleteClient: (client: string) => void
	handleColor: (
		event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
	) => void
	handleDeleteColor: (color: string) => void
	update: boolean
}


export const CompanyFormFields: FC<CompanyFormFieldsProps> = ({
	data,
	handleChange,
	errors,
	country,
	setCountry,
	clients,
	handleSelect,
	handleDeleteColor,
	handleDeleteClient,
	handleColor,
	setData,
}) => {
	const location = useLocation()
	const pathnameCompany = "/app/company/specs"

	return (
		<fieldset className="max-w-xl mx-auto p-4 bg-gray-800 rounded-lg">
			<legend>
				<h1 className={`text-3xl ${pathnameCompany === location.pathname ? "text-white-0" : "text-green-400"}`}>
					General Company Data
				</h1>
			</legend>
			<div className="space-y-4">
				<TextInput
					name="name"
					value={data.name}
					handleChange={handleChange}
					errors={errors.name}
				/>
				<TextInput
					name="address"
					value={data.address}
					handleChange={handleChange}
					errors={errors.address}
				/>
				<TextInput
					name="postCode"
					value={data.postCode}
					handleChange={handleChange}
					errors={errors.postCode}
				/>
				<TextInput
					name="VATNr"
					value={data.VATNr}
					handleChange={handleChange}
					errors={errors.VATNr}
				/>
				<div className="text-white-0">
					<label
						className="uppercase text-gray-600 block text-xl font-bold"
					>
						Country
					</label>
					<CountryFilter
						country={country}
						setCountry={setCountry}
					/>
				</div>
				{country === 'none' && (
					<p className="py-1 text-center bg-red-500 font-bold text-white-100 rounded-b-md">
						select country
					</p>
				)}
				<SelectClients
					clients={clients}
					handleChange={handleSelect}
					data={data}
					handleDelete={handleDeleteClient}
					setData={setData}
				/>
				<ColorInput
					colorPalette={data.colorPalette}
					handleColor={handleColor}
				/>
				<RenderColorPalette
					colors={data.colorPalette}
					handleDelete={handleDeleteColor}
				/>
				<TextInput
					name="fonts"
					value={data.fonts}
					handleChange={handleChange}
					errors={errors.fonts}
					placeholder='example Font Family: "Rockwell Extra Bold" , Arial , ...'
				/>
			</div>
		</fieldset>
	)
}
