// PaymentSlip.test.tsx
import {
	describe,
	it,
	expect,
	vi,
	beforeEach,
	afterEach,
	type Mock
} from 'vitest'
import { render, screen } from '@testing-library/react'
import { PaymentSlip } from './PaymentSlip'
import { useParams } from 'react-router-dom'
import { usePaymentSlip } from '@screens/payment_slip/context/PaymentSlipContext'
import { useApiFetch } from 'src/hooks/fetchData/'
import { useFetchProjects } from 'src/hooks/fetchData/useFetchProjects'

// 1. Mock sub-components
vi.mock('src/components/atoms/spinner/Spinner', () => ({
	Spinner: () => <div data-testid="mock-Spinner">Loading...</div>
}))

vi.mock('src/ui', () => ({
	TableHeaders: ({ headers }: { headers: string }) => (
		<thead data-testid="mock-TableHeaders">
			<tr>
				<th>{headers}</th>
			</tr>
		</thead>
	)
}))

vi.mock('./TablePayment', () => ({
	TablePayment: () => <div data-testid="mock-TablePayment">TablePayment</div>
}))

vi.mock('./TableVendorInvoice', () => ({
	TableVendorInvoice: () => (
		<div data-testid="mock-TableVendorInvoice">TableVendorInvoice</div>
	)
}))

// 2. Mock hooks
vi.mock('react-router-dom', () => ({
	useParams: vi.fn()
}))

vi.mock('@screens/payment_slip/context/PaymentSlipContext', () => ({
	usePaymentSlip: vi.fn()
}))

vi.mock('src/hooks/fetchData/', () => ({
	useApiFetch: vi.fn()
}))

vi.mock('src/hooks/fetchData/useFetchProjects', () => ({
	useFetchProjects: vi.fn()
}))

describe('PaymentSlip', () => {
	const mockUseParams = useParams as Mock
	const mockUsePaymentSlip = usePaymentSlip as Mock
	const mockUseApiFetch = useApiFetch as Mock
	const mockUseFetchProjects = useFetchProjects as Mock

	beforeEach(() => {
		vi.clearAllMocks()

		// Default mocks
		mockUseParams.mockReturnValue({ projectId: 'proj-123' })

		mockUsePaymentSlip.mockReturnValue({
			stateProject: null,
			isLoading: false,
			dispatch: vi.fn()
		})
		mockUseApiFetch.mockReturnValue({
			data: null,
			isLoading: false
		})
		mockUseFetchProjects.mockReturnValue({
			project: null,
			isLoading: false
		})

		// Spy on scrollTo
		vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	const renderComponent = () => {
		return render(<PaymentSlip />)
	}

	it('shows Spinner if isLoading = true', () => {
		mockUsePaymentSlip.mockReturnValue({
			stateProject: null, // null project
			isLoading: true, // isLoading is true
			dispatch: vi.fn()
		})

		renderComponent()
		expect(screen.getByTestId('mock-Spinner')).toBeInTheDocument()
		expect(screen.queryByTestId('mock-TablePayment')).not.toBeInTheDocument()
	})

	it('shows Spinner if project is "notIsProject" (i.e. project is null or minimal)', () => {
		// By default from the test, "stateProject: null"
		// This yields notIsProject = true
		mockUsePaymentSlip.mockReturnValue({
			stateProject: null, // triggers notIsProject
			isLoading: false,
			dispatch: vi.fn()
		})
		renderComponent()

		expect(screen.getByTestId('mock-Spinner')).toBeInTheDocument()
	})

	it('shows Spinner if isLoadingVendorInvoices = true', () => {
		mockUseApiFetch.mockReturnValue({
			data: [],
			isLoading: true // vendor invoices still loading
		})

		mockUsePaymentSlip.mockReturnValue({
			stateProject: { code: 'P-100' }, // not isProject
			isLoading: false,
			dispatch: vi.fn()
		})

		renderComponent()
		expect(screen.getByTestId('mock-Spinner')).toBeInTheDocument()
	})

	it('renders PaymentSlip layout if not loading anything', () => {
		// "Complete" state => project is loaded, vendor invoices loaded, projectUpdate loaded
		mockUsePaymentSlip.mockReturnValue({
			stateProject: {
				code: 'P-1234',
				clientCompany: [{ name: 'Company X' }]
				// enough fields so that notIsProject = false
			},
			isLoading: false,
			dispatch: vi.fn()
		})

		mockUseApiFetch.mockReturnValue({
			data: [{ vendorInvoiceId: 'v1' }],
			isLoading: false
		})

		mockUseFetchProjects.mockReturnValue({
			project: {
				invoices: [{ _id: 'inv-abc', date: '2025-01-01' }]
			},
			isLoading: false
		})

		renderComponent()

		// Should NOT show spinner
		expect(screen.queryByTestId('mock-Spinner')).not.toBeInTheDocument()

		// Should show some main elements
		expect(screen.getByText(/Payment Slip/i)).toBeInTheDocument()
		expect(screen.getByTestId('mock-TableHeaders')).toBeInTheDocument()

		// Child components
		expect(screen.getByTestId('mock-TablePayment')).toBeInTheDocument()
		expect(screen.getByTestId('mock-TableVendorInvoice')).toBeInTheDocument()
	})

	it('dispatches "UPDATE_PROJECT_FIELD" for vendorInvoices and projectUpdate.invoices if all loaded', () => {
		const mockDispatch = vi.fn()

		mockUsePaymentSlip.mockReturnValue({
			stateProject: {
				code: 'P-555',
				clientCompany: [{ name: 'Mock Company' }]
			},
			isLoading: false,
			dispatch: mockDispatch
		})

		mockUseApiFetch.mockReturnValue({
			data: [{ vendorInvoiceId: 'VID-001' }],
			isLoading: false
		})

		mockUseFetchProjects.mockReturnValue({
			project: {
				invoices: [{ _id: 'inv-xyz' }]
			},
			isLoading: false
		})

		renderComponent()

		// The useEffect triggers once everything is loaded
		// Expect "vendorInvoices" dispatch
		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'UPDATE_PROJECT_FIELD',
			payload: {
				keyProject: 'vendorInvoices',
				value: [{ vendorInvoiceId: 'VID-001' }]
			}
		})
		// Expect "invoices" dispatch
		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'UPDATE_PROJECT_FIELD',
			payload: {
				keyProject: 'invoices',
				value: [{ _id: 'inv-xyz' }]
			}
		})
	})

	it('calls window.scrollTo(0, 0) on mount', () => {
		renderComponent()
		expect(window.scrollTo).toHaveBeenCalledWith(0, 0)
	})
})
