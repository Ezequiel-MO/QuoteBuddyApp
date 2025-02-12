// TableVendorInvoice.test.tsx
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
	describe,
	it,
	expect,
	vi,
	beforeEach,
	afterEach,
	type Mock
} from 'vitest'
import { TableVendorInvoice } from './TableVendorInvoice'
import { MemoryRouter, useNavigate, useParams } from 'react-router-dom'
import { usePaymentSlip } from '@screens/payment_slip/context/PaymentSlipContext'
import { usePayment } from '@screens/cash_flow/context/PaymentsProvider'
import { CreateBlankVendorInvoice } from '@screens/cash_flow/context/CreateBlankVendorInvoice'
import { IVendorInvoice } from '@interfaces/vendorInvoice'
import { IPayment } from '@interfaces/payment'
import { starterVendorInvoice } from 'src/constants/starterObjects'
import React from 'react'
import accounting from 'accounting'

// Partial mock for react-router-dom
vi.mock('react-router-dom', async () => {
	const actual = await vi.importActual<typeof import('react-router-dom')>(
		'react-router-dom'
	)
	return {
		...actual,
		useNavigate: vi.fn(),
		useParams: vi.fn()
	}
})

// Mock other dependencies
vi.mock('../../components/atoms', () => ({
	Button: ({
		children,
		icon,
		handleClick,
		...props
	}: {
		children: React.ReactNode
		icon?: string
		handleClick: () => void
	}) => (
		<button onClick={handleClick} data-testid="mock-Button">
			{children}
		</button>
	)
}))

vi.mock('@iconify/react', () => ({
	Icon: ({ icon, width, className }: any) => (
		<span data-testid="mock-Icon">{icon}</span>
	)
}))

vi.mock('./TableVendorInvoicePayments', () => ({
	TableVendorInvoicePayments: ({ payments }: { payments: IPayment[] }) => (
		<tr data-testid="mock-TableVendorInvoicePayments">
			<td colSpan={8}>{payments.length} Payments</td>
		</tr>
	)
}))

vi.mock('../cash_flow/list/VendorInvoiceActions', () => ({
	VendorInvoiceActions: ({
		vendorInvoice
	}: {
		vendorInvoice: any
		forceRefresh: () => void
		foundVendorInvoices: any[]
	}) => <div data-testid="mock-VendorInvoiceActions">{vendorInvoice._id}</div>
}))

vi.mock('@screens/payment_slip/context/PaymentSlipContext', () => ({
	usePaymentSlip: vi.fn()
}))
vi.mock('@screens/cash_flow/context/PaymentsProvider', () => ({
	usePayment: vi.fn()
}))
vi.mock('@screens/cash_flow/context/CreateBlankVendorInvoice', () => ({
	CreateBlankVendorInvoice: vi.fn()
}))

