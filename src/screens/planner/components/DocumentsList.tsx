import React, { useMemo, useState } from 'react'
import { Icon } from '@iconify/react'
import { toast } from 'react-toastify'
import { IPlanningDocument } from '@interfaces/planner/planningDocument'
import { useCurrentPlanner } from '@hooks/redux/useCurrentPlanner'
import { deletePlanningDocument as deletePlanningDocumentService } from '@services/plannerService'
import {
	useCanUploadDocument,
	usePlannerPermissions
} from '../context/PlannerPermissionsContext'

interface DocumentsListProps {
	documents?: IPlanningDocument[]
	planningItemId: string
	planningOptionId?: string
}

// Helper function to safely compare MongoDB ObjectIDs or string IDs
const compareIds = (id1: any, id2: any): boolean => {
	if (!id1 || !id2) return false

	// Convert both to strings for comparison
	const str1 =
		typeof id1 === 'object' && id1.toString ? id1.toString() : String(id1)
	const str2 =
		typeof id2 === 'object' && id2.toString ? id2.toString() : String(id2)

	return str1 === str2
}

// Helper function to format file size
const formatFileSize = (sizeStr: string): string => {
	const size = parseInt(sizeStr, 10)
	if (isNaN(size)) return '0 B'

	if (size < 1024) return size + ' B'
	if (size < 1024 * 1024) return (size / 1024).toFixed(1) + ' KB'
	if (size < 1024 * 1024 * 1024)
		return (size / (1024 * 1024)).toFixed(1) + ' MB'
	return (size / (1024 * 1024 * 1024)).toFixed(1) + ' GB'
}

// Helper to safely get uploader name from various uploaderId formats
const getUploaderName = (uploaderId: any): string => {
	if (!uploaderId) return 'User'

	if (typeof uploaderId === 'object') {
		// Handle different possible user object structures
		if (uploaderId.name) return uploaderId.name
		if (uploaderId.email) return uploaderId.email
		// If there's a firstName or similar property
		if ('firstName' in uploaderId) {
			return `${uploaderId.firstName} ${uploaderId.familyName || ''}`
		}
	}

	return 'User'
}

const DocumentsList: React.FC<DocumentsListProps> = ({
	documents = [],
	planningItemId,
	planningOptionId
}) => {
	const { deletePlanningDocument } = useCurrentPlanner()
	const canUploadDocument = useCanUploadDocument()
	const { userRole } = usePlannerPermissions()
	const isClient = userRole === 'Client'
	const [deletingId, setDeletingId] = useState<string | null>(null)

	// Filter documents based on context
	const filteredDocuments = useMemo(() => {
		// When used at option level, only show documents for this specific option
		if (planningOptionId) {
			// Use the helper function for ID comparison
			const filtered = documents.filter(
				(doc) =>
					doc.planningOptionId &&
					compareIds(doc.planningOptionId, planningOptionId)
			)

			return filtered
		}

		// When used at item level, only show documents WITHOUT planningOptionId
		return documents.filter((doc) => !doc.planningOptionId)
	}, [documents, planningOptionId])

	// If no documents after filtering, return null
	if (filteredDocuments.length === 0) {
		return null
	}

	const handleDeleteDocument = async (documentId: string) => {
		try {
			setDeletingId(documentId)

			// Server-first approach: Delete from the server first
			await deletePlanningDocumentService(documentId)

			// Then update the Redux state
			deletePlanningDocument(documentId, planningItemId, planningOptionId)

			toast.success('Document deleted successfully')
		} catch (error) {
			console.error('Failed to delete document:', error)
			toast.error('Failed to delete document. Please try again.')
		} finally {
			setDeletingId(null)
		}
	}

	const getIconForMimeType = (mimeType: string) => {
		if (mimeType.includes('pdf')) return 'mdi:file-pdf-box'
		if (mimeType.includes('word') || mimeType.includes('document'))
			return 'mdi:file-word-box'
		if (
			mimeType.includes('excel') ||
			mimeType.includes('spreadsheet') ||
			mimeType.includes('csv')
		)
			return 'mdi:file-excel-box'
		if (mimeType.includes('powerpoint') || mimeType.includes('presentation'))
			return 'mdi:file-powerpoint-box'
		if (mimeType.includes('image')) return 'mdi:file-image-box'
		if (mimeType.includes('text')) return 'mdi:file-text-box'
		if (mimeType.includes('zip') || mimeType.includes('compressed'))
			return 'mdi:file-zip-box'
		return 'mdi:file-document-outline'
	}

	const getColorForMimeType = (mimeType: string): string => {
		if (mimeType.includes('pdf')) return 'text-red-400'
		if (mimeType.includes('word') || mimeType.includes('document'))
			return 'text-blue-400'
		if (
			mimeType.includes('excel') ||
			mimeType.includes('spreadsheet') ||
			mimeType.includes('csv')
		)
			return 'text-green-400'
		if (mimeType.includes('powerpoint') || mimeType.includes('presentation'))
			return 'text-orange-400'
		if (mimeType.includes('image')) return 'text-purple-400'
		return 'text-gray-400'
	}

	return (
		<div className="space-y-3 mt-2">
			{filteredDocuments.map((doc) => (
				<div
					key={doc._id}
					className="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
				>
					<div className="flex items-center min-w-0 flex-1">
						<div className={`shrink-0 ${getColorForMimeType(doc.mimeType)}`}>
							<Icon
								icon={getIconForMimeType(doc.mimeType)}
								className="w-8 h-8 mr-3"
							/>
						</div>
						<div className="min-w-0 flex-1">
							<div
								className="text-sm font-medium text-white truncate"
								title={doc.fileName}
							>
								{doc.fileName}
							</div>
							<div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
								<span>{formatFileSize(doc.size)}</span>
								{doc.uploaderId && (
									<span className="flex items-center">
										<Icon icon="mdi:account" className="w-3 h-3 mr-1" />
										{getUploaderName(doc.uploaderId)}
									</span>
								)}
							</div>
						</div>
					</div>

					<div className="flex items-center ml-4 shrink-0 gap-2">
						{doc.storagePath && (
							<a
								href={doc.storagePath}
								target="_blank"
								rel="noopener noreferrer"
								className="p-1.5 rounded-full hover:bg-gray-700 text-gray-400 hover:text-gray-200 transition-colors"
								title="Open document"
							>
								<Icon icon="mdi:open-in-new" className="h-5 w-5" />
							</a>
						)}

						{canUploadDocument && (
							<button
								onClick={() => handleDeleteDocument(doc._id as string)}
								disabled={deletingId === doc._id}
								className={`p-1.5 rounded-full hover:bg-red-900/30 text-red-400 transition-colors ${
									deletingId === doc._id ? 'opacity-50 cursor-not-allowed' : ''
								}`}
								title="Delete document"
							>
								<Icon
									icon={
										deletingId === doc._id
											? 'mdi:loading'
											: 'mdi:trash-can-outline'
									}
									className={`h-5 w-5 ${
										deletingId === doc._id ? 'animate-spin' : ''
									}`}
								/>
							</button>
						)}
					</div>
				</div>
			))}
		</div>
	)
}

export default DocumentsList
