import { FC, createContext, useContext, useState, useEffect } from 'react'
import EN from './EN.json'
import ES from './ES.json'
import { TranslationKeys } from '@interfaces/translations'

type TranslationsType = {
	[key in TranslationKeys]: string
}

const translations: { [key: string]: TranslationsType } = {
	EN,
	ES
}

type TranslationContextType = {
	t: (key: TranslationKeys) => string
}

const TranslationContext = createContext<TranslationContextType | undefined>(
	undefined
)

export const useTranslation = () => {
	const context = useContext(TranslationContext)
	if (!context) {
		throw new Error('useTranslation must be used within a TranslationProvider')
	}
	return context
}

type TranslationProviderProps = {
	quoteLanguage?: string
	children: React.ReactNode
}

export const TranslationProvider: FC<TranslationProviderProps> = ({
	quoteLanguage,
	children
}) => {
	const [language, setLanguage] = useState<string>(quoteLanguage || 'EN')

	useEffect(() => {
		setLanguage(quoteLanguage || 'EN')
	}, [quoteLanguage])

	const t = (key: TranslationKeys) => translations[language][key] || key

	return (
		<TranslationContext.Provider value={{ t }}>
			{children}
		</TranslationContext.Provider>
	)
}
