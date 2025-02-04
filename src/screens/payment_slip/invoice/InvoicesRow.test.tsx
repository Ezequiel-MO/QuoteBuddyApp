import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { InvoicesRow } from './InvoicesRow'
import { IInvoice } from 'src/interfaces'

// Mock del componente `InvoiceActions` para evitar dependencias innecesarias en el test
vi.mock('./InvoiceActions', () => ({
	InvoiceActions: vi.fn(() => (
		<div data-testid="invoice-actions">Mocked InvoiceActions</div>
	))
}))

// Mock del componente `TableInvoiceCollectionsFromClient`
vi.mock('./TableInvoiceCollectionsFromClient', () => ({
	TableInvoiceCollectionsFromClient: vi.fn(() => (
		<tr data-testid="table-invoice-collections">
			<td>Mocked Table</td>
		</tr>
	))
}))

// Datos de prueba
const mockInvoice: IInvoice = {
	_id: '12345',
	status: 'posted',
	date: '2023-10-01',
	projectCode: 'PROJ-2023',
	client: 'Cliente Ejemplo S.A.',
	company: 'Mi Empresa S.L.',
	address: 'Calle Falsa 123',
	postCode: '28001',
	reference: 'esto es un ejemplo',
	VATNr: 'ES12345678Z',
	invoiceNumber: '2501',
	lineDate: '2023-10-01',
	lineText: 'Servicios de desarrollo web',
	taxBreakdown: true,
	taxBase: 1000.0,
	taxRate: 21,
	taxAmount: 210.0,
	taxBase21: 1000.0,
	taxBase10: 0.0,
	expenses: 50.0,
	lineAmount: 1260.0,
	linesBreakdown: true,
	breakdownLines: [
		{
			id: '1',
			date: '2023-09-15',
			text: 'Diseño de interfaz',
			amount: 500.0
		},
		{
			id: '2',
			date: '2023-09-20',
			text: 'Desarrollo backend',
			amount: 500.0
		}
	],
	collectionsFromClient: [],
	currency: 'EUR',
	type: 'official'
}

const mockProformaInvoice: IInvoice = {
	...mockInvoice,
	invoiceNumber: 'proforma',
	type: 'proforma',
	reference: 'esto es un ejemplo proforma',
	date: '2025-10-01'
}

// Grupo de pruebas para el componente "InvoicesRow"
describe('InvoicesRow', () => {
	it('should render Invoice data correctly', () => {
		render(
			<table>
				<tbody>
					<InvoicesRow invoice={mockInvoice} />
				</tbody>
			</table>
		)
		expect(screen.getByText('invoice')).toBeInTheDocument()
		expect(screen.getByText('2501')).toBeInTheDocument()
		expect(screen.getByText('2023-10-01')).toBeInTheDocument()
		expect(screen.getByText('issued')).toBeInTheDocument()
		expect(screen.getByText('esto es un ejemplo')).toBeInTheDocument()
		expect(screen.getByText('€1,260.00')).toBeInTheDocument()
		// Validamos que se renderize `InvoiceActions`
		expect(screen.getByTestId('invoice-actions')).toBeInTheDocument()
		// Validamos que se renderize `TableInvoiceCollectionsFromClient`
		expect(screen.getByTestId('table-invoice-collections')).toBeInTheDocument()
	})

	it('should render Proforma Invoice data correctly', () => {
		render(
			<table>
				<tbody>
					<InvoicesRow invoice={mockProformaInvoice} />
				</tbody>
			</table>
		)
		expect(screen.getByText('proforma')).toBeInTheDocument()
		expect(screen.getByText('2025-10-01')).toBeInTheDocument()
		expect(screen.getByText('issued')).toBeInTheDocument()
		expect(screen.getByText('esto es un ejemplo proforma')).toBeInTheDocument()
		expect(screen.getByText('€1,260.00')).toBeInTheDocument()
		expect(screen.getByTestId('invoice-actions')).toBeInTheDocument()
		expect(screen.getByTestId('table-invoice-collections')).toBeInTheDocument()
	})
})
