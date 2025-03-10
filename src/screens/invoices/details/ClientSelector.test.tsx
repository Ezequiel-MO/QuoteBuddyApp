import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ClientSelector } from './ClientSelector'
import { useInvoice } from '../context/InvoiceContext'
import { useGetClientsFromCompany } from '../../../hooks'
import { vi } from 'vitest'
import React from 'react'

// Mock the required hooks and components
vi.mock('../context/InvoiceContext')
vi.mock('../../../hooks')
vi.mock('../../../components/atoms', () => ({
	ModalComponent: ({
		children,
		open
	}: {
		children: React.ReactNode
		open: boolean
	}) => (open ? <div data-testid="modal">{children}</div> : null),
	Spinner: () => <div data-testid="spinner">Loading...</div>
}))
vi.mock('../../clients/add/AddClientToCompany', () => ({
	AddClientToCompany: ({
		selectedCompanyName,
		setOpen
	}: {
		selectedCompanyName: string
		setOpen: () => void
	}) => (
		<div data-testid="add-client-form">
			<span>Adding client to {selectedCompanyName}</span>
			<button onClick={setOpen}>Save Client</button>
		</div>
	)
}))

describe('ClientSelector', () => {
	// Setup mock employees data
	const mockEmployees = [
		{ firstName: 'John', familyName: 'Doe', email: 'john@example.com' },
		{ firstName: 'Jane', familyName: 'Smith', email: 'jane@example.com' }
	]

	beforeEach(() => {
		// Reset all mocks before each test
		vi.clearAllMocks()

		// Default mock implementations
		;(useInvoice as any).mockReturnValue({
			state: { currentInvoice: { status: 'posting' } },
			handleChange: vi.fn()
		})
		;(useGetClientsFromCompany as any).mockReturnValue({
			employees: mockEmployees,
			isLoading: false
		})
	})

	it('renders in editable mode with client options', () => {
		render(<ClientSelector selectedCompany="Test Company" />)

		// Check if the component renders correctly
		expect(screen.getByText('SEND INVOICE TO:')).toBeInTheDocument()

		// Check if client options are rendered in the dropdown
		const select = screen.getByRole('combobox')
		expect(select).toBeInTheDocument()

		// Check for client options
		expect(screen.getByText('John Doe')).toBeInTheDocument()
		expect(screen.getByText('Jane Smith')).toBeInTheDocument()
	})

	it("renders in read-only mode when invoice status is not 'posting'", () => {
		;(useInvoice as any).mockReturnValue({
			state: { currentInvoice: { status: 'posted' } },
			handleChange: vi.fn()
		})

		render(<ClientSelector selectedClient="John Doe" />)

		// Check if it renders in read-only mode
		expect(screen.getByText('INVOICE RECIPIENT:')).toBeInTheDocument()
		expect(screen.getByText('John Doe')).toBeInTheDocument()

		// The select element should not be present
		expect(screen.queryByRole('combobox')).not.toBeInTheDocument()
	})

	it("renders read-only with 'No client selected' when no client is provided", () => {
		;(useInvoice as any).mockReturnValue({
			state: { currentInvoice: { status: 'posted' } },
			handleChange: vi.fn()
		})

		render(<ClientSelector />)

		expect(screen.getByText('No client selected')).toBeInTheDocument()
	})

	it('shows loading state when fetching clients', () => {
		;(useGetClientsFromCompany as any).mockReturnValue({
			employees: [],
			isLoading: true
		})

		render(<ClientSelector selectedCompany="Test Company" />)

		// FIX: Use a more specific query instead of getByText which finds multiple elements
		const select = screen.getByRole('combobox')
		expect(select).toBeDisabled()

		// Check the dropdown option text
		const option = screen.getByRole('option')
		expect(option).toHaveTextContent('Loading...')

		// Check for spinner in the button
		expect(screen.getByTestId('spinner')).toBeInTheDocument()
	})

	it('disables client selection when no company is selected', () => {
		render(<ClientSelector />)

		const select = screen.getByRole('combobox')
		expect(select).toBeDisabled()
	})

	it('disables client selection when no employees exist', () => {
		;(useGetClientsFromCompany as any).mockReturnValue({
			employees: [],
			isLoading: false
		})

		render(<ClientSelector selectedCompany="Test Company" />)

		const select = screen.getByRole('combobox')
		expect(select).toBeDisabled()
	})

	it('calls handleChange when selecting a client', () => {
		const mockHandleChange = vi.fn()
		;(useInvoice as any).mockReturnValue({
			state: { currentInvoice: { status: 'posting' } },
			handleChange: mockHandleChange
		})

		render(<ClientSelector selectedCompany="Test Company" />)

		const select = screen.getByRole('combobox')
		fireEvent.change(select, { target: { value: 'John Doe' } })

		expect(mockHandleChange).toHaveBeenCalled()
	})

	it('opens the add client modal when clicking the button', async () => {
		render(<ClientSelector selectedCompany="Test Company" />)

		// Click the add client button
		fireEvent.click(screen.getByRole('button', { name: /Add New Client/i }))

		// The modal should be open
		expect(screen.getByTestId('modal')).toBeInTheDocument()
		expect(screen.getByTestId('add-client-form')).toBeInTheDocument()
	})

	it('refreshes client list after adding a new client', async () => {
		// Render the component (initial hooks are called here)
		render(<ClientSelector selectedCompany="Test Company" />)

		// After initial render, clear the mock call history
		vi.mocked(useGetClientsFromCompany).mockClear()

		// Open the modal and click save
		fireEvent.click(screen.getByRole('button', { name: /Add New Client/i }))
		fireEvent.click(screen.getByRole('button', { name: /Save Client/i }))

		// The modal should close
		expect(screen.queryByTestId('modal')).not.toBeInTheDocument()

		// Verify that useGetClientsFromCompany was called at least once after our action
		expect(useGetClientsFromCompany).toHaveBeenCalled()
	})
})
