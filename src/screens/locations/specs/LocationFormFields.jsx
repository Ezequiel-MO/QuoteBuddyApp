import { Icon } from '@iconify/react'
import { RichTextEditor } from '../../../components/molecules'
import { TextInput } from '../../../ui'
import { ArrayFieldForm } from './InFiguresForm'

export const LocationFormFields = ({
	location,
	textContent,
	setTextContent,
	imagesLocation,
	update,
	fileInput,
	handleFileSelection,
	formikProps
}) => {
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

			<div className="flex align-center justify-start space-x-4">
				{imagesLocation.length === 0 && (
					<>
						<label
							htmlFor="file-upload"
							className="custom-file-upload flex items-center justify-center rounded-lg bg-gray-100 p-2 cursor-pointer"
						>
							<Icon icon="akar-icons:cloud-upload" width="40" />
						</label>
						<input
							id="file-upload"
							type="file"
							ref={fileInput}
							name="imageContentUrl"
							multiple
							disabled={update ? true : false}
							onChange={handleFileSelection}
							className="rounded-lg border-gray-300"
						/>
					</>
				)}
			</div>
			<input
				type="submit"
				className="cursor-pointer py-2 px-10 hover:bg-gray-600 bg-green-500 text-white font-bold uppercase rounded-lg mt-8 col-span-full"
				value={update ? 'Edit Location Form' : 'Save new Location'}
			/>
		</fieldset>
	)
}
