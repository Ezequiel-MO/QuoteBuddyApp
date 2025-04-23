import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import { toast } from 'react-toastify'
import CommentsList from './CommentsList'
import DocumentsList from './DocumentsList'
import { useCurrentPlanner } from '@hooks/redux/useCurrentPlanner'
import { IPlanningOption } from '@interfaces/planner'
import {
	deletePlanningOption,
	createPlanningDocument
} from '@services/plannerService'
import {
	useCanRemoveOption,
	useCanUploadDocument
} from '../context/PlannerPermissionsContext'

interface OptionCardProps {
	option: IPlanningOption
}

const OptionCard: React.FC<OptionCardProps> = ({ option }) => {
	const [isUploading, setIsUploading] = useState(false)
	const { deletePlanningOption: removePlanningOptionFromState } =
		useCurrentPlanner()
	const canRemoveOption = useCanRemoveOption()
	const canUploadDocument = useCanUploadDocument()

	// Extract values with fallbacks to avoid undefined errors
	const name = option?.name || 'Unnamed Option'
	const vendorType = option?.vendorType?.toString() || 'Option'
	const planningNotes = option?.planningNotes?.toString() || ''
	const optionId = option?._id || ''
	const planningItemId = option?.planningItemId?.toString() || ''
	const comments = option?.comments || []
	const documents = option?.documents || []

	// Handle option deletion with server-first approach
	const handleDelete = async () => {
		if (!optionId || !planningItemId) return

		try {
			// First delete from the server
			await deletePlanningOption(optionId)

			// Then update the Redux state
			if (removePlanningOptionFromState) {
				removePlanningOptionFromState(planningItemId, optionId)
			}

			toast.success('Planning option deleted successfully')
		} catch (error) {
			console.error('Failed to delete planning option:', error)
			toast.error('Failed to delete planning option. Please try again.')
		}
	}

	const handleFileUpload = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const files = event.target.files
		if (!files || !files.length || !planningItemId || !optionId) return

		setIsUploading(true)

		try {
			// Convert FileList to Array
			const fileArray = Array.from(files)

			// Server-first approach: Upload to the server first
			const uploadedDocuments = await createPlanningDocument(
				planningItemId,
				fileArray,
				optionId
			)

			// Show success message
			toast.success(`${fileArray.length} document(s) uploaded successfully!`)

			// Note: Redux state update will be handled later as mentioned by the user
			console.log('Uploaded documents:', uploadedDocuments)
		} catch (error) {
			console.error('Error uploading documents:', error)
			toast.error('Failed to upload documents. Please try again.')
		} finally {
			// Reset the input after upload (whether successful or not)
			event.target.value = ''
			setIsUploading(false)
		}
	}

	return (
		<div className="border border-gray-700 rounded-lg p-5 bg-gray-750">
			<div className="flex justify-between items-start mb-3">
				<div>
					<h3 className="text-lg font-medium text-white-0">{name}</h3>
					<div className="text-sm text-gray-400 mt-1">Type: {vendorType}</div>
				</div>
				{canRemoveOption && (
					<button
						className="p-1 rounded-full hover:bg-red-900/30 text-red-400"
						title="Remove option"
						onClick={handleDelete}
					>
						<Icon icon="mdi:trash-can-outline" className="h-5 w-5" />
					</button>
				)}
			</div>
			<p className="text-gray-300 mb-5 whitespace-pre-line">{planningNotes}</p>

			{/* Documents section */}
			<div className="mt-4 border-t border-gray-700 pt-3">
				<div className="flex justify-between items-center mb-3">
					<h4 className="text-sm font-medium text-gray-300 flex items-center">
						<Icon icon="mdi:file-document-outline" className="mr-1" />
						Documents
					</h4>
					{canUploadDocument && (
						<label
							htmlFor={`file-upload-option-${optionId}`}
							className={`cursor-pointer text-sm flex items-center px-3 py-1.5 bg-gray-700 text-gray-300 rounded border border-gray-600 hover:bg-gray-650 transition-colors ${
								isUploading ? 'opacity-50 cursor-not-allowed' : ''
							}`}
						>
							{isUploading ? (
								<>
									<Icon
										icon="mdi:loading"
										className="animate-spin mr-1 h-4 w-4"
									/>
									Uploading...
								</>
							) : (
								<>
									<Icon icon="mdi:upload" className="mr-1 h-4 w-4" />
									Upload
								</>
							)}
							<input
								id={`file-upload-option-${optionId}`}
								type="file"
								multiple
								className="hidden"
								onChange={handleFileUpload}
								disabled={isUploading}
							/>
						</label>
					)}
				</div>

				{documents.length > 0 ? (
					<DocumentsList
						documents={documents}
						planningItemId={planningItemId}
						planningOptionId={optionId}
					/>
				) : (
					<div className="flex flex-col items-center justify-center py-6 border-2 border-dashed border-gray-600 rounded-lg">
						<Icon
							icon="mdi:file-document-outline"
							className="h-12 w-12 text-gray-400"
						/>
						<p className="mt-1 text-sm text-gray-400">
							{canUploadDocument
								? 'Drag and drop files here, or click upload'
								: 'No documents available'}
						</p>
					</div>
				)}
			</div>

			{/* Comments section */}
			<CommentsList
				comments={comments}
				planningItemId={planningItemId}
				planningOptionId={optionId}
			/>
		</div>
	)
}

export default OptionCard
