// TablePayment.test.tsx
import {
	describe,
	it,
	expect,
	vi,
	beforeEach,
	afterEach,
	type Mock
} from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TablePayment } from './TablePayment'
import { ICollectionFromClient } from '@interfaces/collectionFromClient'
import { usePaymentSlip } from './context/PaymentSlipContext'
import { useFetchInvoices } from 'src/hooks/fetchData'
import { createBlankInvoice } from '../invoices/context/createBlankInvoice'
import { useNavigate } from 'react-router-dom'
import { useInvoice } from '../invoices/context/InvoiceContext'
import { IProject } from '@interfaces/project'
import { defaultProject } from 'src/redux/features/currentProject/defaultProjectState'
import {
	starterCollectionFromClient,
	starterCompany,
	starterInvoice
} from 'src/constants/starterObjects'
import { IClientCompany } from '@interfaces/clientCompany'
import { IInvoice } from '@interfaces/invoice'
import accounting from 'accounting'

// -- Mocks for sub-components, hooks, etc. --
vi.mock('src/ui', () => ({
	TableHeaders: ({ headers }: { headers: string }) => (
		<thead data-testid="mock-TableHeaders">
			<tr>
				<th>{headers}</th>
			</tr>
		</thead>
	)
}))

vi.mock('./InvoicesRow', () => ({
	InvoicesRow: ({ invoice }: { invoice: any }) => (
		<tr data-testid="mock-InvoicesRow">
			<td>{invoice.date}</td>
		</tr>
	)
}))

vi.mock('./CollectionsFromClientRow', () => ({
	CollectionsFromClientRow: ({
		collectionFromClient
	}: {
		collectionFromClient: ICollectionFromClient
	}) => (
		<tr data-testid="mock-CollectionsFromClientRow">
			<td>{collectionFromClient.type}</td>
		</tr>
	)
}))

vi.mock('./ModalCollectionFromClientForm', () => ({
	ModalCollectionFromClientForm: ({
		open
	}: {
		open: boolean
		setOpen: (open: boolean) => void
	}) => (
		<div data-testid="mock-ModalCollectionFromClientForm">
			{open ? 'Modal is open' : 'Modal is closed'}
		</div>
	)
}))

vi.mock('@screens/payment_slip/context/PaymentSlipContext', () => ({
	usePaymentSlip: vi.fn()
}))
vi.mock('src/hooks/fetchData', () => ({
	useFetchInvoices: vi.fn()
}))
vi.mock('../invoices/context/InvoiceContext', () => ({
	useInvoice: vi.fn()
}))

vi.mock('../invoices/context/createBlankInvoice', () => ({
	createBlankInvoice: vi.fn()
}))

vi.mock('react-router-dom', () => ({
	useNavigate: vi.fn()
}))

