// src/helper/forms/resetEntityFields.ts
import { Dispatch } from 'react'

interface EntityAction<T> {
	type: string
	payload: { name: keyof T; value: any }
}

export const resetEntityFilters = <T>(
	dispatch: Dispatch<EntityAction<T>>,
	entityType: string,
	fields: Partial<Record<keyof T, any>>
) => {
	console.log(`UPDATE_${entityType.toUpperCase()}_FIELD`)
	Object.keys(fields).forEach((key) => {
		dispatch({
			type: `UPDATE_${entityType.toUpperCase()}_FIELD`,
			payload: { name: key as keyof T, value: fields[key as keyof T] }
		})
	})
}
