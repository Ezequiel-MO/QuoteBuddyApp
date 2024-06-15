import * as languages from '../constants/languages'

type LanguageCode = (typeof languages.languageDictionary)[number]['code']

export interface ILanguageDescription {
	languageCode: LanguageCode
	value: string
}
