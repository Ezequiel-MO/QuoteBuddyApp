export const generateFormValues = (formFields, data) => {
	/* if (data?.imageContentUrl) {
		return data
	} */

	return formFields.reduce((values, field) => {
		if (data?.[field] === undefined) {
			if (field === 'longitude' || field === 'latitude') {
				values[field] =
					data?.location?.coordinates[field === 'longitude' ? 1 : 0] ?? 0
			} else if (typeof data?.[field] === 'boolean') {
				values[field] = true
			} else if (typeof data?.[field] === 'number') {
				values[field] = 0
			} else {
				values[field] = ''
			}
		} else {
			values[field] = data?.[field]
		}
		return values
	}, {})
}
