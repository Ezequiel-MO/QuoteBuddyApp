import { useCallback, useEffect, useMemo, useState } from 'react'
import { ModalComponent, Spinner } from '../../../components/atoms'
import { AddClientToCompany } from '../../clients/add/AddClientToCompany'
import { useInvoice } from '../context/InvoiceContext'
import { useGetClientsFromCompany } from '../../../hooks'

interface ClientSelectorProps {
	selectedCompany?: string
	selectedClient?: string
}

export const ClientSelector = ({
	selectedCompany,
	selectedClient
}: ClientSelectorProps) => {
	const { state, handleChange } = useInvoice()
	const [forceRefresh, setForceRefresh] = useState(0)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [customClientName, setCustomClientName] = useState('')
	const [showCustomField, setShowCustomField] = useState(false)

	// Check if client is a MongoDB ID
	const isMongoId =
		state.currentInvoice?.client &&
		/^[0-9a-fA-F]{24}$/.test(state.currentInvoice.client)

	// If not a MongoDB ID and not empty, it's a custom client name
	const hasCustomClient = state.currentInvoice?.client && !isMongoId

	// Initialize custom client name if needed
	useEffect(() => {
		if (hasCustomClient) {
			setCustomClientName(state.currentInvoice?.client || '')
			setShowCustomField(true)
		}
	}, [state.currentInvoice?.client, hasCustomClient])

	const { employees, isLoading } = useGetClientsFromCompany(
		selectedCompany || '',
		forceRefresh
	)

	const isEditable = state.currentInvoice?.status === 'posting'
	const selectDisabled = isLoading || !selectedCompany || employees.length === 0

	const handleAddClient = useCallback(() => {
		setForceRefresh((prev) => prev + 1)
		setIsModalOpen(false)
	}, [])

	const clientOptions = useMemo(
		() =>
			employees.map((employee) => ({
				value: employee._id,
				label: `${employee.firstName} ${employee.familyName}`
			})),
		[employees]
	)

	// Custom client change handler that uses the same event pattern
	const handleCustomClientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setCustomClientName(value)

		// Create a synthetic event object that mimics a select change
		const syntheticEvent = {
			target: {
				name: 'client',
				value: value
			}
		} as React.ChangeEvent<HTMLSelectElement>

		// Use the original handleChange function
		handleChange(syntheticEvent)
	}

	// Modified select change handler
	const handleClientSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value

		if (value === 'custom') {
			// Show the custom field
			setShowCustomField(true)

			// If there's already a custom name, use that
			if (customClientName) {
				const syntheticEvent = {
					target: {
						name: 'client',
						value: customClientName
					}
				} as React.ChangeEvent<HTMLSelectElement>

				handleChange(syntheticEvent)
			}
		} else {
			// For normal client selection, use the original handler
			handleChange(e)
			// Hide custom field
			setShowCustomField(false)
		}
	}

	// Find the selected client in the employees list
	const selectedClientData = useMemo(() => {
		if (!isMongoId || !employees.length) return null
		return employees.find(
			(employee) => employee._id === state.currentInvoice?.client
		)
	}, [state.currentInvoice?.client, employees, isMongoId])

	// Format the client name for display
	const selectedClientName = useMemo(() => {
		if (hasCustomClient)
			return state.currentInvoice?.client || 'No client specified'
		if (!selectedClientData) return 'No client selected'
		return `${selectedClientData.firstName} ${selectedClientData.familyName}`
	}, [selectedClientData, hasCustomClient, state.currentInvoice?.client])

	if (!isEditable)
		return <ReadOnlyClientDisplay selectedClientName={selectedClientName} />

	return (
		<div className="p-4 border rounded-lg shadow-sm bg-white">
			<div className="mb-2 font-semibold text-gray-700">SEND INVOICE TO:</div>

			<div className="space-y-3">
				<select
					name="client"
					disabled={selectDisabled}
					onChange={handleClientSelect}
					className="w-full p-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
					aria-label="Select client"
					value={
						hasCustomClient || showCustomField
							? 'custom'
							: state.currentInvoice?.client || ''
					}
				>
					<option value="">
						{selectDisabled ? 'Loading...' : 'Select a client'}
					</option>
					{clientOptions.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>

				{/* Show custom client input field when custom is selected */}
				{showCustomField && (
					<div className="mt-2">
						<input
							type="text"
							value={customClientName}
							onChange={handleCustomClientChange}
							placeholder="Enter client name"
							className="w-full p-2 border rounded-md"
						/>
					</div>
				)}

				<button
					type="button"
					onClick={() => setIsModalOpen(true)}
					disabled={!selectedCompany}
					className="w-full p-2 bg-gray-200 text-black-50 rounded-md hover:bg-blue-200 disabled:opacity-50"
				>
					{isLoading ? <Spinner /> : 'Add New Client'}
				</button>

				<ModalComponent open={isModalOpen} setOpen={setIsModalOpen}>
					<AddClientToCompany
						selectedCompanyName={selectedCompany || ''}
						setOpen={handleAddClient}
					/>
				</ModalComponent>
			</div>
		</div>
	)
}

const ReadOnlyClientDisplay = ({
	selectedClientName
}: {
	selectedClientName: string
}) => (
	<div className="flex items-center justify-between">
		<span>INVOICE RECIPIENT:</span>
		<p className="mt-1 text-gray-900">{selectedClientName}</p>
	</div>
)
