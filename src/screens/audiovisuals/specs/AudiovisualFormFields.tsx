import { ChangeEvent, useCallback } from 'react'
import { TextInput } from '@components/atoms'
import { useAudiovisual } from '../context/AudiovisualsContext'
import { LocationSelector } from '@components/molecules/LocationSelector'
import TextEditor from '@components/molecules/TextEditor'
import { IAudiovisualEquipment } from '@interfaces/audiovisual'

export const AudiovisualFormFields = () => {
	const { state, dispatch, handleChange, handleBlur, errors, setErrors } =
		useAudiovisual()

	// Handler for the rich–text editor
	const handleTextContentChange = useCallback(
		(textContent: string) => {
			dispatch({
				type: 'UPDATE_AUDIOVISUAL_FIELD',
				payload: { name: 'textContent', value: textContent }
			})
		},
		[dispatch]
	)

	// Coordinate change handler
	const handleCoordinateChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		const typedName = name as 'longitude' | 'latitude'
		dispatch({
			type: 'UPDATE_AUDIOVISUAL_COORDINATE',
			payload: { name: typedName, value: parseFloat(value) }
		})
		if (errors[name]) {
			setErrors((prevErrors) => ({
				...prevErrors,
				[name]: undefined
			}))
		}
	}

	// Handler for updating each equipment item via specialized reducer action
	const handleEquipmentChange = (
		index: number,
		field: keyof IAudiovisualEquipment,
		value: string | number
	) => {
		dispatch({
			type: 'UPDATE_EQUIPMENT_ITEM_FIELD',
			payload: { index, field, value }
		})
	}

	// Add a new equipment item with local copying (that's fine for new items)
	const addEquipmentItem = () => {
		if (state.currentAudiovisual) {
			const newEquipment = {
				id: Date.now().toString(),
				name: '',
				quantity: 0,
				dailyRate: undefined,
				halfDayRate: undefined,
				setupCost: undefined,
				staffCost: undefined,
				transportationCost: undefined,
				notes: ''
			}
			const updatedEquipmentList = [
				...(state.currentAudiovisual.equipmentList || []),
				newEquipment
			]

			dispatch({
				type: 'UPDATE_AUDIOVISUAL_FIELD',
				payload: { name: 'equipmentList', value: updatedEquipmentList }
			})
		}
	}

	// Remove an existing equipment item by index
	const removeEquipmentItem = (index: number) => {
		dispatch({
			type: 'REMOVE_EQUIPMENT_ITEM',
			payload: { index }
		})
	}

	return (
		<fieldset className="max-w-4xl mx-auto p-8 bg-slate-800 shadow-lg rounded-lg space-y-8">
			<legend className="mb-4">
				<h1 className="text-3xl font-bold text-gray-200 text-center">
					General Audiovisual Data
				</h1>
			</legend>

			{/* Basic Info Section */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<TextInput
						type="text"
						label="Name"
						placeholder="Audiovisual name"
						name="name"
						value={state.currentAudiovisual?.name || ''}
						handleChange={handleChange}
						handleBlur={handleBlur}
						errors={errors.name}
					/>
				</div>
				<div>
					<label className="block uppercase text-xl text-gray-300 font-bold">
						Location
					</label>
					<LocationSelector
						city={state.currentAudiovisual?.city || ''}
						name="city"
						handleChange={handleChange}
					/>
					{errors.city && !state.currentAudiovisual?.city && (
						<p className="text-red-500 text-sm mt-1">{errors.city}</p>
					)}
				</div>
			</div>

			{/* Coordinates Section */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<TextInput
						type="number"
						label="Longitude"
						placeholder="e.g., 2.154007"
						name="longitude"
						value={state.currentAudiovisual?.location?.coordinates?.[0] ?? ''}
						handleChange={handleCoordinateChange}
						handleBlur={handleBlur}
						errors={errors.longitude}
						step="any"
					/>
				</div>
				<div>
					<TextInput
						type="number"
						label="Latitude"
						placeholder="e.g., 41.390205"
						name="latitude"
						value={state.currentAudiovisual?.location?.coordinates?.[1] ?? ''}
						handleChange={handleCoordinateChange}
						handleBlur={handleBlur}
						errors={errors.latitude}
						step="any"
					/>
				</div>
			</div>

			{/* Description Section */}
			<div className="flex flex-col">
				<label className="uppercase text-xl text-gray-300 font-bold mb-2">
					Description
				</label>
				<TextEditor
					value={state.currentAudiovisual?.textContent || ''}
					onChange={handleTextContentChange}
				/>
			</div>

			{/* Equipment List Section */}
			<div className="flex flex-col">
				<label className="uppercase text-xl text-gray-300 font-bold mb-4">
					Equipment List
				</label>
				<div className="space-y-6">
					{(state.currentAudiovisual?.equipmentList || []).map(
						(equipment, index) => (
							<div
								key={equipment.id || index}
								className="p-4 border border-gray-600 rounded-lg bg-slate-700 space-y-4"
							>
								{/* Equipment Name & Quantity */}
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<TextInput
										type="text"
										label="Equipment Name"
										placeholder="e.g., Projector"
										name={`equipmentList.${index}.name`}
										value={equipment.name}
										handleChange={(e: ChangeEvent<HTMLInputElement>) =>
											handleEquipmentChange(index, 'name', e.target.value)
										}
									/>
									<TextInput
										type="number"
										label="Quantity"
										placeholder="e.g., 2"
										name={`equipmentList.${index}.quantity`}
										value={equipment.quantity}
										handleChange={(e: ChangeEvent<HTMLInputElement>) =>
											handleEquipmentChange(
												index,
												'quantity',
												parseInt(e.target.value, 10)
											)
										}
									/>
								</div>

								{/* Rates & Costs */}
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<TextInput
										type="number"
										label="Daily Rate"
										placeholder="e.g., 100"
										name={`equipmentList.${index}.dailyRate`}
										value={equipment.dailyRate || ''}
										handleChange={(e: ChangeEvent<HTMLInputElement>) =>
											handleEquipmentChange(
												index,
												'dailyRate',
												parseFloat(e.target.value)
											)
										}
									/>
									<TextInput
										type="number"
										label="Half-Day Rate"
										placeholder="e.g., 60"
										name={`equipmentList.${index}.halfDayRate`}
										value={equipment.halfDayRate || ''}
										handleChange={(e: ChangeEvent<HTMLInputElement>) =>
											handleEquipmentChange(
												index,
												'halfDayRate',
												parseFloat(e.target.value)
											)
										}
									/>
								</div>

								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<TextInput
										type="number"
										label="Setup Cost"
										placeholder="e.g., 50"
										name={`equipmentList.${index}.setupCost`}
										value={equipment.setupCost || ''}
										handleChange={(e: ChangeEvent<HTMLInputElement>) =>
											handleEquipmentChange(
												index,
												'setupCost',
												parseFloat(e.target.value)
											)
										}
									/>
									<TextInput
										type="number"
										label="Staff Cost"
										placeholder="e.g., 75"
										name={`equipmentList.${index}.staffCost`}
										value={equipment.staffCost || ''}
										handleChange={(e: ChangeEvent<HTMLInputElement>) =>
											handleEquipmentChange(
												index,
												'staffCost',
												parseFloat(e.target.value)
											)
										}
									/>
								</div>

								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<TextInput
										type="number"
										label="Transportation Cost"
										placeholder="e.g., 20"
										name={`equipmentList.${index}.transportationCost`}
										value={equipment.transportationCost || ''}
										handleChange={(e: ChangeEvent<HTMLInputElement>) =>
											handleEquipmentChange(
												index,
												'transportationCost',
												parseFloat(e.target.value)
											)
										}
									/>
									<TextInput
										type="text"
										label="Notes"
										placeholder="Optional notes"
										name={`equipmentList.${index}.notes`}
										value={equipment.notes || ''}
										handleChange={(e: ChangeEvent<HTMLInputElement>) =>
											handleEquipmentChange(index, 'notes', e.target.value)
										}
									/>
								</div>

								{/* Remove Item Button */}
								<button
									type="button"
									onClick={() => removeEquipmentItem(index)}
									className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
								>
									Remove Item
								</button>
							</div>
						)
					)}
				</div>
				<button
					type="button"
					onClick={addEquipmentItem}
					className="mt-4 self-start px-6 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition-colors"
				>
					Add Equipment Item
				</button>
			</div>
		</fieldset>
	)
}
