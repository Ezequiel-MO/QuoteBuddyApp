import React, { ChangeEvent, FocusEvent } from 'react'
import { IClient } from '@interfaces/client'
import TextEditor from '@components/molecules/TextEditor'

interface ClientQualificationProps {
	currentClient: Partial<IClient>
	handleChange: (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void
	handleBlur: (e: FocusEvent<HTMLSelectElement | HTMLInputElement>) => void
}

const optionsQualification = [
	{ value: 'NeverRequested', name: 'Never Requested' },
	{ value: 'RequestedButNotProceeded', name: 'Requested But Not Proceeded' },
	{ value: 'Proceeded', name: 'Proceeded' },
	{ value: 'RegularClient', name: 'Regular Client' },
	{ value: 'LostClient', name: 'Lost Client' }
]

export const ClientQualification: React.FC<ClientQualificationProps> = ({
	currentClient,
	handleChange,
	handleBlur
}) => {
	const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
		handleChange(e)
	}

	const handleEditorChange = (value: string) => {
		const event = {
			target: {
				name: 'qualification.textContent',
				value
			}
		} as ChangeEvent<HTMLInputElement>
		handleChange(event)
	}

	return (
		<div className="space-y-4 my-2">
			<label className="block text-lg font-medium text-gray-300">
				Qualification Status
			</label>
			<select
				name="qualification.status"
				value={currentClient.qualification?.status || ''}
				onChange={handleSelectChange}
				onBlur={handleBlur}
				className="w-full py-2 px-3 border border-gray-300 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
			>
				{optionsQualification.map((option) => (
					<option key={option.value} value={option.value}>
						{option.name}
					</option>
				))}
			</select>

			<label className="block text-lg font-medium text-gray-300">
				Description
			</label>
			<TextEditor
				value={currentClient.qualification?.textContent || ''}
				onChange={handleEditorChange}
			/>
		</div>
	)
}
