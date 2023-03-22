export const getInitialValues = (accManager) => {
	return {
		firstName: accManager?.firstName ?? '',
		familyName: accManager?.familyName ?? '',
		email: accManager?.email ?? ''
	}
}
