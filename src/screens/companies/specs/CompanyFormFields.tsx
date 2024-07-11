import React, { FC } from 'react'
import { useLocation } from 'react-router-dom'
import { CountryFilter } from '../../../ui'
import { SelectClients } from './SelectClients'
import { ColorInput, TextInput } from '../../../components/atoms'
import { RenderColorPalette } from '../../../components/molecules'
import { IClientCompany } from 'src/interfaces/clientCompany'
import { IClient } from '@interfaces/client'
import { useCompany } from '../context/CompanyContext'
import { AddClientToCompanyForm } from './AddClientToCompanyForm'

export const CompanyFormFields = () => {
	const { state, dispatch, handleChange, handleBlur, errors } = useCompany()

	return (
		<fieldset className="max-w-3xl mx-auto p-8 bg-slate-800 shadow-md rounded-lg">
			<legend>
				<h1 className="text-3xl font-semibold text-gray-700 mb-6">
					Company Details
				</h1>
			</legend>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
				<TextInput
					name="name"
					type="text"
					value={state.currentCompany?.name}
					handleChange={handleChange}
					handleBlur={handleBlur}
					errors={errors.name}
				/>
				<TextInput
					name="address"
					value={state.currentCompany?.address}
					handleChange={handleChange}
					handleBlur={handleBlur}
					errors={errors.address}
				/>
				<TextInput
					name="postCode"
					value={state.currentCompany?.postCode}
					handleChange={handleChange}
					handleBlur={handleBlur}
					errors={errors.postCode}
				/>
				<TextInput
					name="VATNr"
					value={state.currentCompany?.VATNr}
					handleChange={handleChange}
					handleBlur={handleBlur}
					errors={errors.VATNr}
				/>
			</div>
			<div className="w-full">
				<AddClientToCompanyForm
					employees={state.currentCompany?.employees || []}
					handleChange={handleChange}
					handleBlur={handleBlur}
					removeEmployee={(id: string) => {
						dispatch({
							type: 'REMOVE_EMPLOYEE',
							payload: id
						})
					}}
				/>
			</div>
			{/* 
			<div className="space-y-4">
				
				<div className="text-white-0">
					<label className="uppercase text-gray-600 block text-xl font-bold">
						Country
					</label>
					<CountryFilter country={country} setCountry={setCountry} />
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
			</div> */}
		</fieldset>
	)
}
