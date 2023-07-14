interface IInvoiceBreakdownLine {
	status: 'posting' | 'posted' | 'review'
	date: string
	text: string
	amount: number
}

export interface IInvoice {
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
	expenses: number
	lineAmount: number
	breakdownLines: IInvoiceBreakdownLine[]
	currency: 'EUR' | 'USD' | 'GBP'
}
