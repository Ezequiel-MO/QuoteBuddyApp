import { RichTextEditor } from '../../../components/molecules'
import { SelectInput, TextInput } from '../../../ui'
import { ArrayFieldForm } from './ArrayFieldForm'
import { SubmitInput } from '@components/atoms'
import { useFetchCountries } from 'src/hooks/fetchData/useFetchCountries'

export const LocationFormFields = ({
	location,
	textContent,
	setTextContent,
	update,
	formikProps
}) => {
	const { countries } = useFetchCountries()
	return (
		<fieldset className="max-w-3xl mx-auto p-8 bg-slate-800 shadow-md rounded-lg">
			<legend>
				<h1 className="text-3xl font-semibold text-gray-700 mb-6">
					General Location Data
				</h1>
			</legend>
			<div className="grid grid-cols-3 gap-4">
				<div className="col-span-1 text-black-50">
					<TextInput
						label="Name"
						name="name"
						placeholder="Location Name"
						type="text"
						className="rounded-lg"
					/>
					<TextInput
						label="Coords Longitude"
						name="longitude"
						placeholder="ex : 2.154007"
						type="number"
						className="rounded-lg"
						step="any"
					/>
					<TextInput
						label="Coords Latitude"
						name="latitude"
						placeholder="ex : 41.390205"
						type="number"
						className="rounded-lg"
						step="any"
					/>
					<SelectInput
						label="Country"
						name="country"
						options={countries}
						location={location}
					/>
				</div>
				<div className="col-span-2">
					<div className="my-7">
						<RichTextEditor
							screen={location}
							textContent={textContent}
							setTextContent={setTextContent}
							update={update}
							className="rounded-lg border-gray-300"
						/>
					</div>
					<ArrayFieldForm formikProps={formikProps} name="inFigures" />
					<ArrayFieldForm formikProps={formikProps} name="corporateFacts" />
				</div>
			</div>
			<SubmitInput update={update} title="Location" />
		</fieldset>
	)
}
