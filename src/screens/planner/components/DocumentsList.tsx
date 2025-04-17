import React from 'react'
import { Icon } from '@iconify/react'
import { IPlanningDocument } from '@interfaces/planner'

interface DocumentsListProps {
	documents: IPlanningDocument[]
	itemId: string | number
}

const DocumentsList: React.FC<DocumentsListProps> = ({
	documents = [],
	itemId
}) => {
	// Ensure documents is always an array
	const documentsList = Array.isArray(documents) ? documents : []

	return (
		<div className="mb-6 bg-gray-750 rounded-lg p-4 border border-dashed border-gray-600">
			<div className="flex flex-col">
				<div className="flex justify-between items-center mb-2">
					<h3 className="text-sm font-medium text-gray-300">Documents</h3>
					<div className="flex gap-2">
						<label
							htmlFor={`file-upload-${itemId}`}
							className="cursor-pointer text-sm flex items-center px-3 py-1.5 bg-gray-700 text-gray-300 rounded border border-gray-600 hover:bg-gray-650 transition-colors"
						>
							<Icon icon="mdi:upload" className="mr-1 h-4 w-4" />
							Upload
							<input
								id={`file-upload-${itemId}`}
								type="file"
								className="hidden"
							/>
						</label>
					</div>
				</div>

				{documentsList.length > 0 ? (
					<ul className="mt-2 divide-y divide-gray-700">
						{documentsList.map((doc) => {
							// Safely check if fileName exists and has endsWith method
							const isPdf =
								doc?.fileName &&
								typeof doc.fileName === 'string' &&
								doc.fileName.endsWith('.pdf')
							const fileName = doc?.fileName || 'Unknown file'
							const fileSize = doc?.size || ''

							return (
								<li
									key={doc._id || `doc-${Math.random()}`}
									className="flex justify-between items-center py-2 px-1"
								>
									<div className="flex items-center">
										<Icon
											icon={isPdf ? 'mdi:file-pdf-box' : 'mdi:file-image'}
											className="h-5 w-5 text-cyan-400 mr-2"
										/>
										<span className="text-sm text-gray-300">{fileName}</span>
										<span className="ml-2 text-xs text-gray-400">
											{fileSize}
										</span>
									</div>
									<div className="flex gap-1">
										<button className="p-1 rounded-full hover:bg-gray-700 text-cyan-400">
											<Icon icon="mdi:download" className="h-4 w-4" />
										</button>
										<button className="p-1 rounded-full hover:bg-red-900/30 text-red-400">
											<Icon icon="mdi:trash-can-outline" className="h-4 w-4" />
										</button>
									</div>
								</li>
							)
						})}
					</ul>
				) : (
					<div className="mt-2 flex flex-col items-center justify-center py-6 border-2 border-dashed border-gray-600 rounded-lg">
						<Icon
							icon="mdi:file-document-outline"
							className="h-12 w-12 text-gray-400"
						/>
						<p className="mt-1 text-sm text-gray-400">
							Drag and drop files here, or click upload
						</p>
					</div>
				)}
			</div>
		</div>
	)
}

export default DocumentsList
