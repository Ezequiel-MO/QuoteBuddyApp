import { ChangeEvent, useCallback } from 'react'
import { TextInput } from '@components/atoms'
import { useRestaurant } from '../context/RestaurantsContext'
import { LocationSelector } from '@components/molecules/LocationSelector'
import TextEditor from '@components/molecules/TextEditor'
import { AddDescriptionsInLanguages } from './AddDescriptionsInLanguages'

export const RestaurantFormFields = () => {
	const { state, dispatch, handleChange, handleBlur, errors } = useRestaurant()

	const handleTextContentChange = useCallback((textContent: string) => {
		dispatch({
			type: 'UPDATE_RESTAURANT_FIELD',
			payload: { name: 'textContent', value: textContent }
		})
	}, [])

	const handleCoordinateChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		const typedName = name as 'longitude' | 'latitude'
		dispatch({
			type: 'UPDATE_RESTAURANT_COORDINATE',
			payload: { name: typedName, value: parseFloat(value) }
		})
	}

	return (
		<fieldset className="max-w-3xl mx-auto p-8 bg-slate-800 shadow-md rounded-lg">
			<legend>
				<h1 className="text-3xl text-white-0">General Restaurant Data</h1>
			</legend>
			<div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
				<div className="col-span-1">
					<TextInput
						type="text"
						label="Name"
						placeholder="Restaurant name"
						name="name"
						value={state.currentRestaurant?.name || ''}
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
						city={state.currentRestaurant?.city as string}
						name="city"
						handleChange={handleChange}
					/>
					{errors.city && !state.currentRestaurant?.city && (
						<p className="text-red-500 mt-1">{errors.city}</p>
					)}
				</div>
				<div className="col-span-1">
					<TextInput
						type="number"
						label="Longitude"
						placeholder="ex : 2.154007"
						name="longitude"
						value={state.currentRestaurant?.location?.coordinates[0] || ''}
						handleChange={handleCoordinateChange}
						handleBlur={handleBlur}
						errors={errors.longitude}
						step="any"
					/>
				</div>
				<div className="col-span-1">
					<TextInput
						type="number"
						label="Latitude"
						placeholder="ex : 41.390205"
						name="latitude"
						value={state.currentRestaurant?.location?.coordinates[1] || ''}
						handleChange={handleCoordinateChange}
						handleBlur={handleBlur}
						errors={errors.latitude}
						step="any"
					/>
				</div>
				<div className="col-span-1">
					<TextInput
						type="number"
						label="Tour Cost"
						placeholder="example : 35"
						name="price"
						value={state.currentRestaurant?.price}
						handleChange={handleChange}
						handleBlur={handleBlur}
						errors={errors.price}
					/>
				</div>
				<div className="col-span-1">
					<TextInput
						type="checkbox"
						label="It is a venue"
						name="isVenue"
						value={state.currentRestaurant?.isVenue}
						checked={state.currentRestaurant?.isVenue as boolean}
						handleChange={handleChange}
						handleBlur={handleBlur}
						errors={errors.isVenue}
					/>
				</div>
				<div className="col-span-1 sm:col-span-2 lg:col-span-3">
					<h2 className="text-center text-xl">Description Restaurant</h2>
					<label className="block uppercase text-lg text-gray-400 font-medium">
						Description (English)
					</label>
					<TextEditor
						value={state.currentRestaurant?.textContent || ''}
						onChange={handleTextContentChange}
					/>
					<div className="mt-10">
						<AddDescriptionsInLanguages />
					</div>
				</div>
			</div>
		</fieldset>
	)
}
