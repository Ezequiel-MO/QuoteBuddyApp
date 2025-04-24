import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import DocumentsList from './DocumentsList'
import OptionsList from './OptionsList'
import { usePlannerContext } from '../context/PlannerContext'
import { IPlanningItem } from '@interfaces/planner'
import {
	useCanRemovePlanningItem,
	useCanUploadDocument
} from '../context/PlannerPermissionsContext'
import AddPlanningOptionModal from './AddPlanningOptionModal'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { deletePlanningItem } from '@services/plannerService'
import { toast } from 'react-toastify'
import { useLoading } from '../context/LoadingContext'
import { format } from 'date-fns'
import { useAccManagerLookup } from '@hooks/useAccManagerLookup'
import { createPlanningDocument } from '@services/plannerService'
import { useCurrentPlanner } from '@hooks/redux/useCurrentPlanner'

interface PlanningItemCardProps {
	item: IPlanningItem
}

const PlanningItemCard: React.FC<PlanningItemCardProps> = ({ item }) => {
	const { removePlanningItem, toggleItemExpanded, state } = usePlannerContext()
	const canRemovePlanningItem = useCanRemovePlanningItem()
	const canUploadDocument = useCanUploadDocument()
	const [isOptionModalOpen, setIsOptionModalOpen] = useState(false)
	const [isUploading, setIsUploading] = useState(false)
	const { isLoading, startLoading, stopLoading } = useLoading()
	const { getAccManagerName } = useAccManagerLookup()
	const { addDocumentsToPlanningOption } = useCurrentPlanner()

	// Initialize important variables first
	const planningItemId = item._id || ''
	const isDeleting = isLoading('deleteItem')

	// Extract comments from item level and prepare them for passing to options
	const itemLevelComments = (item as any).comments || []

	// Log the createdBy field for debugging
	console.log(
		`PlanningItemCard (${item.title}): item.createdBy =`,
		item.createdBy
	)

	// Log the item.comments field for debugging
	console.log(`PlanningItemCard (${item.title}): Comments data =`, {
		hasCommentsField: 'comments' in item,
		commentsData: (item as any).comments,
		commentsLength: (item as any).comments ? (item as any).comments.length : 0
	})

	// Log document structure safely after planningItemId is defined
	console.log(`PlanningItemCard (${item.title}): Documents data =`, {
		itemLevelDocuments: item.documents,
		documentCount: item.documents?.length || 0,
		hasDocumentsWithOptionIds: item.documents?.some(
			(doc) => !!doc.planningOptionId
		)
	})

	// dnd-kit sortable setup
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging
	} = useSortable({
		id: planningItemId
	})

	// Style for drag-and-drop transitions
	const style = {
		transform: CSS.Transform.toString(transform),
		opacity: isDragging ? 0.8 : 1,
		transition: isDragging
			? 'transform 200ms cubic-bezier(0.25, 1, 0.5, 1), opacity 150ms ease'
			: transition || 'transform 200ms ease, opacity 150ms ease'
	}

	const isExpanded = state.expandedItemIds.has(planningItemId)

	const handleDelete = async () => {
		console.log('Deleting item with ID:', item._id)
		if (!item?._id) {
			console.error('Cannot delete item without ID')
			return
		}

		try {
			startLoading('deleteItem')

			// Delete from database
			await deletePlanningItem(item._id)

			// After successful deletion, update Redux state
			removePlanningItem(item._id)

			toast.success('Planning item deleted successfully')
		} catch (error) {
			console.error('Error deleting planning item:', error)
			toast.error('Failed to delete planning item from database')
		} finally {
			stopLoading('deleteItem')
		}
	}

	// Get status color based on status
	const getStatusColor = () => {
		switch (item.status) {
			case 'Confirmed':
				return 'bg-green-600'
			case 'Discussing':
				return 'bg-yellow-600'
			case 'Booked':
				return 'bg-blue-600'
			case 'Proposed':
			default:
				return 'bg-gray-600'
		}
	}

	// Handle file upload at the planning item level
	const handleFileUpload = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const files = event.target.files
		if (!files || !files.length || !planningItemId) return

		setIsUploading(true)

		try {
			// Convert FileList to Array
			const fileArray = Array.from(files)

			console.log('Uploading documents to planning item:', {
				planningItemId,
				fileCount: fileArray.length
			})

			// Server-first approach: Upload to the server first
			// Note: We don't pass optionId to create documents at the item level
			const uploadedDocuments = await createPlanningDocument(
				planningItemId,
				fileArray
			)

			console.log('Documents uploaded successfully:', {
				uploadedCount: uploadedDocuments.length,
				documents: uploadedDocuments
			})

			// Update Redux state with the uploaded documents
			if (uploadedDocuments && uploadedDocuments.length > 0) {
				// Add the documents to the Redux store at item level (empty string as optionId)
				addDocumentsToPlanningOption(planningItemId, '', uploadedDocuments)
				console.log('Redux state updated with new documents at item level')
			}

			// Show success message
			toast.success(`${fileArray.length} document(s) uploaded successfully!`)
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
		<>
			<div
				ref={setNodeRef}
				style={style}
				id={`planning-item-${planningItemId}`}
				className={`bg-gray-800 rounded-xl shadow-md overflow-hidden border mb-4 transition-all duration-200 ${
					isDragging ? 'border-cyan-100' : 'border-[#ea5933]'
				}`}
			>
				{/* Header - Always visible */}
				<div className="p-4 hover:bg-gray-750 flex items-center justify-between pr-10">
					{/* Left Side: Drag handle and content */}
					<div
						{...listeners}
						{...attributes}
						className="flex-grow flex items-center cursor-grab"
					>
						{/* Drag handle */}
						<div
							className="flex-none p-2 cursor-grab mr-2 text-gray-500 hover:text-gray-300"
							title="Drag to reorder"
						>
							<Icon icon="mdi:drag" className="h-5 w-5" />
						</div>
						{/* Title, status, and day */}
						<div className="flex-grow select-none">
							<div className="flex items-center">
								<h2 className="text-xl font-semibold text-white-0">
									{item.title}
								</h2>
								<span
									className={`ml-3 px-2 py-1 text-xs rounded-full text-white ${getStatusColor()}`}
								>
									{item.status}
								</span>
								<span className="ml-3 text-sm text-gray-400">
									Day {item.dayIndex}
								</span>
							</div>
							{!isExpanded && item.description && (
								<p className="text-gray-400 text-sm mt-1 truncate">
									{item.description}
								</p>
							)}
						</div>
					</div>
					{/* Right Side: Expand/Collapse */}
					<button
						type="button"
						onClick={() => toggleItemExpanded(planningItemId)}
						className="flex-none ml-4 flex items-center cursor-pointer px-3 py-1 rounded hover:bg-gray-700 z-10 select-none"
						title={isExpanded ? 'Collapse item' : 'Expand item'}
					>
						<span className="text-sm text-gray-500 mr-2 whitespace-nowrap">
							{isExpanded ? 'Click to collapse' : 'Click to expand'}
						</span>
						<Icon
							icon={isExpanded ? 'mdi:chevron-up' : 'mdi:chevron-down'}
							className="h-5 w-5 text-gray-400"
						/>
					</button>
				</div>
			</div>

			{/* Body - Only visible when expanded */}
			{isExpanded && (
				<div className="p-4 pt-0 border-t border-gray-700">
					{/* Full description */}
					{item.description && (
						<p className="text-gray-300 my-4">{item.description}</p>
					)}

					{/* Meta information */}
					<div className="flex justify-between items-center mb-4 text-sm text-gray-400">
						<span>
							Created by{' '}
							{item.createdBy && typeof item.createdBy === 'object'
								? `${item.createdBy.firstName} ${item.createdBy.familyName}`
								: getAccManagerName(item.createdBy?.toString())}{' '}
							on{' '}
							{item.date
								? format(new Date(item.date), 'MMM d, yyyy h:mm a')
								: 'Unknown date'}
						</span>
						{canRemovePlanningItem && (
							<button
								onClick={handleDelete}
								disabled={isDeleting}
								className={`p-1 rounded-full hover:bg-red-900/30 text-red-400 transition-colors ${
									isDeleting ? 'opacity-50 cursor-not-allowed' : ''
								}`}
								title="Remove planning item"
							>
								<Icon
									icon={isDeleting ? 'mdi:loading' : 'mdi:trash-can-outline'}
									className={`h-5 w-5 ${isDeleting ? 'animate-spin' : ''}`}
								/>
							</button>
						)}
					</div>

					{/* Document upload area */}
					<div className="mt-4 border-t border-gray-700 pt-3">
						<div className="flex justify-between items-center mb-3">
							<h4 className="text-sm font-medium text-gray-300 flex items-center">
								<Icon icon="mdi:file-document-outline" className="mr-1" />
								Item Documents
							</h4>
							{canUploadDocument && (
								<label
									htmlFor={`file-upload-item-${planningItemId}`}
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
											Upload Item Document
										</>
									)}
									<input
										id={`file-upload-item-${planningItemId}`}
										type="file"
										multiple
										className="hidden"
										onChange={handleFileUpload}
										disabled={isUploading}
									/>
								</label>
							)}
						</div>
						<DocumentsList
							documents={item.documents || []}
							planningItemId={planningItemId}
						/>
					</div>

					{/* Options */}
					<OptionsList
						options={item.options || []}
						planningItemId={planningItemId}
						itemComments={itemLevelComments}
						onAddOptionClick={() => setIsOptionModalOpen(true)}
					/>
				</div>
			)}

			{/* Option Modal */}
			{planningItemId && (
				<AddPlanningOptionModal
					isOpen={isOptionModalOpen}
					onClose={() => setIsOptionModalOpen(false)}
					planningItemId={planningItemId}
				/>
			)}
		</>
	)
}

export default PlanningItemCard
