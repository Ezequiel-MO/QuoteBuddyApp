import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'
import { IPlanningOption } from '@interfaces/planner'
import { useAuth } from 'src/context/auth/AuthProvider'
import { useCurrentPlanner } from '@hooks/redux/useCurrentPlanner'
import { errorToastOptions } from '@helper/toast'

interface AddPlanningOptionModalProps {
	isOpen: boolean
	onClose: () => void
	planningItemId: string
}

const AddPlanningOptionModal: React.FC<AddPlanningOptionModalProps> = ({
	isOpen,
	onClose,
	planningItemId
}) => {
	const [formData, setFormData] = useState<Partial<IPlanningOption>>({
		isClientSelected: false
	})
	const { addPlanningOption } = useCurrentPlanner()
	const { auth } = useAuth()

	// Reset form when modal opens or planningItemId changes
	useEffect(() => {
		if (isOpen) {
			setFormData({ isClientSelected: false })
		}
	}, [isOpen, planningItemId])

	const handleChange =
		(field: keyof IPlanningOption) =>
		(
			e: React.ChangeEvent<
				HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
			>
		) => {
			const value =
				e.target.type === 'checkbox'
					? (e.target as HTMLInputElement).checked
					: e.target.value
			setFormData((prev) => ({ ...prev, [field]: value }))
		}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		// Basic validation (add more specific checks as needed)
		if (!formData.name || !formData.vendorType || !formData.planningNotes) {
			toast.error('Please fill in all required fields.', errorToastOptions)
			return
		}

		if (!planningItemId) {
			toast.error('Missing Planning Item ID.', errorToastOptions)
			return
		}

		const newOptionPayload: IPlanningOption = {
			_id: uuidv4(), // Generate temporary ID
			planningItemId: planningItemId,
			name: formData.name,
			vendorId: formData.vendorId || '', // Assuming vendorId might be optional or derived later
			vendorType: formData.vendorType,
			planningNotes: formData.planningNotes,
			isClientSelected: formData.isClientSelected || false,
			createdBy: auth?.name || 'Unknown User',
			// Initialize optional fields if needed
			documents: [],
			comments: []
		}

		addPlanningOption(planningItemId, newOptionPayload)
		toast.success('Planning option added successfully!') // Optional success toast
		onClose() // Close the modal
	}

	if (!isOpen) return null

	return (
		<div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
			<div className="bg-gray-800 rounded-xl shadow-lg w-full max-w-lg border border-gray-700 overflow-hidden">
				<div className="flex justify-between items-center p-5 border-b border-gray-700">
					<h3 className="text-lg font-semibold text-white-0">
						Add New Planning Option
					</h3>
					<button
						onClick={onClose}
						className="p-1 rounded-full hover:bg-gray-700 text-gray-400 hover:text-white-0"
					>
						<Icon icon="mdi:close" className="h-6 w-6" />
					</button>
				</div>

				<form onSubmit={handleSubmit} className="p-5 space-y-4">
					{/* Name Input */}
					<div>
						<label
							htmlFor="option-name"
							className="block text-gray-300 text-sm font-medium mb-1"
						>
							Option Name *
						</label>
						<input
							type="text"
							id="option-name"
							name="name"
							value={formData.name || ''}
							onChange={handleChange('name')}
							className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#ea5933] bg-gray-700 text-white-0"
							required
						/>
					</div>

					{/* Vendor Type Input */}
					<div>
						<label
							htmlFor="option-vendorType"
							className="block text-gray-300 text-sm font-medium mb-1"
						>
							Vendor Type *
						</label>
						<input
							type="text"
							id="option-vendorType"
							name="vendorType"
							value={formData.vendorType || ''}
							onChange={handleChange('vendorType')}
							className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#ea5933] bg-gray-700 text-white-0"
							required
						/>
					</div>

					{/* Planning Notes Textarea */}
					<div>
						<label
							htmlFor="option-planningNotes"
							className="block text-gray-300 text-sm font-medium mb-1"
						>
							Planning Notes *
						</label>
						<textarea
							id="option-planningNotes"
							name="planningNotes"
							value={formData.planningNotes || ''}
							onChange={handleChange('planningNotes')}
							rows={4}
							className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#ea5933] bg-gray-700 text-white-0"
							required
						/>
					</div>

					{/* Optional: Vendor ID Input (if needed) */}
					{/* <div> ... Vendor ID input similar to above ... </div> */}

					{/* Optional: Is Client Selected Checkbox */}
					{/* <div className="flex items-center"> ... Checkbox for isClientSelected ... </div> */}

					{/* Action Buttons */}
					<div className="flex justify-end gap-3 pt-3">
						<button
							type="button"
							onClick={onClose}
							className="px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="px-4 py-2 bg-[#ea5933] text-white-0 rounded-lg hover:bg-opacity-90 transition-colors"
						>
							Add Option
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default AddPlanningOptionModal
