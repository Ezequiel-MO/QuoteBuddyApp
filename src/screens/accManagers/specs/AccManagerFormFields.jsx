import { Icon } from '@iconify/react'
import { TextInput } from '../../../ui'

export const AccManagerFormFields = ({
	imagesAccManager,
	fileInput,
	update
}) => {
	return (
		<fieldset className="grid grid-cols-2 gap-4">
			<legend>
				<h1 className="text-2xl mb-4">General Account Manager Data</h1>
			</legend>
			<div className="form-group mb-6">
				<TextInput
					label="First Name"
					name="firstName"
					placeholder="Acc manager Given Name"
					type="text"
				/>
				<TextInput
					label="Last Name"
					name="familyName"
					placeholder="Acc manager Family Name"
					type="text"
				/>
				<TextInput
					label="Email"
					name="email"
					placeholder="Acc manager company email"
					type="text"
				/>
			</div>
			<div className="flex items-center">
				{imagesAccManager.length === 0 && (
					<label htmlFor="file-upload" className="mx-3">
						<Icon icon="akar-icons:cloud-upload" width="40" />
						<span>Upload Images</span>
					</label>
				)}
				{imagesAccManager.length === 0 && (
					<input
						id="file-upload"
						type="file"
						ref={fileInput}
						name="imageContentUrl"
						multiple
						disabled={update ? true : false}
					/>
				)}
			</div>

			<input
				type="submit"
				className="cursor-pointer py-2 px-10 hover:bg-gray-600 bg-green-50 text-black-50 hover:text-white-50 fonrt-bold uppercase rounded-lg"
				value={
					update ? 'Edit Account Manager Form' : 'Save new Account Manager'
				}
			/>
		</fieldset>
	)
}
