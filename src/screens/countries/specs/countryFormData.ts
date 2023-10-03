import { ICountry } from '@interfaces/country'

interface FormDataMethods<T> {
	create: (values: T, files: File[]) => any
	update: (values: T) => any
}

export const CountryFormData: FormDataMethods<ICountry> = {
	create: (values) => {
		return values
	},
	update: (values) => {
		return values
	}
}
