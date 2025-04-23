import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { toast } from 'react-toastify'
import { IPlanningOption } from '@interfaces/planner'
import { useAuth } from 'src/context/auth/AuthProvider'
import { useCurrentPlanner } from '@hooks/redux/useCurrentPlanner'
import { errorToastOptions } from '@helper/toast'
import { useAccManagerLookup } from '@hooks/useAccManagerLookup'
import { createPlanningOption } from '@services/plannerService'
import { useLoading } from '../context/LoadingContext'

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
	const { accManagers } = useAccManagerLookup()
	const { isLoading, startLoading, stopLoading } = useLoading()

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

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		startLoading('createOption')

		// Basic validation
		if (!formData.name || !formData.vendorType || !formData.planningNotes) {
			toast.error('Please fill in all required fields.', errorToastOptions)
			stopLoading('createOption')
			return
		}

		if (!planningItemId) {
			toast.error('Missing Planning Item ID.', errorToastOptions)
			stopLoading('createOption')
			return
		}

		try {
			// Find the current account manager based on email
			const currentAccManager = accManagers.find(
				(manager) => manager.email === auth.email
			)

			if (!currentAccManager?._id) {
				toast.error(
					'Account Manager details not found for the current user.',
					errorToastOptions
				)
				stopLoading('createOption')
				return
			}

			// Prepare the option payload
			const optionPayload: Partial<IPlanningOption> = {
				planningItemId,
				name: formData.name,
				// Don't include vendorId if it's empty to avoid type casting issues
				...(formData.vendorId ? { vendorId: formData.vendorId } : {}),
				vendorType: formData.vendorType,
				planningNotes: formData.planningNotes,
				isClientSelected: formData.isClientSelected || false
				// Note: createdBy is added in the service function
			}

			console.log('Creating planning option with data:', optionPayload)

			// Server-first approach: save to backend first
			const savedOption = await createPlanningOption(
				optionPayload,
				currentAccManager._id
			)

			// Then update Redux with the real MongoDB _id
			addPlanningOption(planningItemId, savedOption)

			toast.success('Planning option added successfully!')
			onClose() // Close the modal
		} catch (error) {
			console.error('Error creating planning option:', error)
			toast.error(
				'Failed to create planning option. Please try again.',
				errorToastOptions
			)
		} finally {
			stopLoading('createOption')
		}
	}

	const isSubmitting = isLoading('createOption')

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
						disabled={isSubmitting}
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
							disabled={isSubmitting}
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
						<select
							id="option-vendorType"
							name="vendorType"
							value={formData.vendorType || ''}
							onChange={handleChange('vendorType')}
							className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#ea5933] bg-gray-700 text-white-0"
							disabled={isSubmitting}
							required
						>
							<option value="" disabled>
								Select a vendor type
							</option>
							<option value="Hotels">Hotel</option>
							<option value="Restaurants">Restaurant</option>
							<option value="Events">Event</option>
							<option value="Transfers">Transfer</option>
							<option value="Entertainments">Entertainment</option>
						</select>
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
							disabled={isSubmitting}
							required
						/>
					</div>

					{/* Optional: Is Client Selected Checkbox */}
					<div className="flex items-center">
						<input
							type="checkbox"
							id="option-isClientSelected"
							name="isClientSelected"
							checked={formData.isClientSelected || false}
							onChange={handleChange('isClientSelected')}
							className="h-4 w-4 text-[#ea5933] focus:ring-[#ea5933] border-gray-600 rounded bg-gray-700"
							disabled={isSubmitting}
						/>
						<label
							htmlFor="option-isClientSelected"
							className="ml-2 block text-gray-300 text-sm"
						>
							Selected by client
						</label>
					</div>

					{/* Action Buttons */}
					<div className="flex justify-end gap-3 pt-3">
						<button
							type="button"
							onClick={onClose}
							className="px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
							disabled={isSubmitting}
						>
							Cancel
						</button>
						<button
							type="submit"
							className={`px-4 py-2 rounded-lg text-white-0 transition-colors flex items-center ${
								isSubmitting
									? 'bg-gray-600 cursor-not-allowed'
									: 'bg-[#ea5933] hover:bg-opacity-90'
							}`}
							disabled={isSubmitting}
						>
							{isSubmitting && (
								<Icon
									icon="mdi:loading"
									className="animate-spin mr-2 h-5 w-5"
								/>
							)}
							{isSubmitting ? 'Adding...' : 'Add Option'}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default AddPlanningOptionModal
