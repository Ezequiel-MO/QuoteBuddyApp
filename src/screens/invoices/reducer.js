export const INVOICE_ACTIONS = {
  SET_INVOICE_VALUE: ' SET_INVOICE_VALUE',
  INCREMENT_INVOICE_NUMBER: 'INCREMENT_INVOICE_NUMBER',
  CHANGE_POSTING_STATUS: 'CHANGE_POSTING_STATUS'
}

export const initialInvoiceValues = {
  date: 'September 27th, 2022',
  client: 'Ms. Samantha Hoffman',
  company: 'Meetings & Incentives Worldwide Inc',
  address: '1050 Seven Mile Road Caledonia',
  postCode: 'W1 53105 USA',
  reference: 'MA&OR Global Leaders Summit',
  invoiceNumber: 22036,
  lineDate: '2022-09-21',
  lineText:
    'Services rendered to group Toyota during their stay in Malaga from Sept 3rd - 6th, 2022',
  lineAmount: 12000,
  postingStatus: 'posting'
}

export const postingStatus = 'posting'

export const invoiceReducer = (state, action) => {
  switch (action.type) {
    case INVOICE_ACTIONS.SET_INVOICE_VALUE:
      const { name, value } = action.payload
      return {
        ...state,
        [name]: value
      }
    case INVOICE_ACTIONS.INCREMENT_INVOICE_NUMBER:
      return {
        ...state,
        invoiceNumber: action.payload + 1
      }
    case INVOICE_ACTIONS.CHANGE_POSTING_STATUS:
      return {
        ...state,
        postingStatus: action.payload
      }
    default:
      return state
  }
}
