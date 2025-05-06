import React, { useState, useCallback, memo } from 'react'
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
import {
	deletePlanningItem,
	createPlanningDocument
} from '@services/plannerService'
import { toast } from 'react-toastify'
import { useLoading } from '../context/LoadingContext'
import { format } from 'date-fns'
import { useAccManagerLookup } from '@hooks/useAccManagerLookup'
import { useCurrentPlanner } from '@hooks/redux/useCurrentPlanner'
import getStatusInfo from '../utils/getStatusInfo'
import getItemTypeInfo from '../utils/getItemTypeInfo'

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

	const planningItemId = item._id || ''
	const isDeleting = isLoading('deleteItem')
	const isExpanded = state.expandedItemIds.has(planningItemId)
	const isClient = userRole === 'Client'
	const itemLevelComments = (item as any).comments || []
	const {
		icon: itemIcon,
		color: itemColor,
		bgColor: itemBgColor
	} = getItemTypeInfo(item.itemType || '')
	const {
		color: statusColor,
		textColor: statusTextColor,
		icon: statusIcon
	} = getStatusInfo(item.status || 'Proposed')

	const formattedDate = item.date
		? format(new Date(item.date), 'MMM d, yyyy')
		: 'No date'

	const {
		attributes,
		listeners, // We will apply listeners ONLY to the drag handle
		setNodeRef,
		transform,
		transition,
		isDragging
	} = useSortable({
		id: planningItemId,
		data: { // Pass item data for potential use in drag overlay or handlers
			type: 'PlanningItem',
			item: item,
		}
	})

	const style = {
		transform: CSS.Transform.toString(transform),
		opacity: isDragging ? 0.4 : 1, // Make it more transparent when dragging
		transition: isDragging
			? 'none' // Prevent transition during drag for smoother movement
			: transition || 'transform 200ms ease, opacity 150ms ease',
		zIndex: isDragging ? 10 : 'auto' // Ensure dragged item is on top
	}

	const handleDelete = async () => {
		if (!item?._id) {
			console.error('Cannot delete item without ID')
			return
		}

		try {
			startLoading('deleteItem')
			await deletePlanningItem(item._id)
			removePlanningItem(item._id)
			toast.success('Planning item deleted successfully')
		} catch (error) {
			console.error('Error deleting planning item:', error)
			toast.error('Failed to delete planning item from database')
		} finally {
			stopLoading('deleteItem')
		}
	}

	const handleFileUpload = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const files = event.target.files
		if (!files || !files.length || !planningItemId) return

		setIsUploading(true)
		setUploadingFiles(Array.from(files).map((file) => file.name))

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
			event.target.value = ''
			setIsUploading(false)
			setUploadingFiles([])
		}
	}

	// File drag and drop handlers
	const handleDragOver = useCallback(
		(e: React.DragEvent<HTMLDivElement>) => {
			if (canUploadDocument) {
				e.preventDefault()
				e.stopPropagation()
				e.currentTarget.classList.add('bg-gray-700')
			}
		},
		[canUploadDocument]
	)

	const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		e.stopPropagation()
		e.currentTarget.classList.remove('bg-gray-700')
	}, [])

	const handleDrop = useCallback(
		async (e: React.DragEvent<HTMLDivElement>) => {
			e.preventDefault()
			e.stopPropagation()
			e.currentTarget.classList.remove('bg-gray-700')

			if (!canUploadDocument || !planningItemId) return

			const files = e.dataTransfer.files
			if (!files || files.length === 0) return

			setIsUploading(true)
			setUploadingFiles(Array.from(files).map((file) => file.name))

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
				setUploadingFiles([])
			}
		},
		[canUploadDocument, planningItemId, addDocumentsToPlanningOption]
	)

	// Toggle expanded state
	const handleToggleExpand = useCallback(() => {
		if (planningItemId) {
			toggleItemExpanded(planningItemId)
		}
	}, [planningItemId, toggleItemExpanded])

	// Prevent drag start when clicking interactive elements inside the header
    const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();


	return (
		<div
			ref={setNodeRef} // Apply ref to the main container
			style={style as React.CSSProperties}
			className={`rounded-xl border ${
				isExpanded ? 'border-gray-600' : 'border-gray-700'
			} bg-gray-800 shadow-lg transition-all duration-300 ${
				isExpanded ? 'shadow-xl' : ''
			} ${isDragging ? 'ring-2 ring-[#ea5933]' : ''}`} // Add ring when dragging
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
			{...attributes} // Apply attributes to the main container
		>
			{/* Header section */}
			<div
				className={`flex items-center justify-between p-4 ${
					isExpanded ? 'border-b border-gray-700' : ''
				}`}
				// Remove onClick from the header div to prevent conflict with drag handle
			>
				{/* Left side: Drag Handle, Icon, Title, Metadata */}
				<div className="flex items-center space-x-3 flex-1 min-w-0">
					{/* Drag Handle */}
					<div
						{...listeners} // Apply listeners ONLY to the handle
						className="p-1 cursor-grab active:cursor-grabbing text-gray-500 hover:text-gray-300"
						title="Drag to reorder"
						onClick={stopPropagation} // Prevent card expand/collapse when clicking handle
					>
						<Icon icon="mdi:drag-vertical" className="h-5 w-5" />
					</div>

					{/* Item type icon - Now just visual */}
					<div
						className={`p-2 rounded-md ${itemBgColor} flex-shrink-0`}
						onClick={handleToggleExpand} // Allow clicking icon to expand/collapse
						style={{ cursor: 'pointer' }}
					>
						<Icon icon={itemIcon} className={`h-5 w-5 ${itemColor}`} />
					</div>

					{/* Title and metadata */}
					<div
						className="flex-1 min-w-0"
						onClick={handleToggleExpand} // Allow clicking title area to expand/collapse
						style={{ cursor: 'pointer' }}
					>
						<h3 className="text-lg font-medium text-white truncate">
							{item.title}
						</h3>
						<div className="flex items-center mt-1 text-sm text-gray-400 space-x-3 flex-wrap">
							{/* Day indicator */}
							<span className="flex items-center">
								<Icon icon="mdi:calendar-blank" className="mr-1 h-4 w-4" />
								Day {item.dayIndex}
							</span>
							{/* Date */}
							<span className="flex items-center">
								<Icon icon="mdi:clock-outline" className="mr-1 h-4 w-4" />
								{formattedDate}
							</span>
							{/* Created by */}
							<span className="flex items-center">
								<Icon icon="mdi:account" className="mr-1 h-4 w-4" />
								{item.createdBy
									? getAccManagerName(item.createdBy) // Remove .toString()
									: 'Unknown'}
							</span>
						</div>
					</div>
				</div>

				{/* Right side: Status, Delete, Expand */}
				<div className="flex items-center space-x-2 flex-shrink-0 pl-2">
					{/* Status badge */}
					<div
						className={`px-2 py-1 rounded-full ${statusColor} flex items-center`}
						onClick={stopPropagation} // Prevent card expand/collapse
					>
						<Icon
							icon={statusIcon}
							className={`h-3.5 w-3.5 mr-1 ${statusTextColor}`}
						/>
						<span className={`text-xs font-medium ${statusTextColor}`}>
							{item.status}
						</span>
					</div>

					{/* Delete button */}
					{canRemovePlanningItem && !isClient && (
						<button
							onClick={(e) => {
								stopPropagation(e); // Prevent card expand/collapse
								handleDelete();
							}}
							disabled={isDeleting}
							className={`p-1.5 rounded-full hover:bg-red-900/30 text-red-400 transition-colors ${
								isDeleting ? 'opacity-50 cursor-not-allowed' : ''
							}`}
							title="Delete planning item"
						>
							{isDeleting ? (
								<Icon icon="mdi:loading" className="h-5 w-5 animate-spin" />
							) : (
								<Icon icon="mdi:trash-can-outline" className="h-5 w-5" />
							)}
						</button>
					)}

					{/* Expand/collapse indicator */}
					<div
						className="text-gray-400 p-1 cursor-pointer"
						onClick={handleToggleExpand} // Allow clicking chevron to expand/collapse
					>
						<Icon
							icon={isExpanded ? 'mdi:chevron-up' : 'mdi:chevron-down'}
							className="h-6 w-6"
						/>
					</div>
				</div>
			</div>

			{/* Expanded content */}
			{isExpanded && (
				<div className="p-4 pt-0"> {/* Adjusted padding */}
					{/* Description */}
					{item.description && (
						<div className="mb-6">
							<h4 className="text-sm font-medium text-gray-300 mb-2 flex items-center">
								<Icon icon="mdi:text-box-outline" className="mr-1.5" />
								Description
							</h4>
							<div className="bg-gray-750 p-3 rounded-md text-gray-300 whitespace-pre-line">
								{item.description}
							</div>
						</div>
					)}

					{/* Documents section */}
					<div className="mb-6">
						<div className="flex justify-between items-center mb-3">
							<h4 className="text-sm font-medium text-gray-300 flex items-center">
								<Icon icon="mdi:file-document-outline" className="mr-1.5" />
								Documents
							</h4>
							{canUploadDocument && (
								<label
									htmlFor={`file-upload-${planningItemId}`}
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
											Upload Files
										</>
									)}
									<input
										id={`file-upload-${planningItemId}`}
										type="file"
										multiple
										className="hidden"
										onChange={handleFileUpload}
										disabled={isUploading}
									/>
								</label>
							)}
						</div>

						{/* Show uploading files */}
						{isUploading && uploadingFiles.length > 0 && (
							<div className="mb-3 bg-gray-750 p-2 rounded-md">
								<div className="text-xs text-gray-400 mb-1">Uploading:</div>
								<div className="space-y-1">
									{uploadingFiles.map((filename, index) => (
										<div
											key={`uploading-${index}`}
											className="flex items-center text-sm text-gray-300"
										>
											<Icon
												icon="mdi:loading"
												className="animate-spin mr-2 h-4 w-4 text-blue-400"
											/>
											{filename}
										</div>
									))}
								</div>
							</div>
						)}

						{/* Document list */}
						<DocumentsList
							documents={item.documents || []}
							planningItemId={planningItemId}
						/>

						{/* Upload hint */}
						{canUploadDocument && (
							<div className="text-xs text-gray-500 mt-2">
								<Icon
									icon="mdi:information-outline"
									className="inline-block mr-1"
								/>
								Drag and drop files here to upload, or use the upload button
							</div>
						)}
					</div>

					{/* Options section */}
					<div className="mt-8">
						<div className="flex justify-between items-center mb-4">
							<h4 className="text-base font-medium text-gray-200 flex items-center">
								<Icon icon="mdi:format-list-checks" className="mr-1.5" />
								Options
							</h4>
							{canAddOption && (
								<button
									onClick={(e) => {
										e.stopPropagation(); // Prevent event bubbling
										setIsOptionModalOpen(true);
									}}
									className="px-3 py-1.5 bg-[#ea5933] text-white rounded hover:bg-[#d04d2b] transition-colors text-sm flex items-center"
								>
									<Icon icon="mdi:plus" className="mr-1.5 h-4 w-4" />
									Add Option
								</button>
							)}
						</div>

						<OptionsList
							options={item.options || []}
							itemComments={itemLevelComments}
							onAddOptionClick={() => {
								setIsOptionModalOpen(true);
							}}
							canAddOption={canAddOption}
						/>
					</div>

					{/* Add Option Modal */}
					{isOptionModalOpen && (
						<AddPlanningOptionModal
							isOpen={isOptionModalOpen}
							onClose={() => setIsOptionModalOpen(false)}
							planningItemId={planningItemId}
						/>
					)}
				</div>
			)}
		</div>
	)
}

export default memo(PlanningItemCard)
