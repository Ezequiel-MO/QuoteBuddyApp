export const INVOICE_ACTIONS = {
  SET_INVOICE_VALUE: ' SET_INVOICE_VALUE'
}

export const initialInvoiceValues = {
  date: 'September 27th, 2022',
  client: 'Ms. Samantha Hoffman',
  company: 'Meetings & Incentives Worldwide Inc',
  address: '1050 Seven Mile Road Caledonia',
  postCode: 'W1 53105 USA',
  reference: 'MA&OR Global Leaders Summit',
  invoiceNumber: '036/2022',
  lineDate: '',
  lineText:
    'Services rendered to group Audika during their stay in Malaga from Sept 3rd - 6th, 2022',
  lineAmount: 12000
}

export const invoiceReducer = (state, action) => {
  const { name, value } = action.payload
  switch (action.type) {
    case INVOICE_ACTIONS.SET_INVOICE_VALUE:
      return {
        ...state,
        [name]: value
      }
    default:
      return state
  }
}
