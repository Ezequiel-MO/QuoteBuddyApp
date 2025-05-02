import React, { useState, memo } from 'react'
import { Icon } from '@iconify/react'
import { toast } from 'react-toastify'
import CommentsList from './CommentsList'
import DocumentsList from './DocumentsList'
import { useCurrentPlanner } from '@hooks/redux/useCurrentPlanner'
import { IPlanningOption, IPlanningComment } from '@interfaces/planner'
import {
	deletePlanningOption,
	createPlanningDocument
} from '@services/plannerService'
import {
	useCanRemoveOption,
	useCanUploadDocument
} from '../context/PlannerPermissionsContext'
import getVendorTypeInfo from '../utils/getVendorTypeInfo'

interface OptionCardProps {
	option: IPlanningOption
	itemComments: IPlanningComment[]
}

const OptionCard: React.FC<OptionCardProps> = ({
	option,
	itemComments = []
}) => {
	const [isUploading, setIsUploading] = useState(false)
	const {
		deletePlanningOption: removePlanningOptionFromState,
		addDocumentsToPlanningOption
	} = useCurrentPlanner()
	const canRemoveOption = useCanRemoveOption()
	const canUploadDocument = useCanUploadDocument()

	// Extract values with fallbacks to avoid undefined errors
	const name = option?.name || 'Unnamed Option'
	const vendorType = option?.vendorType?.toString() || 'Option'
	const planningNotes = option?.planningNotes?.toString() || ''
	const optionId = option?._id || ''
	const planningItemId = option?.planningItemId?.toString() || ''
	const documents = option?.documents || []
	const { icon: vendorIcon, color: vendorColor } = getVendorTypeInfo(vendorType)

	// Filter comments for this specific option
	const optionComments = itemComments.filter(
		(comment) => comment.planningOptionId === optionId
	)

	const handleDelete = async () => {
		if (!optionId || !planningItemId) return

		try {
			await deletePlanningOption(optionId)

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
			const fileArray = Array.from(files)
			const uploadedDocuments = await createPlanningDocument(
				planningItemId,
				fileArray,
				optionId
			)

			if (uploadedDocuments && uploadedDocuments.length > 0) {
				addDocumentsToPlanningOption(
					planningItemId,
					optionId,
					uploadedDocuments
				)
			}

			toast.success(`${fileArray.length} document(s) uploaded successfully!`)
		} catch (error) {
			console.error('Error uploading documents:', error)
			toast.error('Failed to upload documents. Please try again.')
		} finally {
			event.target.value = ''
			setIsUploading(false)
		}
	}

	return (
		<div className="rounded-lg bg-gray-800/80 backdrop-blur-sm">
			<div className="flex justify-between items-start mb-4">
				<div className="flex items-start gap-3">
					<div className={`p-2 rounded-md ${vendorColor} bg-gray-700/50`}>
						<Icon icon={vendorIcon} className="h-5 w-5" />
					</div>
					<div>
						<h3 className="text-lg font-medium text-white-0">{name}</h3>
						<div
							className={`text-sm ${vendorColor} mt-1 flex items-center gap-1`}
						>
							<Icon icon="mdi:tag" className="h-3.5 w-3.5" />
							{vendorType}
						</div>
					</div>
				</div>

				{canRemoveOption && (
					<button
						className="p-1.5 rounded-full hover:bg-red-900/30 text-red-400 transition-colors"
						title="Remove option"
						onClick={handleDelete}
					>
						<Icon icon="mdi:trash-can-outline" className="h-5 w-5" />
					</button>
				)}
			</div>

			<div className="bg-gray-750/80 p-4 rounded-md mb-5 whitespace-pre-line text-gray-300">
				{planningNotes}
			</div>

			{/* Documents section */}
			<DocumentsSection
				documents={documents}
				optionId={optionId}
				planningItemId={planningItemId}
				canUploadDocument={canUploadDocument}
				isUploading={isUploading}
				handleFileUpload={handleFileUpload}
			/>

			{/* Comments section */}
			<CommentsList
				key={`comments-${optionId}-${optionComments.length}`}
				comments={optionComments}
				planningItemId={planningItemId}
				planningOptionId={optionId}
			/>
		</div>
	)
}

/**
 * Documents section component
 */
interface DocumentsSectionProps {
	documents: any[]
	optionId: string
	planningItemId: string
	canUploadDocument: boolean
	isUploading: boolean
	handleFileUpload: (
		event: React.ChangeEvent<HTMLInputElement>
	) => Promise<void>
}

const DocumentsSection: React.FC<DocumentsSectionProps> = ({
	documents,
	optionId,
	planningItemId,
	canUploadDocument,
	isUploading,
	handleFileUpload
}) => (
	<div className="mt-5 border-t border-gray-700 pt-4 mb-5">
		<div className="flex justify-between items-center mb-3">
			<h4 className="text-sm font-medium text-gray-300 flex items-center">
				<Icon icon="mdi:file-document-outline" className="mr-1.5" />
				Documents
			</h4>
			{canUploadDocument && (
				<label
					htmlFor={`file-upload-option-${optionId}`}
					className={`cursor-pointer text-sm flex items-center px-3 py-1.5 
            bg-gray-700 text-gray-300 rounded border border-gray-600 
            hover:bg-gray-650 transition-colors ${
							isUploading ? 'opacity-50 cursor-not-allowed' : ''
						}`}
				>
					{isUploading ? (
						<>
							<Icon
								icon="mdi:loading"
								className="animate-spin mr-1.5 h-4 w-4"
							/>
							Uploading...
						</>
					) : (
						<>
							<Icon icon="mdi:upload" className="mr-1.5 h-4 w-4" />
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
				key={`documents-list-${optionId}`}
				documents={documents}
				planningItemId={planningItemId}
				planningOptionId={optionId}
			/>
		) : (
			<div className="flex flex-col items-center justify-center py-6 border-2 border-dashed border-gray-600 rounded-lg bg-gray-800/30">
				<Icon
					icon="mdi:file-document-outline"
					className="h-12 w-12 text-gray-400"
				/>
				<p className="mt-2 text-sm text-gray-400">
					{canUploadDocument
						? 'Drag and drop files here, or click upload'
						: 'No documents available'}
				</p>
			</div>
		)}
	</div>
)

// Use memo to prevent unnecessary re-renders
export default memo(OptionCard)
