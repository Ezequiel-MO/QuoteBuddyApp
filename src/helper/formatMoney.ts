import accounting from 'accounting'

export const formatMoney = (amount: number, currency = '€') => {
	return accounting.formatMoney(amount, `${currency} `, 2, '.', ',')
}
