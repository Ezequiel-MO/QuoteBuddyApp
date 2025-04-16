import React from 'react'
import { Icon } from '@iconify/react'

interface AddPlanningItemModalProps {
	modalOpen: boolean
	toggleModal: () => void
	handleCreatePlanningItem: (e: React.FormEvent<HTMLFormElement>) => void
}

const AddPlanningItemModal: React.FC<AddPlanningItemModalProps> = ({
	modalOpen,
	toggleModal,
	handleCreatePlanningItem
}) => {
	if (!modalOpen) return null

	return (
		<div className="fixed inset-0 bg-black-50 bg-opacity-50 z-50 flex items-center justify-center p-4">
			<div className="bg-gray-800 rounded-xl shadow-lg w-full max-w-2xl border border-gray-700 overflow-hidden">
				<div className="flex justify-between items-center p-6 border-b border-gray-700">
					<h3 className="text-xl font-semibold text-white-0">
						Add New Planning Item
					</h3>
					<button
						onClick={toggleModal}
						className="p-1 rounded-full hover:bg-gray-700 text-gray-400 hover:text-white-0"
					>
						<Icon icon="mdi:close" className="h-6 w-6" />
					</button>
				</div>

				<div className="p-6">
					<form onSubmit={handleCreatePlanningItem}>
						<div className="mb-4">
							<label
								htmlFor="title"
								className="block text-gray-300 text-sm font-medium mb-2"
							>
								Title *
							</label>
							<input
								type="text"
								id="title"
								className="w-full px-3 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ea5933] bg-gray-700 text-white-0"
								placeholder="Enter planning item title"
								required
							/>
						</div>

						<div className="mb-4">
							<label
								htmlFor="itemType"
								className="block text-gray-300 text-sm font-medium mb-2"
							>
								Item Type *
							</label>
							<select
								id="itemType"
								className="w-full px-3 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ea5933] bg-gray-700 text-white-0"
								required
							>
								<option value="">Select an item type</option>
								<option value="Meal">Meal</option>
								<option value="Activity">Activity</option>
								<option value="Transfer">Transfer</option>
								<option value="Hotel">Hotel</option>
							</select>
						</div>

						<div className="mb-4">
							<label
								htmlFor="dayIndex"
								className="block text-gray-300 text-sm font-medium mb-2"
							>
								Day *
							</label>
							<input
								type="number"
								id="dayIndex"
								min="1"
								className="w-full px-3 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ea5933] bg-gray-700 text-white-0"
								placeholder="Enter day number"
								required
							/>
						</div>

						<div className="mb-4">
							<label
								htmlFor="status"
								className="block text-gray-300 text-sm font-medium mb-2"
							>
								Status
							</label>
							<select
								id="status"
								className="w-full px-3 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ea5933] bg-gray-700 text-white-0"
							>
								<option value="Proposed">Proposed</option>
								<option value="Discussing">Discussing</option>
								<option value="Confirmed">Confirmed</option>
								<option value="Booked">Booked</option>
							</select>
						</div>

						<div className="mb-4">
							<label
								htmlFor="description"
								className="block text-gray-300 text-sm font-medium mb-2"
							>
								Description
							</label>
							<textarea
								id="description"
								rows={3}
								className="w-full px-3 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ea5933] bg-gray-700 text-white-0"
								placeholder="Enter planning item description (optional)"
							/>
						</div>

						<div className="flex justify-end gap-3 mt-6">
							<button
								type="button"
								onClick={toggleModal}
								className="px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
							>
								Cancel
							</button>
							<button
								type="submit"
								className="px-4 py-2 bg-[#ea5933] text-white-0 rounded-lg hover:bg-opacity-90 transition-colors"
							>
								Create Planning Item
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default AddPlanningItemModal
