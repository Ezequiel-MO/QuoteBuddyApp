import { RichTextEditor } from '../../../components/molecules'
import { SelectInput, TextInput } from '../../../ui'
import { ArrayFieldForm } from './ArrayFieldForm'
import { useGetCountries } from '../../../hooks'
import { SubmitInput } from '@components/atoms'

export const LocationFormFields = ({
	location,
	textContent,
	setTextContent,
	update,
	formikProps
}) => {
	const { countries } = useGetCountries()
	return (
		<fieldset className="p-2 bg-black-50 px-5 border border-white-50">
			<legend className="text-2xl">
				<p>General Location Data</p>
			</legend>
			<div className="grid grid-cols-3 gap-4">
				<div className="col-span-1">
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
					/>
					<TextInput
						label="Coords Latitude"
						name="latitude"
						placeholder="ex : 41.390205"
						type="number"
						className="rounded-lg"
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
