import { useDispatch, useSelector } from 'react-redux'
import {
  SET_INVOICE_VALUE,
  INCREMENT_INVOICE_NUMBER,
  CHANGE_POSTING_STATUS,
  SET_INVOICE,
  CHANGE_CURRENCY,
  selectCurrentInvoice
} from '../redux/features/CurrentInvoiceSlice'

export const useCurrentInvoice = () => {
  const dispatch = useDispatch()
  const currentInvoice = useSelector(selectCurrentInvoice)
  const setInvoiceValue = (invoiceValue) => {
    dispatch(SET_INVOICE_VALUE(invoiceValue))
  }
  const setInvoice = (invoiceData) => {
    dispatch(SET_INVOICE(invoiceData))
  }
  const incrementInvoiceNumber = (invoiceNumber) => {
    dispatch(INCREMENT_INVOICE_NUMBER(invoiceNumber))
  }
  const changePostingStatus = (status) => {
    dispatch(CHANGE_POSTING_STATUS(status))
  }

  const changeCurrency = (currency) => {
    dispatch(CHANGE_CURRENCY(currency))
  }

  return {
    currentInvoice,
    setInvoiceValue,
    setInvoice,
    incrementInvoiceNumber,
    changePostingStatus,
    changeCurrency
  }
}
