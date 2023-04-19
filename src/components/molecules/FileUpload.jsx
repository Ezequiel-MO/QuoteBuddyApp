import { Icon } from '@iconify/react'

export const FileUpload = ({ update, fileInput, multiple }) => {
	if (update) return null
	return (
		<div className="flex flex-row">
			<label htmlFor="imageContentUrl">
				<Icon icon="akar-icons:cloud-upload" width="30" />
			</label>
			<input
				id="file-upload"
				type="file"
				name="imageContentUrl"
				multiple={multiple}
				ref={fileInput}
				className="ml-2"
			/>
		</div>
	)
}
