import React, { useMemo, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { toast } from 'react-toastify'
import { IPlanningDocument } from '@interfaces/planner/planningDocument'
import { useCurrentPlanner } from '@hooks/redux/useCurrentPlanner'
import { deletePlanningDocument as deletePlanningDocumentService } from '@services/plannerService'

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

const DocumentsList: React.FC<DocumentsListProps> = ({
	documents = [],
	planningItemId,
	planningOptionId
}) => {
	const { deletePlanningDocument } = useCurrentPlanner()

	// Log on component mount
	useEffect(() => {
		console.log(
			`DocumentsList mounted with ${documents.length} documents for ${
				planningOptionId || 'item level'
			}`
		)

		// Log the full document data for better debugging
		if (documents.length > 0) {
			console.log(
				'Full document data for this component:',
				JSON.stringify(documents)
			)
		}
	}, [documents.length, planningOptionId, documents])

	// Add detailed logging of all documents
	console.log('DocumentsList - All documents:', {
		documents,
		count: documents.length,
		individualDocs: documents.map((doc) => ({
			id: doc._id,
			fileName: doc.fileName,
			planningItemId: doc.planningItemId,
			planningOptionId: doc.planningOptionId,
			shouldShowAtItemLevel: !doc.planningOptionId,
			shouldShowAtOptionLevel:
				planningOptionId && compareIds(doc.planningOptionId, planningOptionId)
		}))
	})

	// Filter documents based on context
	const filteredDocuments = useMemo(() => {
		// When used at option level, only show documents for this specific option
		if (planningOptionId) {
			// More explicit logging to debug option document issues
			console.log(
				`Option level document check for option ID: ${planningOptionId}`,
				{
					allDocuments: documents,
					documentIDs: documents.map((d) => d._id),
					documentOptionIDs: documents.map((d) => d.planningOptionId),
					stringComparison: documents.map((d) => ({
						docOptionId: d.planningOptionId,
						componentOptionId: planningOptionId,
						isEqual: compareIds(d.planningOptionId, planningOptionId),
						typeofDocOptionId: typeof d.planningOptionId,
						typeofComponentOptionId: typeof planningOptionId
					}))
				}
			)

			// Use the helper function for ID comparison
			const filtered = documents.filter(
				(doc) =>
					doc.planningOptionId &&
					compareIds(doc.planningOptionId, planningOptionId)
			)

			console.log(`Option level (${planningOptionId}) filtering:`, {
				beforeCount: documents.length,
				afterCount: filtered.length,
				matchingDocs: filtered.map((d) => d.fileName)
			})

			return filtered
		}

		// When used at item level, only show documents WITHOUT planningOptionId
		const filtered = documents.filter((doc) => !doc.planningOptionId)
		console.log('Item level filtering:', {
			beforeCount: documents.length,
			afterCount: filtered.length,
			matchingDocs: filtered.map((d) => d.fileName)
		})

		return filtered
	}, [documents, planningOptionId])

	// Log the filtering results for debugging
	console.log('DocumentsList filtering:', {
		context: planningOptionId ? 'option-level' : 'item-level',
		totalDocumentsReceived: documents.length,
		filteredDocumentsShown: filteredDocuments.length,
		planningItemId,
		planningOptionId
	})

	// Original check - if no documents after filtering, return null
	if (filteredDocuments.length === 0) {
		return null
	}

	const handleDeleteDocument = async (documentId: string) => {
		try {
			// Server-first approach: Delete from the server first
			await deletePlanningDocumentService(documentId)

			// Then update the Redux state
			deletePlanningDocument(documentId, planningItemId, planningOptionId)

			toast.success('Document deleted successfully')
		} catch (error) {
			console.error('Failed to delete document:', error)
			toast.error('Failed to delete document. Please try again.')
		}
	}

	const getIconForMimeType = (mimeType: string) => {
		if (mimeType.includes('pdf')) return 'mdi:file-pdf-box'
		if (mimeType.includes('word')) return 'mdi:file-word-box'
		if (mimeType.includes('excel') || mimeType.includes('spreadsheet'))
			return 'mdi:file-excel-box'
		if (mimeType.includes('image')) return 'mdi:file-image-box'
		return 'mdi:file-document-outline'
	}

	return (
		<div className="mt-4 border-t border-gray-700 pt-3">
			<h4 className="text-sm font-medium text-gray-300 mb-2 flex items-center">
				<Icon icon="mdi:file-document-outline" className="mr-1" />
				Documents ({filteredDocuments.length})
			</h4>
			<div className="space-y-2">
				{filteredDocuments.map((doc) => (
					<div
						key={doc._id}
						className="flex items-center justify-between p-2 bg-gray-800 rounded-md"
					>
						<div className="flex items-center">
							<Icon
								icon={getIconForMimeType(doc.mimeType)}
								className="w-5 h-5 mr-2 text-gray-400"
							/>
							<div>
								<div className="text-sm text-white">{doc.fileName}</div>
								<div className="text-xs text-gray-400">{doc.size} bytes</div>
							</div>
						</div>
						<button
							onClick={() => handleDeleteDocument(doc._id as string)}
							className="p-1 rounded-full hover:bg-red-900/30 text-red-400"
							title="Delete document"
						>
							<Icon icon="mdi:trash-can-outline" className="h-4 w-4" />
						</button>
					</div>
				))}
			</div>
		</div>
	)
}

export default DocumentsList
