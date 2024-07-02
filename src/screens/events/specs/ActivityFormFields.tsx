import { ChangeEvent, useCallback } from 'react'
import { TextInput } from '@components/atoms'
import { useActivity } from '../context/ActivitiesContext'
import { LocationSelector } from '@components/molecules/LocationSelector'
import TextEditor from '@components/molecules/TextEditor'

export const ActivityFormFields = () => {
	const { state, dispatch, handleChange, handleBlur, errors } = useActivity()

	const handleTextContentChange = useCallback(
		(textContent: string) => {
			dispatch({
				type: 'UPDATE_ACTIVITY_FIELD',
				payload: { name: 'textContent', value: textContent }
			})
		},
		[dispatch]
	)

	const handleCoordinateChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		const typedName = name as 'longitude' | 'latitude'
		dispatch({
			type: 'UPDATE_ACTIVITY_COORDINATE',
			payload: { name: typedName, value: parseFloat(value) }
		})
	}

	return (
		<fieldset className="max-w-4xl mx-auto p-8 bg-slate-800 shadow-lg rounded-lg">
			<legend className="text-center mb-6">
				<h1 className="text-3xl text-white">General Event Data</h1>
			</legend>
			<div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
				<div className="w-full">
					<TextInput
						type="text"
						label="Name"
						placeholder="Activity name"
						name="name"
						value={state.currentActivity?.name || ''}
						handleChange={handleChange}
						handleBlur={handleBlur}
						errors={errors.name}
					/>
				</div>
				<div className="w-full">
					<label className="block text-lg text-gray-400 font-medium mb-2">
						Location
					</label>
					<LocationSelector
						city={state.currentActivity?.city as string}
						name="city"
						handleChange={handleChange}
					/>
					{errors.city && !state.currentActivity?.city && (
						<p className="text-red-500 mt-1">{errors.city}</p>
					)}
				</div>
			</div>

			<div className="grid gap-6 grid-cols-1 lg:grid-cols-3 mt-6">
				<div className="w-full">
					<TextInput
						type="number"
						label="Longitude"
						placeholder="ex : 2.154007"
						name="longitude"
						value={state.currentActivity?.location?.coordinates[0] || ''}
						handleChange={handleCoordinateChange}
						handleBlur={handleBlur}
						errors={errors.longitude}
						step="any"
					/>
				</div>
				<div className="w-full">
					<TextInput
						type="number"
						label="Latitude"
						placeholder="ex : 41.390205"
						name="latitude"
						value={state.currentActivity?.location?.coordinates[1] || ''}
						handleChange={handleCoordinateChange}
						handleBlur={handleBlur}
						errors={errors.latitude}
						step="any"
					/>
				</div>
				<div className="w-full">
					<TextInput
						type="number"
						label="Tour Cost"
						placeholder="example: 35"
						name="price"
						value={state.currentActivity?.price || ''}
						handleChange={handleChange}
						handleBlur={handleBlur}
						step="any"
						errors={errors.price}
					/>
				</div>
			</div>

			<div className="grid gap-6 grid-cols-1 lg:grid-cols-3 mt-6">
				<div className="w-full">
					<TextInput
						type="checkbox"
						label="Coords Active"
						name="coordsActive"
						value={state.currentActivity?.coordsActive}
						checked={state.currentActivity?.coordsActive as boolean}
						handleChange={handleChange}
						handleBlur={handleBlur}
						errors={errors.coordsActive}
					/>
				</div>
				<div className="w-full">
					<TextInput
						type="checkbox"
						label="Price Per Person"
						name="pricePerPerson"
						value={state.currentActivity?.pricePerPerson}
						checked={state.currentActivity?.pricePerPerson as boolean}
						handleChange={handleChange}
						handleBlur={handleBlur}
						errors={errors.pricePerPerson}
					/>
				</div>
				<div className="w-full">
					<TextInput
						type="checkbox"
						label="Regular"
						name="regular"
						value={state.currentActivity?.regular}
						checked={state.currentActivity?.regular as boolean}
						handleChange={handleChange}
						handleBlur={handleBlur}
						errors={errors.regular}
					/>
				</div>
			</div>

			<hr className="my-8" />
			<div className="text-center">
				<h2 className="text-2xl text-white mb-4">Description Activity</h2>
				<label className="block text-lg text-gray-400 font-medium mb-2">
					Description (English)
				</label>
				<TextEditor
					value={state.currentActivity?.textContent || ''}
					onChange={handleTextContentChange}
				/>
			</div>
		</fieldset>
	)
}
