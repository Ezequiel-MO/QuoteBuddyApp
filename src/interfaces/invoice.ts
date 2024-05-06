interface IInvoiceBreakdownLine {
	date: string
	text: string
	amount: number
}

export interface IInvoice {
	status: 'posting' | 'posted'
	date: string
	projectCode: string
	client: string
	company: string
	address: string
	postCode: string
	reference: string
	VATNr: string
	invoiceNumber: string
	lineDate: string
	lineText: string
	taxBreakdown: boolean
	taxBase: number
	taxRate: number
	taxAmount: number
	taxBase21: number
	taxBase10: number
	expenses: number
	lineAmount: number
	linesBreakdown?: boolean
	breakdownLines: IInvoiceBreakdownLine[]
	currency: 'EUR' | 'USD' | 'GBP'
}
