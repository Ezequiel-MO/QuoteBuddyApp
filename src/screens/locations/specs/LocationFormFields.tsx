import { ChangeEvent, useCallback, useState } from 'react'
import { useLocation } from '../context/LocationsContext'
import { CountrySelector } from '@components/atoms/filters/CountrySelector'
import { useApiFetch } from 'src/hooks/fetchData'
import { ICountry } from '@interfaces/country'
import TextEditor from '@components/molecules/TextEditor'
import { TextInput } from '@components/atoms'

export const LocationFormFields = () => {
	const { state, dispatch, handleChange, handleBlur, errors } = useLocation()
	const { data: countries } = useApiFetch<ICountry[]>('countries')
	const [newInFigure, setNewInFigure] = useState({ title: '', description: '' })
	const [newCorporateFact, setNewCorporateFact] = useState({
		title: '',
		description: ''
	})

	const handleTextContentChange = useCallback(
		(textContent: string) => {
			dispatch({
				type: 'UPDATE_LOCATION_FIELD',
				payload: { name: 'textContent', value: textContent }
			})
		},
		[dispatch]
	)

	const handleCoordinateChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		const typedName = name as 'longitude' | 'latitude'
		dispatch({
			type: 'UPDATE_LOCATION_COORDINATE',
			payload: { name: typedName, value: parseFloat(value) }
		})
	}

	const handleAddInFigure = () => {
		dispatch({
			type: 'APPEND_TO_ARRAY_FIELD',
			payload: { name: 'inFigures', value: [newInFigure] }
		})
		setNewInFigure({ title: '', description: '' })
	}

	const handleAddCorporateFact = () => {
		dispatch({
			type: 'APPEND_TO_ARRAY_FIELD',
			payload: { name: 'corporateFacts', value: [newCorporateFact] }
		})
		setNewCorporateFact({ title: '', description: '' })
	}

	const handleDeleteInFigure = (index: number) => {
		const updatedInFigures = state.currentLocation?.inFigures?.filter(
			(_, i) => i !== index
		)
		dispatch({
			type: 'UPDATE_LOCATION_FIELD',
			payload: { name: 'inFigures', value: updatedInFigures }
		})
	}

	const handleDeleteCorporateFact = (index: number) => {
		const updatedCorporateFacts = state.currentLocation?.corporateFacts?.filter(
			(_, i) => i !== index
		)
		dispatch({
			type: 'UPDATE_LOCATION_FIELD',
			payload: { name: 'corporateFacts', value: updatedCorporateFacts }
		})
	}

	return (
		<fieldset className="max-w-3xl mx-auto p-8 bg-slate-800 shadow-md rounded-lg">
			<legend>
				<h1 className="text-3xl font-semibold text-gray-700 mb-6">
					General Location Data
				</h1>
			</legend>
			<div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
				<TextInput
					type="text"
					label="Name"
					placeholder="Name of Location"
					name="name"
					value={state.currentLocation?.name || ''}
					handleChange={handleChange}
					handleBlur={handleBlur}
					errors={errors.name}
				/>
				<div className="-mt-2">
					<CountrySelector
						country={state.currentLocation?.country || ''}
						options={countries}
						errors={errors}
						handleChange={handleChange}
						handleBlur={handleBlur}
					/>
				</div>
				<TextInput
					type="number"
					label="Longitude"
					placeholder="ex : 2.154007"
					name="longitude"
					value={state.currentLocation?.location?.coordinates[0] || ''}
					handleChange={handleCoordinateChange}
					handleBlur={handleBlur}
					errors={errors.longitude}
				/>
				<TextInput
					type="number"
					label="Latitude"
					placeholder="ex : 41.390205"
					name="latitude"
					value={state.currentLocation?.location?.coordinates[1] || ''}
					handleChange={handleCoordinateChange}
					handleBlur={handleBlur}
					errors={errors.latitude}
				/>
			</div>
			<div className="mt-8">
				<label className="text-2xl font-semibold text-gray-700 mb-4">
					Description (English)
				</label>
				<TextEditor
					value={state.currentLocation?.textContent || ''}
					onChange={handleTextContentChange}
				/>
			</div>
			<div className="mt-8">
				<h2 className="text-2xl font-semibold text-gray-700 mb-4">
					In Figures
				</h2>
				{state.currentLocation?.inFigures?.map((figure, index) => (
					<div
						key={index}
						className="mb-4 p-4 bg-gray-700 rounded-lg relative flex items-center justify-between"
					>
						<p className="text-white-0 border border-dashed mr-2 px-2">
							{figure.title}
						</p>
						<p className="text-gray-300 flex-1 border border-dashed px-2">
							{figure.description}
						</p>
						<button
							type="button"
							className="text-red-500"
							onClick={() => handleDeleteInFigure(index)}
						>
							Delete
						</button>
					</div>
				))}
				<div className="flex gap-4 items-center">
					<TextInput
						type="text"
						label="Title"
						placeholder="Title"
						name="inFigureTitle"
						value={newInFigure.title}
						handleChange={(e) =>
							setNewInFigure({ ...newInFigure, title: e.target.value })
						}
					/>
					<div className="flex-1">
						<TextInput
							type="text"
							label="Description"
							placeholder="Description"
							name="inFigureDescription"
							value={newInFigure.description}
							handleChange={(e) =>
								setNewInFigure({ ...newInFigure, description: e.target.value })
							}
						/>
					</div>
					<button
						type="button"
						onClick={handleAddInFigure}
						className="mt-4 px-6 py-2 text-white-0 bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
					>
						Add
					</button>
				</div>
			</div>
			<div className="mt-8">
				<h2 className="text-2xl font-semibold text-gray-700 mb-4">
					Corporate Facts
				</h2>
				{state.currentLocation?.corporateFacts?.map((fact, index) => (
					<div
						key={index}
						className="mb-4 p-4 bg-gray-700 rounded-lg relative flex items-center justify-between"
					>
						<p className="text-white-0 border border-dashed mr-2 px-2">
							{fact.title}
						</p>
						<p className="text-gray-300 flex-1 border border-dashed px-2">
							{fact.description}
						</p>
						<button
							type="button"
							className=" text-red-500"
							onClick={() => handleDeleteCorporateFact(index)}
						>
							Delete
						</button>
					</div>
				))}
				<div className="flex gap-4 items-center">
					<TextInput
						type="text"
						label="Title"
						placeholder="Title"
						name="corporateFactTitle"
						value={newCorporateFact.title}
						handleChange={(e) =>
							setNewCorporateFact({
								...newCorporateFact,
								title: e.target.value
							})
						}
					/>
					<div className="flex-1">
						<TextInput
							type="text"
							label="Description"
							placeholder="Description"
							name="corporateFactDescription"
							value={newCorporateFact.description}
							handleChange={(e) =>
								setNewCorporateFact({
									...newCorporateFact,
									description: e.target.value
								})
							}
						/>
					</div>
					<button
						type="button"
						onClick={handleAddCorporateFact}
						className="mt-4 px-6 py-2 text-white-0 bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
					>
						Add
					</button>
				</div>
			</div>
		</fieldset>
	)
}

export default LocationFormFields
