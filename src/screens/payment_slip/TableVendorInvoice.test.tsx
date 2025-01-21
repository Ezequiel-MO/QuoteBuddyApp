import { IPayment } from '@interfaces/payment'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
	describe,
	it,
	expect,
	vi,
	beforeEach,
	afterEach,
	type Mock
} from 'vitest'
import { usePaymentSlip } from './context/PaymentSlipContext'
import { usePayment } from '@screens/cash_flow/context/PaymentsProvider'
import { CreateBlankVendorInvoice } from '@screens/cash_flow/context/CreateBlankVendorInvoice'
import { render, screen, within } from '@testing-library/react'
import { TableVendorInvoice } from './TableVendorInvoice'
import {
	starterPayment,
	starterRestaurant,
	starterVendorInvoice
} from 'src/constants/starterObjects'
import { defaultProject } from 'src/redux/features/currentProject/defaultProjectState'
import { IVendorInvoice } from '@interfaces/vendorInvoice'
import userEvent from '@testing-library/user-event'
import accounting from 'accounting'

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

vi.mock('react-router-dom', () => ({
	useNavigate: vi.fn(),
	useParams: vi.fn()
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
		return render(<TableVendorInvoice />)
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
			...starterPayment,
			_id: 'p-1',
			amount: 100,
			paymentDate: '2025-01-01',
			method: 'Cash',
			status: 'Completed',
			proofOfPaymentPDF: []
		}
		const mockPayment2: IPayment = {
			...starterPayment,
			_id: 'p-2',
			amount: 200,
			paymentDate: '2025-01-02',
			method: 'Credit Card',
			status: 'Completed',
			proofOfPaymentPDF: []
		}
		const mockPayment3: IPayment = {
			...starterPayment,
			_id: 'p-3',
			amount: 300,
			paymentDate: '2025-01-03',
			method: 'Bank Transfer',
			status: 'Completed',
			proofOfPaymentPDF: []
		}
		const mockPayment4: IPayment = {
			...starterPayment,
			_id: 'p-4',
			amount: 400,
			paymentDate: '2025-01-04',
			method: 'Cash',
			status: 'Completed',
			proofOfPaymentPDF: []
		}
		const mockVendorInvoice1: IVendorInvoice = {
			...starterVendorInvoice,
			_id: 'v1',
			invoiceNumber: 'INV-100',
			relatedPayments: [mockPayment1, mockPayment2]
		}
		const mockVendorInvoice2: IVendorInvoice = {
			...starterVendorInvoice,
			_id: 'v2',
			invoiceNumber: 'INV-200',
			relatedPayments: [mockPayment3, mockPayment4]
		}

		mockUsePaymentSlip.mockReturnValue({
			stateProject: {
				...defaultProject,
				vendorInvoices: [mockVendorInvoice1, mockVendorInvoice2]
			},
			setForceRefresh: setForceRefreshPaymentSlipFn
		})

		renderComponent()
		const allRows = screen.getAllByRole('row')
		expect(allRows).toHaveLength(7)

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
			...starterPayment,
			_id: 'p-5',
			amount: 500,
			paymentDate: '2025-01-05',
			method: 'Cash',
			status: 'Completed',
			proofOfPaymentPDF: []
		}
		const mockPayment6: IPayment = {
			...starterPayment,
			_id: 'p-6',
			amount: 600,
			paymentDate: '2025-01-06',
			method: 'Credit Card',
			status: 'Pending',
			proofOfPaymentPDF: []
		}
		const mockVendorInvoice4: IVendorInvoice = {
			...starterVendorInvoice,
			_id: 'v4',
			invoiceNumber: 'INV-400',
			amount: 1700,
			relatedPayments: [mockPayment5, mockPayment6]
		}
		mockUsePaymentSlip.mockReturnValue({
			stateProject: {
				...defaultProject,
				vendorInvoices: [mockVendorInvoice4],
				setForceRefresh: setForceRefreshPaymentSlipFn
			}
		})

		renderComponent()

		expect(
			screen.getByText(accounting.formatMoney('1200', '€'))
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
			vendor: { ...starterRestaurant, name: 'John Doe' },
			relatedPayments: []
		}
		const user = userEvent.setup()
		mockUsePaymentSlip.mockReturnValue({
			stateProject: {
				vendorInvoices: [mockVendorInvoice1]
			},
			setForceRefresh: setForceRefreshPaymentSlipFn
		})

		renderComponent()

		const editText = screen.getByText(/SUPPLIER INVOICE/i)
		await user.click(editText)

		// We expect dispatch to update vendor invoice
		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'UPDATE_VENDORINVOICE',
			payload: {
				vendorInvoiceUpdate: {
					...mockVendorInvoice1
				}
			}
		})
		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'TOGGLE_UPDATE',
			payload: true
		})
		expect(navigateFn).toHaveBeenCalledWith('vendorInvoice_specs')
	})
})
