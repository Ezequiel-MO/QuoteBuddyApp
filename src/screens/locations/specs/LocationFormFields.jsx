import { Icon } from '@iconify/react'
import { RichTextEditor } from '../../../components/molecules'
import { TextInput } from '../../../ui'

export const LocationFormFields = ({
	location,
	textContent,
	setTextContent,
	imagesLocation,
	update,
	fileInput,
	handleFileSelection
}) => {
	return (
		<fieldset className="grid grid-cols-2 gap-4">
			<legend>
				<h1 className="text-2xl mb-4">General Location Data</h1>
			</legend>
			<div className="mb-6">
				<TextInput
					label="Name"
					name="name"
					placeholder="Location Name"
					type="text"
				/>
				<TextInput
					label="Coords Longitude"
					name="longitude"
					placeholder="ex : 2.154007"
					type="number"
				/>
				<TextInput
					label="Coords Latitude"
					name="latitude"
					placeholder="ex : 41.390205"
					type="number"
				/>
			</div>

			<div className="mb-6">
				<div className="my-7  ">
					<RichTextEditor
						screen={location}
						textContent={textContent}
						setTextContent={setTextContent}
						update={update}
					/>
				</div>

				<div className="flex align-center justify-start">
					{imagesLocation.length === 0 && (
						<>
							<label htmlFor="file-upload" className="custom-file-upload">
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
							/>
						</>
					)}
				</div>
			</div>
			<input
				type="submit"
				className="cursor-pointer py-2 px-10 hover:bg-gray-600 bg-green-50 text-black-50 hover:text-white-50 fonrt-bold uppercase rounded-lg"
				value={update ? 'Edit Location Form' : 'Save new Location'}
			/>
		</fieldset>
	)
}
