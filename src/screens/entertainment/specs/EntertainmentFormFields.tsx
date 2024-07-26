import { TextInput } from '@components/atoms'
import { EntertainmentCategorySelector } from './EntertainmentCategorySelector'
import { useEntertainment } from '../context/EntertainmentsContext'
import { LocationSelector } from '@components/molecules/LocationSelector'
import TextEditor from '@components/molecules/TextEditor'
import { useCallback } from 'react'

export const EntertainmentFormFields = () => {
	const { state, dispatch, handleChange, handleBlur, errors } =
		useEntertainment()

	const handleTextContentChange = useCallback((textContent: string) => {
		dispatch({
			type: 'UPDATE_ENTERTAINMENT_FIELD',
			payload: { name: 'textContent', value: textContent }
		})
	}, [])

	return (
		<fieldset className="max-w-3xl mx-auto p-8 bg-slate-800 shadow-md rounded-lg">
			<legend>
				<h1 className="text-3xl text-white-0">Entertainment Shows Data</h1>
			</legend>
			<div className="space-y-4">
				<TextInput
					name="vendor"
					label="Vendor / Agency"
					value={state.currentEntertainment?.vendor || ''}
					handleChange={handleChange}
					handleBlur={handleBlur}
					errors={errors.vendor}
					placeholder="Name of the vendor / agency"
				/>
				<div className="col-span-1 sm:col-span-2">
					<label className="uppercase text-xl text-gray-600 font-bold mr-2">
						Location
					</label>
					<LocationSelector
						city={state.currentEntertainment?.city as string}
						name="city"
						handleChange={handleChange}
					/>
					{errors.city && !state.currentEntertainment?.city && (
						<p className="text-red-500 mt-1">{errors.city}</p>
					)}
				</div>
				<TextInput
					name="name"
					label="Name of the Show"
					value={state.currentEntertainment?.name || ''}
					handleChange={handleChange}
					handleBlur={handleBlur}
					errors={errors.name}
					placeholder="Name of the show"
				/>
				<TextInput
					name="contact"
					label="Contact Person"
					value={state.currentEntertainment?.contact}
					handleChange={handleChange}
					handleBlur={handleBlur}
					errors={errors.contact}
					placeholder="Contact Person"
				/>
				<TextInput
					type="email"
					name="email"
					label="Email"
					value={state.currentEntertainment?.email}
					handleChange={handleChange}
					handleBlur={handleBlur}
					errors={errors.email}
					placeholder="Email Address"
				/>
				<EntertainmentCategorySelector
					category={state.currentEntertainment?.category || 'Other'}
					handleChange={handleChange}
					handleBlur={handleBlur}
					errors={errors}
				/>
				<div className="flex space-x-4">
					<div className="w-1/2">
						<TextInput
							name="duration"
							value={state.currentEntertainment?.duration}
							handleChange={handleChange}
							handleBlur={handleBlur}
							errors={errors.duration}
							placeholder='Duration in "minutes"'
						/>
					</div>
					<div className="w-1/2">
						<TextInput
							name="nrArtists"
							value={state.currentEntertainment?.nrArtists}
							handleChange={handleChange}
							handleBlur={handleBlur}
							errors={errors.nrArtists}
							placeholder="Number of Artists"
						/>
					</div>
				</div>
				<div className="col-span-1 sm:col-span-2 lg:col-span-3">
					<h2 className="text-center text-xl">Description Restaurant</h2>
					<label className="block uppercase text-lg text-gray-400 font-medium">
						Description (English)
					</label>
					<TextEditor
						value={state.currentEntertainment?.textContent || ''}
						onChange={handleTextContentChange}
					/>
					{/* <div className="mt-10">
						<AddDescriptionsInLanguages />
					</div> */}
				</div>
			</div>
		</fieldset>
	)
}
