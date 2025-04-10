import { errorAlert } from '../../../constants/mySwalAlert'

export const errorSweetalert = async (title?: string, text?: string) =>
	errorAlert(title || 'Error', text || '').fire()
