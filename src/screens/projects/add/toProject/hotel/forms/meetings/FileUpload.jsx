import { Icon } from '@iconify/react'

export const FileUpload = ({ fileInput }) => {
	return (
		<div className="mt-2">
			<label htmlFor="file-upload">
				<Icon icon="akar-icons:cloud-upload" width="40" />
			</label>
			<input
				id="file-upload"
				className="cursor-pointer"
				type="file"
				ref={fileInput}
				name="imageContentUrl"
				multiple
			/>
		</div>
	)
}
