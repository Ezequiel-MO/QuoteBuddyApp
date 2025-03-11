import { useCallback, useMemo, useState } from 'react'
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

	if (!isEditable)
		return <ReadOnlyClientDisplay selectedClient={selectedClient} />

	return (
		<div className="p-4 border rounded-lg shadow-sm bg-white">
			<div className="mb-2 font-semibold text-gray-700">SEND INVOICE TO:</div>

			<div className="space-y-3">
				<select
					name="client"
					disabled={selectDisabled}
					onChange={handleChange}
					className="w-full p-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
					aria-label="Select client"
					value={state.currentInvoice?.client || ''}
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
	selectedClient
}: {
	selectedClient?: string
}) => (
	<div className="flex items-center justify-between">
		<span>INVOICE RECIPIENT:</span>
		<p className="mt-1 text-gray-900">
			{selectedClient || 'No client selected'}
		</p>
	</div>
)
