import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { InvoicesRow } from "./InvoicesRow"; // Importa el componente que se va ser el test
import { IInvoice } from "src/interfaces"; 

// Mock de la libreria '@iconify/react' 
vi.mock('@iconify/react', () => ({
    Icon: vi.fn(() => <div>Icon</div>), // Mock simple del ícono
}))

// Datos de ejemplo (mock) Invoice
const mockInvoice: IInvoice = {
    _id: "12345",
    status: "posted",
    date: "2023-10-01",
    projectCode: "PROJ-2023",
    client: "Cliente Ejemplo S.A.",
    company: "Mi Empresa S.L.",
    address: "Calle Falsa 123",
    postCode: "28001",
    reference: "esto es un ejemplo",
    VATNr: "ES12345678Z",
    invoiceNumber: "2501",
    lineDate: "2023-10-01",
    lineText: "Servicios de desarrollo web",
    taxBreakdown: true,
    taxBase: 1000.00,
    taxRate: 21,
    taxAmount: 210.00,
    taxBase21: 1000.00,
    taxBase10: 0.00,
    expenses: 50.00,
    lineAmount: 1260.00,
    linesBreakdown: true,
    breakdownLines: [
        {
            id: "1",
            date: "2023-09-15",
            text: "Diseño de interfaz",
            amount: 500.00,
        },
        {
            id: "2",
            date: "2023-09-20",
            text: "Desarrollo backend",
            amount: 500.00,
        },
    ],
    currency: "EUR", 
    type: "official"
}

const mockProformaInvoice: IInvoice = {
    _id: "12345",
    status: "posted",
    date: "2023-10-01",
    projectCode: "PROJ-2023",
    client: "Cliente Ejemplo S.A.",
    company: "Mi Empresa S.L.",
    address: "Calle Falsa 123",
    postCode: "28001",
    reference: "esto es un ejemplo",
    VATNr: "ES12345678Z",
    invoiceNumber: "2501",
    lineDate: "2023-10-01",
    lineText: "Servicios de desarrollo web",
    taxBreakdown: true,
    taxBase: 1000.00,
    taxRate: 21,
    taxAmount: 210.00,
    taxBase21: 1000.00,
    taxBase10: 0.00,
    expenses: 50.00,
    lineAmount: 1260.00,
    linesBreakdown: true,
    breakdownLines: [
        {
            id: "1",
            date: "2023-09-15",
            text: "Diseño de interfaz",
            amount: 500.00,
        },
        {
            id: "2",
            date: "2023-09-20",
            text: "Desarrollo backend",
            amount: 500.00,
        },
    ],
    currency: "EUR", 
    type: "proforma"
}

// Grupo de pruebas para el componente "InvoicesRow" 
describe("InvoicesRow", () => {
    // Prueba específica: Verifica que los datos de la factura se rendericen correctamente
    it("should render Invoice data correctly", () => {
        // Renderiza el componente con los datos de ejemplo "mockInvoice"
        render(<InvoicesRow invoice={mockInvoice} />);
        // Verifica que cada dato aparezca en el front
        expect(screen.getByText("invoice")).toBeInTheDocument();
        expect(screen.getByText("2023-10-01")).toBeInTheDocument();
        expect(screen.getByText("issued")).toBeInTheDocument();
        expect(screen.getByText("esto es un ejemplo")).toBeInTheDocument();
        expect(screen.getByText("€1,260.00")).toBeInTheDocument();
        expect(screen.getByText("Icon")).toBeInTheDocument();
    });
    it("should render Proforma Invoice data correctly" , ()=>{
         // Renderiza el componente con los datos de ejemplo "mockProformaInvoice"
         render(<InvoicesRow invoice={mockProformaInvoice} />);
         // Verifica que cada dato aparezca en el front
         expect(screen.getByText("proforma")).toBeInTheDocument();
         expect(screen.getByText("2023-10-01")).toBeInTheDocument();
         expect(screen.getByText("issued")).toBeInTheDocument();
         expect(screen.getByText("esto es un ejemplo")).toBeInTheDocument();
         expect(screen.getByText("€1,260.00")).toBeInTheDocument();
         expect(screen.getByText("Icon")).toBeInTheDocument();
    })
})