describe('TablePayment', () => {
	const mockUsePaymentSlip = usePaymentSlip as Mock
	const mockUseFetchInvoices = useFetchInvoices as Mock
	const mockUseInvoice = useInvoice as Mock
	const mockCreateBlankInvoice = createBlankInvoice as Mock
	const mockUseNavigate = useNavigate as Mock

	const navigateFn = vi.fn()

	const mockCompany: IClientCompany = { ...starterCompany }
	const mockInvoice: IInvoice = {
		...starterInvoice,
		_id: 'inv-starter-unique'
	}
	const mockProject: IProject = {
		...defaultProject,
		code: 'P-001',
		clientCompany: [mockCompany],
		collectionsFromClient: [],
		invoices: [mockInvoice]
	}

	beforeEach(() => {
		vi.clearAllMocks()
		mockUseNavigate.mockReturnValue(navigateFn)

		mockUseInvoice.mockReturnValue({
			dispatch: vi.fn()
		})
		mockUseFetchInvoices.mockReturnValue({
			invoices: [],
			setInvoices: vi.fn(),
			isLoading: false
		})
		mockCreateBlankInvoice.mockReturnValue({
			status: 'posting'
		})

		mockUsePaymentSlip.mockReturnValue({
			stateProject: null,
			isLoading: false,
			setForceRefresh: vi.fn(),
			dispatch: vi.fn(),
			isUpdate: false,
			setIsUpdate: vi.fn(),
			collectionFromClient: null,
			setCollectionFromClient: vi.fn()
		})
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	const renderComponent = () => {
		return render(<TablePayment />)
	}

	it('returns null if project is null or !project.collectionsFromClient', () => {
		renderComponent()
		expect(screen.queryByTestId('mock-TableHeaders')).not.toBeInTheDocument()
		expect(screen.queryByText(/add invoice/i)).not.toBeInTheDocument()
	})

	it('renders invoice rows if project.invoices exist', () => {
		// Provide unique _id for each invoice
		const mockInvoice1: IInvoice = {
			...starterInvoice,
			_id: 'inv-1',
			date: '2025-01-01'
		}
		const mockInvoice2: IInvoice = {
			...starterInvoice,
			_id: 'inv-2',
			date: '2025-01-02'
		}

		mockUsePaymentSlip.mockReturnValue({
			stateProject: {
				...mockProject,
				invoices: [mockInvoice1, mockInvoice2]
			},
			isLoading: false,
			setForceRefresh: vi.fn(),
			dispatch: vi.fn(),
			isUpdate: false,
			setIsUpdate: vi.fn(),
			collectionFromClient: null,
			setCollectionFromClient: vi.fn()
		})

		renderComponent()
		expect(screen.getByTestId('mock-TableHeaders')).toBeInTheDocument()
		const invoiceRows = screen.getAllByTestId('mock-InvoicesRow')
		expect(invoiceRows.length).toBe(2)
		expect(invoiceRows[0]).toHaveTextContent('2025-01-01')
		expect(invoiceRows[1]).toHaveTextContent('2025-01-02')
	})

	it('renders collection rows if project.collectionsFromClient exist', () => {
		// Unique _id for each collection
		const mockCollection1: ICollectionFromClient = {
			...starterCollectionFromClient,
			_id: 'col-1',
			type: 'COLLECTION'
		}
		const mockCollection2: ICollectionFromClient = {
			...starterCollectionFromClient,
			_id: 'col-2',
			type: 'PROFORMA'
		}

		mockUsePaymentSlip.mockReturnValue({
			stateProject: {
				...mockProject,
				collectionsFromClient: [mockCollection1, mockCollection2],
				invoices: [],
				clientCompany: [{ ...mockCompany, name: 'Company B' }]
			},
			isLoading: false,
			setForceRefresh: vi.fn(),
			dispatch: vi.fn(),
			isUpdate: false,
			setIsUpdate: vi.fn(),
			collectionFromClient: null,
			setCollectionFromClient: vi.fn()
		})

		renderComponent()

		const collectionRows = screen.getAllByTestId(
			'mock-CollectionsFromClientRow'
		)
		expect(collectionRows.length).toBe(2)
		expect(collectionRows[0]).toHaveTextContent('COLLECTION')
		expect(collectionRows[1]).toHaveTextContent('PROFORMA')
	})

	it('calculates totalAvailable correctly and displays it', () => {
		// Provide unique IDs
		const mockCollection1: ICollectionFromClient = {
			...starterCollectionFromClient,
			_id: 'col-3',
			type: 'COLLECTION',
			status: 'RECEIVED',
			amount: 200
		}
		const mockCollection2: ICollectionFromClient = {
			...starterCollectionFromClient,
			_id: 'col-4',
			type: 'COLLECTION',
			status: 'RECEIVED',
			amount: 300
		}
		const mockCollection3: ICollectionFromClient = {
			...starterCollectionFromClient,
			_id: 'col-5',
			type: 'COLLECTION',
			status: 'ISSUED',
			amount: 9999
		}

		mockUsePaymentSlip.mockReturnValue({
			stateProject: {
				...mockProject,
				invoices: [],
				collectionsFromClient: [
					mockCollection1,
					mockCollection2,
					mockCollection3
				]
			},
			isLoading: false,
			setForceRefresh: vi.fn(),
			dispatch: vi.fn(),
			isUpdate: false,
			setIsUpdate: vi.fn(),
			collectionFromClient: null,
			setCollectionFromClient: vi.fn()
		})

		renderComponent()

		const totalAvailableCell = screen
			.getByText(/total available/i)
			.closest('tr')

		// total = 200 + 300 = 500
		expect(totalAvailableCell).toHaveTextContent(
			accounting.formatMoney(500, '€')
		)
	})

	it('clicking "add invoice" calls createBlankInvoice, dispatches actions, and navigates to invoice_specs', async () => {
		const user = userEvent.setup()
		const mockDispatch = vi.fn()

		// Unique IDs
		const mockInvoice1 = {
			...starterInvoice,
			invoiceNumber: 'INV-001',
			_id: 'inv-001'
		}
		const mockInvoice2 = {
			...starterInvoice,
			invoiceNumber: 'INV-002',
			_id: 'inv-002'
		}

		mockUsePaymentSlip.mockReturnValue({
			stateProject: {
				...mockProject,
				code: 'P-004',
				clientCompany: [mockCompany],
				invoices: [mockInvoice1, mockInvoice2],
				collectionsFromClient: []
			},
			isLoading: false,
			setForceRefresh: vi.fn(),
			dispatch: vi.fn(),
			isUpdate: false,
			setIsUpdate: vi.fn(),
			collectionFromClient: null,
			setCollectionFromClient: vi.fn()
		})

		mockUseInvoice.mockReturnValue({
			dispatch: mockDispatch
		})

		mockUseFetchInvoices.mockReturnValue({
			invoices: [mockInvoice1, mockInvoice2],
			setInvoices: vi.fn(),
			isLoading: false
		})

		renderComponent()

		const addInvoiceBtn = screen.getByRole('button', { name: /add invoice/i })
		await user.click(addInvoiceBtn)

		expect(mockCreateBlankInvoice).toHaveBeenCalled()

		// Check the dispatch calls for new invoice
		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'SET_INVOICE',
			payload: expect.objectContaining({ status: 'posting' })
		})
		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'UPDATE_INVOICE_FIELD',
			payload: { name: 'status', value: 'posting' }
		})
		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'UPDATE_INVOICE_FIELD',
			payload: { name: 'projectCode', value: 'P-004' }
		})
		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'UPDATE_INVOICE_FIELD',
			payload: { name: 'company', value: 'Acme Inc.' }
		})
		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'INCREMENT_INVOICE_NUMBER',
			payload: [
				expect.objectContaining({ invoiceNumber: 'INV-002' }),
				expect.objectContaining({ invoiceNumber: 'INV-001' })
			]
		})

		await waitFor(() => {
			expect(navigateFn).toHaveBeenCalledWith('invoice_specs')
		})
	})

	it('clicking "add collection or proforma" sets openModal = true, isUpdate=false, and resets collectionFromClient', async () => {
		const user = userEvent.setup()
		const setCollectionFromClientMock = vi.fn()
		const setIsUpdateMock = vi.fn()

		mockUsePaymentSlip.mockReturnValue({
			stateProject: { ...mockProject },
			isLoading: false,
			setForceRefresh: vi.fn(),
			dispatch: vi.fn(),
			isUpdate: true,
			setIsUpdate: setIsUpdateMock,
			collectionFromClient: { ...starterCollectionFromClient },
			setCollectionFromClient: setCollectionFromClientMock
		})

		renderComponent()

		expect(
			screen.getByTestId('mock-ModalCollectionFromClientForm')
		).toHaveTextContent('Modal is closed')

		const addCollectionBtn = screen.getByRole('button', {
			name: /add collection or proforma/i
		})
		await user.click(addCollectionBtn)

		expect(setIsUpdateMock).toHaveBeenCalledWith(false)
		expect(setCollectionFromClientMock).toHaveBeenCalled()
		expect(
			screen.getByTestId('mock-ModalCollectionFromClientForm')
		).toHaveTextContent(/Modal is open/i)
	})
})
