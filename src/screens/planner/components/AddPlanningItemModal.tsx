import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { IPlanningItem } from '@interfaces/planner/planningItem'
import { useCurrentPlanner } from '@hooks/redux/useCurrentPlanner'
import { usePlannerContext } from '../context/PlannerContext'
import { useCanAddPlanningItem } from '../context/PlannerPermissionsContext'
import { toast } from 'react-toastify'
import { errorToastOptions } from '@helper/toast'
import { useCurrentProject } from '@hooks/redux/useCurrentProject'
import { useAuth } from 'src/context/auth/AuthProvider'
import { createPlanningItem } from '@services/plannerService'
import { useLoading } from '../context/LoadingContext'
import { useAccManagerLookup } from '@hooks/useAccManagerLookup'

// Extended interface to include projectMissing flag
interface ExtendedPlanningFormData extends Partial<IPlanningItem> {
	projectMissing?: boolean
}

const AddPlanningItemModal = () => {
	const [formData, setFormData] = useState<ExtendedPlanningFormData>({
		dayIndex: 1,
		status: 'Proposed'
	})
	const { addPlanningItem } = useCurrentPlanner()
	const { state, dispatch } = usePlannerContext()
	const canAddPlanningItem = useCanAddPlanningItem()
	const { currentProject } = useCurrentProject()
	const { auth } = useAuth()
	const { isLoading, startLoading, stopLoading } = useLoading()
	const { accManagers, loading: loadingManagers } = useAccManagerLookup()

	// Get the current project id when the modal opens
	useEffect(() => {
		// Only update if modal is open and we have a valid project
		if (state.modalOpen && currentProject?._id) {
			const projectId = currentProject._id
			setFormData((prev) => ({
				...prev,
				projectId
			}))
		} else if (state.modalOpen) {
			// Log if modal is open but project ID is missing
			console.warn(
				'Modal opened, but currentProject._id is missing:',
				currentProject
			)

			// Don't close the modal, but set formData.projectMissing flag
			setFormData((prev) => ({
				...prev,
				projectMissing: true
			}))
		}
	}, [state.modalOpen, currentProject])

	// Check if the project is missing for conditional rendering
	const isProjectMissing = !currentProject?._id || formData.projectMissing
	const isCreating = isLoading('createItem')

	const handleCreatePlanningItem = async (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault()

		// Check permission before submitting
		if (!canAddPlanningItem) {
			toast.error(
				'Permission denied: Cannot add planning item',
				errorToastOptions
			)
			return
		}

		// Check if the project ID is available
		if (!currentProject?._id) {
			toast.error(
				'Cannot add planning item: Project information is missing.',
				errorToastOptions
			)
			return
		}

		// Find the AccManager ID corresponding to the logged-in user's email
		const currentAccManager = accManagers.find(
			(manager) => manager.email === auth.email
		)

		if (!currentAccManager?._id) {
			toast.error(
				'Cannot create planning item: Account Manager details not found for the current user.',
				errorToastOptions
			)
			return
		}

		const accManagerId = currentAccManager._id

		// Ensure projectId is set in formData even if the useEffect hasn't run yet
		const dataWithProjectId = {
			...formData,
			projectId: currentProject._id
		}

		// Check if description and date are in the formData
		console.log('Form data before submission:', {
			...dataWithProjectId,
			description: dataWithProjectId.description,
			date: dataWithProjectId.date
		})

		if (
			dataWithProjectId.title &&
			dataWithProjectId.itemType &&
			dataWithProjectId.projectId &&
			dataWithProjectId.dayIndex !== undefined &&
			dataWithProjectId.status
		) {
			// Using server-first approach: save to database, then update Redux
			try {
				// Set loading state
				startLoading('createItem')

				// Prepare the payload for API
				const itemPayload = {
					...dataWithProjectId,
					title: dataWithProjectId.title!,
					itemType: dataWithProjectId.itemType! as
						| 'Meal'
						| 'Activity'
						| 'Transfer'
						| 'Hotel',
					dayIndex: dataWithProjectId.dayIndex!,
					projectId: dataWithProjectId.projectId!,
					status: dataWithProjectId.status! as
						| 'Proposed'
						| 'Discussing'
						| 'Confirmed'
						| 'Booked',
					description: dataWithProjectId.description || '',
					date: new Date().toISOString(),
					createdBy: accManagerId
				} as IPlanningItem

				console.log(
					'Creating planning item with data (and AccManager ID):',
					JSON.stringify({ ...itemPayload, createdBy: accManagerId }, null, 2)
				)

				// Save to database first
				const savedItem = await createPlanningItem(itemPayload, accManagerId)

				console.log(
					'Planning item created successfully, received:',
					JSON.stringify(savedItem, null, 2)
				)

				// Once item is saved successfully, update Redux with the real MongoDB ID
				addPlanningItem(savedItem)

				toast.success('Planning item created successfully!')

				// Reset form data
				setFormData({
					dayIndex: 1,
					status: 'Proposed'
				})

				// Close the modal
				dispatch({ type: 'TOGGLE_MODAL', payload: false })
			} catch (error) {
				console.error('Error creating planning item:', error)
				toast.error(
					'Failed to create planning item. Please try again.',
					errorToastOptions
				)
			} finally {
				// Clear loading state
				stopLoading('createItem')
			}
		} else {
			console.log(
				'Missing required fields for planning item',
				dataWithProjectId
			)
			toast.error(
				'Missing required fields for planning item',
				errorToastOptions
			)
		}
	}

	const handleChange =
		(field: keyof IPlanningItem) =>
		(
			e: React.ChangeEvent<
				HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
			>
		) => {
			if (field === 'dayIndex') {
				// If the field is empty, use default value 1, otherwise parse as integer
				const numValue =
					e.target.value === '' ? 1 : parseInt(e.target.value, 10)
				// If parsing results in NaN (invalid number), use default value 1
				const safeValue = isNaN(numValue) ? 1 : numValue
				setFormData((prev) => ({ ...prev, [field]: safeValue }))
			} else {
				setFormData((prev) => ({ ...prev, [field]: e.target.value }))
			}
		}

	// Don't render anything if the user doesn't have permission to add planning items
	// or if the modal is closed
	if (!state.modalOpen || !canAddPlanningItem) return null

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
			<div className="bg-gray-800 rounded-xl shadow-lg w-full max-w-2xl border border-gray-700 overflow-hidden">
				<div className="flex justify-between items-center p-6 border-b border-gray-700">
					<h3 className="text-xl font-semibold text-white-0">
						Add New Planning Item
					</h3>
					<button
						onClick={() => dispatch({ type: 'TOGGLE_MODAL', payload: false })}
						className="p-1 rounded-full hover:bg-gray-700 text-gray-400 hover:text-white-0"
						disabled={isCreating}
					>
						<Icon icon="mdi:close" className="h-6 w-6" />
					</button>
				</div>

				<div className="p-6">
					{isProjectMissing && (
						<div className="mb-6 p-4 bg-yellow-900/30 border border-yellow-700 rounded-lg">
							<div className="flex items-start">
								<Icon
									icon="mdi:alert-circle"
									className="h-5 w-5 text-yellow-500 mr-2 mt-0.5"
								/>
								<div>
									<h4 className="font-medium text-yellow-400">
										Project Not Selected
									</h4>
									<p className="text-sm text-yellow-300">
										Please select a project before creating planning items.
										Planning items must be associated with a project.
									</p>
								</div>
							</div>
						</div>
					)}

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
								name="title"
								value={formData.title || ''}
								onChange={handleChange('title')}
								className="w-full px-3 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ea5933] bg-gray-700 text-white-0"
								placeholder="Enter planning item title"
								required
								disabled={isCreating}
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
								name="itemType"
								value={formData.itemType || ''}
								onChange={handleChange('itemType')}
								className="w-full px-3 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ea5933] bg-gray-700 text-white-0"
								required
								disabled={isCreating}
							>
								<option value="" disabled>
									Select an item type
								</option>
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
								name="dayIndex"
								value={formData.dayIndex ?? 1}
								onChange={handleChange('dayIndex')}
								min="1"
								className="w-full px-3 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ea5933] bg-gray-700 text-white-0"
								placeholder="Enter day number"
								required
								disabled={isCreating}
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
								name="status"
								value={formData.status || 'Proposed'}
								onChange={handleChange('status')}
								className="w-full px-3 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ea5933] bg-gray-700 text-white-0"
								disabled={isCreating}
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
								name="description"
								value={formData.description || ''}
								onChange={handleChange('description')}
								rows={3}
								className="w-full px-3 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ea5933] bg-gray-700 text-white-0"
								placeholder="Enter planning item description (optional)"
								disabled={isCreating}
							/>
						</div>

						<div className="flex justify-end gap-3 mt-6">
							<button
								type="button"
								onClick={() =>
									dispatch({ type: 'TOGGLE_MODAL', payload: false })
								}
								className="px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
								disabled={isCreating}
							>
								Cancel
							</button>
							<button
								type="submit"
								disabled={isProjectMissing || isCreating}
								className={`px-4 py-2 rounded-lg text-white-0 transition-colors flex items-center ${
									isProjectMissing || isCreating
										? 'bg-gray-600 cursor-not-allowed'
										: 'bg-[#ea5933] hover:bg-opacity-90'
								}`}
							>
								{isCreating && (
									<Icon
										icon="mdi:loading"
										className="animate-spin mr-2 h-5 w-5"
									/>
								)}
								{isCreating ? 'Creating...' : 'Create Planning Item'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default AddPlanningItemModal
