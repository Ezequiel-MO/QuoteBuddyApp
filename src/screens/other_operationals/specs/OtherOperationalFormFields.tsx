import { LocationSelector } from '@components/molecules/LocationSelector'
import { TextInput } from '../../../components/atoms'
import { useOtherOperational } from '../context/OtherOperationalsContext'
import { useCallback } from 'react'
import TextEditor from '@components/molecules/TextEditor'

export const OtherOperationalFormFields = () => {
	const { state, dispatch, handleChange, handleBlur, errors } =
		useOtherOperational()

	const handleTextContentChange = useCallback(
		(textContent: string) => {
			dispatch({
				type: 'UPDATE_OTHEROPERATIONAL_FIELD',
				payload: { name: 'textContent', value: textContent }
			})
		},
		[dispatch]
	)

	return (
		<fieldset className="max-w-3xl mx-auto p-8 bg-slate-800 shadow-md rounded-lg">
			<legend>
				<h1 className="text-3xl font-semibold text-gray-700 mb-6">
					General Other Operational Data
				</h1>
			</legend>
			<div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
				<div className="col-span-1 lg:col-span-2">
					<TextInput
						type="text"
						label="Name"
						placeholder="Other Operational Invoice identification name"
						name="name"
						value={state.currentOtherOperational?.name || ''}
						handleChange={handleChange}
						handleBlur={handleBlur}
						errors={errors.name}
					/>
				</div>
				<div className="col-span-1 sm:col-span-2">
					<label className="uppercase text-xl text-gray-600 font-bold mr-2">
						Location
					</label>
					<LocationSelector
						city={state.currentOtherOperational?.city as string}
						name="city"
						handleChange={handleChange}
					/>
					{errors.city && !state.currentOtherOperational?.city && (
						<p className="text-red-500 mt-1">{errors.city}</p>
					)}
					<hr className="my-8" />
					<div>
						<label className="uppercase text-xl text-gray-600 font-bold mr-2">
							Description
						</label>
						<TextEditor
							value={state.currentOtherOperational?.textContent || ''}
							onChange={handleTextContentChange}
						/>
					</div>
				</div>
			</div>
		</fieldset>
	)
}
