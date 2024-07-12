import React, { ChangeEvent, FocusEvent } from 'react'
import { IClient } from '@interfaces/client'
import TextEditor from '@components/molecules/TextEditor'

interface ClientOriginProps {
	currentClient: Partial<IClient>
	handleChange: (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void
	handleBlur: (e: FocusEvent<HTMLSelectElement | HTMLInputElement>) => void
}

const optionsOrigin = [
	{ value: 'Recommendation', name: 'Recommendation' },
	{ value: 'ClientChangedCompany', name: 'Client Changed Company' },
	{ value: 'Tradeshow', name: 'Tradeshow' },
	{ value: 'ColdCall', name: 'Cold Call' },
	{ value: 'TourismPatronat', name: 'Tourism Patronat' },
	{ value: 'Other', name: 'Other' }
]

export const ClientOrigin: React.FC<ClientOriginProps> = ({
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
				name: 'origin.textContent',
				value
			}
		} as ChangeEvent<HTMLInputElement>
		handleChange(event)
	}

	return (
		<div className="space-y-4 my-2">
			<label className="block text-lg font-medium text-gray-300">
				Origin Method
			</label>
			<select
				name="origin.method"
				value={currentClient.origin?.method || ''}
				onChange={handleSelectChange}
				onBlur={handleBlur}
				className="w-full py-2 px-3 border border-gray-300 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
			>
				{optionsOrigin.map((option) => (
					<option key={option.value} value={option.value}>
						{option.name}
					</option>
				))}
			</select>

			<label className="block text-lg font-medium text-gray-300">
				Description of Client Origin
			</label>
			<TextEditor
				value={currentClient.origin?.textContent || ''}
				onChange={handleEditorChange}
			/>
		</div>
	)
}
