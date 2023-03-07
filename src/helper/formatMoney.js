import accounting from 'accounting'

export const formatMoney = (amount, currency = '€') => {
	return accounting.formatMoney(amount, `${currency} `, 2, '.', ',')
}
