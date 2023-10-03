export const generateFormValues = (formFields, data, defaultValues = {}) => {
	return formFields.reduce((values, field) => {
		if (data?.[field] === undefined) {
			if (field === 'longitude' || field === 'latitude') {
				values[field] =
					data?.location?.coordinates[field === 'longitude' ? 1 : 0] ?? 0
			} else if (defaultValues[field] !== undefined) {
				values[field] = defaultValues[field]
			} else if (Array.isArray(data?.[field])) {
				values[field] = []
			} else if (typeof data?.[field] === 'object') {
				values[field] = {}
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
