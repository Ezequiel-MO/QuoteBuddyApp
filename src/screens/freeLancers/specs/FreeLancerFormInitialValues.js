export const getInitialValues = (freeLancer) => {
	return {
		firstName: freeLancer?.firstName ?? '',
		familyName: freeLancer?.familyName ?? '',
		email: freeLancer?.email ?? '',
		phone: freeLancer?.phone ?? '',
		halfDayRate: freeLancer?.halfDayRate ?? '',
		fullDayRate: freeLancer?.fullDayRate ?? '',
		languageSupplement: freeLancer?.languageSupplement ?? '',
		weekendHDRate: freeLancer?.weekendHDRate ?? '',
		weekendFDRate: freeLancer?.weekendFDRate ?? '',
		type: freeLancer?.type ?? '',
		city: freeLancer?.city ?? ''
	}
}
