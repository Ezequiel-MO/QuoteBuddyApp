import React from 'react'
import { Icon } from '@iconify/react'
import { IPlanningDocument } from '@interfaces/planner/planningDocument'
import { usePlanningDocumentActions } from '@redux/features/planner/actions/document/documentActions'

interface DocumentsListProps {
	documents?: IPlanningDocument[]
	planningItemId: string
	planningOptionId?: string
}

const DocumentsList: React.FC<DocumentsListProps> = ({
	documents = [],
	planningItemId,
	planningOptionId
}) => {
	const { deletePlanningDocument } = usePlanningDocumentActions()

	if (documents.length === 0) {
		return null
	}

	const handleDeleteDocument = (documentId: string) => {
		deletePlanningDocument(documentId, planningItemId, planningOptionId)
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
				Documents
			</h4>
			<div className="space-y-2">
				{documents.map((doc) => (
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
								<div className="text-xs text-gray-400">{doc.size}</div>
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
