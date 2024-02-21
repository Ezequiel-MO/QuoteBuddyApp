import { Icon } from '@iconify/react'
import { TranslationKeys } from '@interfaces/translations'
import accounting from 'accounting'
import { useTranslation } from 'src/context/translations/translationContext'

interface CostItemProps {
	icon: string
	title: TranslationKeys
	cost: number
	color: string
}

export const CostItem = ({ icon, title, cost, color }: CostItemProps) => {
	const { t } = useTranslation()
	return (
		<div className="shadow-lg my-2 p-2 rounded flex flex-row justify-between dark:bg-gray-50 dark:text-black-50">
			<Icon
				icon={icon}
				color={color}
				width="30"
				className="flex-shrink-0 dark:bg-white-0 dark:rounded-lg"
			/>
			<p className="hidden sm:block">{t(title).toLocaleUpperCase()}</p>
			{accounting.formatMoney(cost, '€')}
		</div>
	)
}