describe('TableVendorInvoice', () => {
	const mockUseNavigate = useNavigate as Mock
	const mockUseParams = useParams as Mock
	const mockUsePaymentSlip = usePaymentSlip as Mock
	const mockUsePayment = usePayment as Mock
	const mockCreateBlankVendorInvoice = CreateBlankVendorInvoice as Mock

	const navigateFn = vi.fn()
	const setForceRefreshPaymentSlipFn = vi.fn()
	const mockDispatch = vi.fn()

	beforeEach(() => {
		vi.clearAllMocks()
		mockUseNavigate.mockReturnValue(navigateFn)
		mockUseParams.mockReturnValue({ projectId: 'project-123' })
		mockUsePaymentSlip.mockReturnValue({
			stateProject: {
				vendorInvoices: []
			},
			setForceRefresh: setForceRefreshPaymentSlipFn
		})
		mockUsePayment.mockReturnValue({
			dispatch: mockDispatch,
			state: {
				vendorInvoices: []
			}
		})
		mockCreateBlankVendorInvoice.mockReturnValue({
			_id: 'new-vendor-invoice',
			invoiceNumber: '',
			amount: 0,
			relatedPayments: []
		})
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	const renderComponent = () => {
		return render(
			<MemoryRouter>
				<TableVendorInvoice />
			</MemoryRouter>
		)
	}

	it('renders no rows if vendorInvoices is empty', () => {
		renderComponent()
		const tableNode = screen.getByRole('table')
		expect(
			within(tableNode).queryByTestId('mock-TableVendorInvoicePayments')
		).not.toBeInTheDocument()
	})

	it('renders a row for each vendorInvoice, including nested payments', () => {
		const mockPayment1: IPayment = {
			_id: 'p-1',
			amount: 100,
			paymentDate: '2025-01-01',
			method: 'Cash',
			status: 'Completed',
			proofOfPaymentPDF: []
			// ...other properties
		}
		const mockPayment2: IPayment = {
			_id: 'p-2',
			amount: 200,
			paymentDate: '2025-01-02',
			method: 'Credit Card',
			status: 'Completed',
			proofOfPaymentPDF: []
			// ...other properties
		}
		const mockVendorInvoice1: IVendorInvoice = {
			...starterVendorInvoice,
			_id: 'v1',
			invoiceNumber: 'INV-100',
			relatedPayments: [mockPayment1, mockPayment2]
			// ...other properties
		}
		const mockVendorInvoice2: IVendorInvoice = {
			...starterVendorInvoice,
			_id: 'v2',
			invoiceNumber: 'INV-200',
			relatedPayments: [mockPayment1, mockPayment2]
			// ...other properties
		}

		mockUsePaymentSlip.mockReturnValue({
			stateProject: {
				...starterVendorInvoice, // Adjust according to your actual state shape
				vendorInvoices: [mockVendorInvoice1, mockVendorInvoice2]
			},
			setForceRefresh: setForceRefreshPaymentSlipFn
		})

		renderComponent()

		const allRows = screen.getAllByRole('row')
		expect(allRows).toHaveLength(7) // 1 header + 2 vendor invoices + 4 nested payments

		const firstInvoiceNumber = screen.getByText('INV-100')
		expect(firstInvoiceNumber).toBeInTheDocument()

		const secondInvoiceNumber = screen.getByText('INV-200')
		expect(secondInvoiceNumber).toBeInTheDocument()

		const paymentsComponents = screen.getAllByTestId(
			'mock-TableVendorInvoicePayments'
		)
		expect(paymentsComponents.length).toBe(2)
		expect(paymentsComponents[0]).toHaveTextContent('2 Payments')
		expect(paymentsComponents[1]).toHaveTextContent('2 Payments')
	})

	it('calculates and displays correct balance using formatMoney', () => {
		const mockPayment5: IPayment = {
			_id: 'p-5',
			amount: 500,
			paymentDate: '2025-01-05',
			method: 'Cash',
			status: 'Completed',
			proofOfPaymentPDF: []
			// ...other properties
		}
		const mockPayment6: IPayment = {
			_id: 'p-6',
			amount: 600,
			paymentDate: '2025-01-06',
			method: 'Credit Card',
			status: 'Pending',
			proofOfPaymentPDF: []
			// ...other properties
		}
		const mockVendorInvoice4: IVendorInvoice = {
			...starterVendorInvoice,
			_id: 'v4',
			invoiceNumber: 'INV-400',
			amount: 1700,
			relatedPayments: [mockPayment5, mockPayment6]
			// ...other properties
		}

		mockUsePaymentSlip.mockReturnValue({
			stateProject: {
				vendorInvoices: [mockVendorInvoice4]
			},
			setForceRefresh: setForceRefreshPaymentSlipFn
		})

		renderComponent()

		expect(
			screen.getByText(accounting.formatMoney(1200, '€'))
		).toBeInTheDocument()
	})

	it('clicking the "Add Vendor Invoice" button dispatches new invoice creation and navigates', async () => {
		const user = userEvent.setup()
		renderComponent()

		const addButton = screen.getByRole('button', {
			name: /add vendor invoice/i
		})
		await user.click(addButton)

		expect(mockCreateBlankVendorInvoice).toHaveBeenCalled()

		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'ADD_VENDORINVOICE',
			payload: {
				_id: 'new-vendor-invoice',
				invoiceNumber: '',
				amount: 0,
				relatedPayments: []
			}
		})

		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'TOGGLE_UPDATE',
			payload: false
		})

		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'UPDATE_VENDORINVOICE_FIELD',
			payload: { name: 'project', value: 'project-123' }
		})
		expect(navigateFn).toHaveBeenCalledWith('vendorInvoice_specs')
	})

	it('clicking edit icon calls handleClickUpdate, updates vendor invoice, toggles update, and navigates', async () => {
		const mockVendorInvoice1: IVendorInvoice = {
			...starterVendorInvoice,
			_id: 'v1',
			invoiceNumber: 'INV-999',
			amount: 400,
			vendorType: 'Freelancer',
			vendor: { name: 'John Doe' } as any,
			relatedPayments: []
			// ...other properties
		}
		const user = userEvent.setup()
		mockUsePaymentSlip.mockReturnValue({
			stateProject: {
				vendorInvoices: [mockVendorInvoice1]
			},
			setForceRefresh: setForceRefreshPaymentSlipFn
		})

		renderComponent()

		const editIcon = screen.getByText(/SUPPLIER INVOICE/i)
		await user.click(editIcon)

		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'SET_VENDORINVOICE',
			payload: {
				...mockVendorInvoice1
			}
		})
		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'TOGGLE_UPDATE',
			payload: true
		})
		expect(navigateFn).toHaveBeenCalledWith('vendorInvoice_specs')
	})
})
