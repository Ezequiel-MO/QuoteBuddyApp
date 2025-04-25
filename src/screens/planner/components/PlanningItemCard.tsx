import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import DocumentsList from './DocumentsList'
import OptionsList from './OptionsList'
import { usePlannerContext } from '../context/PlannerContext'
import { IPlanningItem } from '@interfaces/planner'
import {
	useCanRemovePlanningItem,
	useCanUploadDocument,
	useCanAddOption,
	usePlannerPermissions
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
	const canAddOption = useCanAddOption()
	const { userRole } = usePlannerPermissions()
	const [isOptionModalOpen, setIsOptionModalOpen] = useState(false)
	const [isUploading, setIsUploading] = useState(false)
	const [uploadingFiles, setUploadingFiles] = useState<string[]>([])
	const { isLoading, startLoading, stopLoading } = useLoading()
	const { getAccManagerName } = useAccManagerLookup()
	const { addDocumentsToPlanningOption } = useCurrentPlanner()

	// Initialize important variables first
	const planningItemId = item._id || ''
	const isDeleting = isLoading('deleteItem')
	const isExpanded = state.expandedItemIds.has(planningItemId)
	const isClient = userRole === 'Client'

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
		// Show uploading file names
		setUploadingFiles(Array.from(files).map((file) => file.name))

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
			setUploadingFiles([])
		}
	}

	// Allow drag and drop file upload
	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		if (canUploadDocument) {
			e.preventDefault()
			e.stopPropagation()
			e.currentTarget.classList.add('bg-gray-700')
		}
	}

	const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		e.stopPropagation()
		e.currentTarget.classList.remove('bg-gray-700')
	}

	const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
		if (!canUploadDocument) return

		e.preventDefault()
		e.stopPropagation()
		e.currentTarget.classList.remove('bg-gray-700')

		const files = e.dataTransfer.files
		if (!files || !files.length || !planningItemId) return

		setIsUploading(true)

		try {
			const fileArray = Array.from(files)
			const uploadedDocuments = await createPlanningDocument(
				planningItemId,
				fileArray
			)

			if (uploadedDocuments && uploadedDocuments.length > 0) {
				addDocumentsToPlanningOption(planningItemId, '', uploadedDocuments)
			}

			toast.success(`${fileArray.length} document(s) uploaded successfully!`)
		} catch (error) {
			console.error('Error uploading documents:', error)
			toast.error('Failed to upload documents. Please try again.')
		} finally {
			setIsUploading(false)
		}
	}

	return (
		<>
			<div
				ref={setNodeRef}
				style={style}
				id={`planning-item-${planningItemId}`}
				className={`bg-gray-800 rounded-xl shadow-lg overflow-hidden border-l-4 transition-all duration-200 mb-8 ${
					isDragging
						? 'border-cyan-500 ring-2 ring-cyan-500/30'
						: isExpanded
						? 'border-[#ea5933]'
						: 'border-gray-600 hover:border-[#ea5933]'
				}`}
			>
				{/* Header - Always visible */}
				<div
					className="p-4 hover:bg-gray-750 transition-colors cursor-pointer"
					onClick={() => toggleItemExpanded(planningItemId)}
				>
					{/* Left Side: Drag handle and content */}
					<div
						{...listeners}
						{...attributes}
						className="flex items-center gap-3"
					>
						{/* Drag handle */}
						<div
							className="p-2 cursor-grab text-gray-400 hover:text-gray-300 bg-gray-700/50 rounded"
							title="Drag to reorder"
							onClick={(e) => e.stopPropagation()}
						>
							<Icon icon="mdi:drag" className="h-5 w-5" />
						</div>

						{/* Title and badges */}
						<div className="flex-grow">
							<div className="flex flex-wrap items-center gap-2">
								<h2 className="text-xl font-semibold text-white-0">
									{item.title}
								</h2>
								<div className="flex flex-wrap gap-2 items-center">
									<span
										className={`px-2 py-1 text-xs rounded-full text-white ${getStatusColor()}`}
									>
										{item.status}
									</span>
									<span className="text-sm text-gray-400 flex items-center">
										<Icon icon="mdi:calendar-today" className="mr-1 h-4 w-4" />
										Day {item.dayIndex}
									</span>
								</div>
							</div>

							{/* Preview description when collapsed */}
							{!isExpanded && item.description && (
								<p className="text-gray-400 text-sm mt-2 line-clamp-2">
									{item.description}
								</p>
							)}
						</div>

						{/* Expand/Collapse button */}
						<button
							type="button"
							className="flex items-center gap-1 px-3 py-2 rounded hover:bg-gray-700 text-gray-400 hover:text-gray-200 transition-colors ml-auto"
							title={isExpanded ? 'Collapse item' : 'Expand item'}
							onClick={(e) => {
								e.stopPropagation() // Prevent double toggle
								toggleItemExpanded(planningItemId)
							}}
						>
							<Icon
								icon={isExpanded ? 'mdi:chevron-up' : 'mdi:chevron-down'}
								className="h-5 w-5"
							/>
						</button>
					</div>
				</div>

				{/* Body - Only visible when expanded */}
				{isExpanded && (
					<div
						className="p-5 pt-0 border-t border-gray-700"
						onDragOver={handleDragOver}
						onDragLeave={handleDragLeave}
						onDrop={handleDrop}
					>
						{/* Full description */}
						{item.description && (
							<div className="my-5 bg-gray-750 p-4 rounded-lg border border-gray-700">
								<h3 className="text-sm font-medium text-gray-400 mb-2 flex items-center">
									<Icon icon="mdi:text-box-outline" className="mr-2" />
									Description
								</h3>
								<p className="text-gray-300">{item.description}</p>
							</div>
						)}

						{/* Meta information */}
						<div className="flex flex-col sm:flex-row justify-between sm:items-center mb-5 gap-2 text-sm text-gray-400">
							<span className="flex items-center gap-1">
								<Icon icon="mdi:account" className="h-4 w-4" />
								Created by{' '}
								<span className="text-gray-300 font-medium">
									{item.createdBy && typeof item.createdBy === 'object'
										? `${item.createdBy.firstName} ${item.createdBy.familyName}`
										: getAccManagerName(item.createdBy?.toString())}
								</span>{' '}
								on{' '}
								<span className="text-gray-300">
									{item.date
										? format(new Date(item.date), 'MMM d, yyyy h:mm a')
										: 'Unknown date'}
								</span>
							</span>

							{canRemovePlanningItem && (
								<button
									onClick={handleDelete}
									disabled={isDeleting}
									className={`px-3 py-1.5 rounded bg-red-900/20 hover:bg-red-900/30 text-red-400 transition-colors flex items-center gap-1 ${
										isDeleting ? 'opacity-50 cursor-not-allowed' : ''
									}`}
									title="Remove planning item"
								>
									<Icon
										icon={isDeleting ? 'mdi:loading' : 'mdi:trash-can-outline'}
										className={`h-4 w-4 ${isDeleting ? 'animate-spin' : ''}`}
									/>
									<span>Delete Item</span>
								</button>
							)}
						</div>

						{/* Document upload area */}
						<div className="mt-5 bg-gray-750 p-4 rounded-lg border border-gray-700">
							<div className="flex justify-between items-center mb-3">
								<h3 className="text-sm font-medium text-gray-300 flex items-center">
									<Icon icon="mdi:file-document-outline" className="mr-2" />
									Item Documents
								</h3>
								{canUploadDocument && (
									<label
										htmlFor={`file-upload-item-${planningItemId}`}
										className={`cursor-pointer text-sm flex items-center px-3 py-1.5 ${
											isClient ? 'bg-[#ea5933]' : 'bg-cyan-700'
										} text-white rounded hover:opacity-90 transition-colors ${
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
												Upload Document
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

							{canUploadDocument && !item.documents?.length && (
								<div className="flex flex-col items-center justify-center py-8 border-2 border-dashed border-gray-600 rounded-lg bg-gray-800/30">
									<Icon
										icon="mdi:cloud-upload-outline"
										className="h-12 w-12 text-gray-500"
									/>
									<p className="mt-2 text-sm text-gray-400">
										Drag and drop files here, or click upload
									</p>
									<p className="mt-1 text-xs text-gray-500">
										Supported file types: PDF, Word, Excel, Images
									</p>

									{/* Show uploading file names */}
									{isUploading && uploadingFiles.length > 0 && (
										<div className="mt-4 w-full max-w-md">
											<p className="text-sm text-cyan-400 mb-2 flex items-center">
												<Icon
													icon="mdi:loading"
													className="animate-spin mr-2"
												/>
												Uploading {uploadingFiles.length} file(s)...
											</p>
											<div className="max-h-32 overflow-y-auto bg-gray-850 p-2 rounded border border-gray-700">
												{uploadingFiles.map((filename, index) => (
													<div
														key={index}
														className="text-xs text-gray-300 py-1 flex items-center"
													>
														<Icon
															icon="mdi:file-document-outline"
															className="mr-1 text-gray-400"
														/>
														{filename}
													</div>
												))}
											</div>
										</div>
									)}
								</div>
							)}

							{canUploadDocument &&
								isUploading &&
								item.documents?.length > 0 && (
									<div className="mt-4 w-full">
										<div className="flex items-center text-sm text-cyan-400 mb-2">
											<Icon icon="mdi:loading" className="animate-spin mr-2" />
											Uploading {uploadingFiles.length} file(s)...
										</div>
										{uploadingFiles.length > 0 && (
											<div className="max-h-24 overflow-y-auto bg-gray-850 p-2 rounded border border-gray-700 mb-3">
												{uploadingFiles.map((filename, index) => (
													<div
														key={index}
														className="text-xs text-gray-300 py-1 flex items-center"
													>
														<Icon
															icon="mdi:file-document-outline"
															className="mr-1 text-gray-400"
														/>
														{filename}
													</div>
												))}
											</div>
										)}
									</div>
								)}

							{item.documents && item.documents.length > 0 && (
								<DocumentsList
									documents={item.documents}
									planningItemId={planningItemId}
								/>
							)}
						</div>

						{/* Options */}
						<div className="mt-6">
							<h3 className="text-lg font-medium text-white flex items-center mb-4">
								<Icon icon="mdi:ballot-outline" className="mr-2 h-5 w-5" />
								Options
							</h3>
							<OptionsList
								options={item.options || []}
								planningItemId={planningItemId}
								itemComments={itemLevelComments}
								onAddOptionClick={() => setIsOptionModalOpen(true)}
								canAddOption={canAddOption}
							/>
						</div>
					</div>
				)}
			</div>

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
