import { Icon } from '@iconify/react'
import { TranslationKeys } from '@interfaces/translations'
import accounting from 'accounting'
import { useTranslation } from 'src/context/translations/translationContext'

interface CostItemProps {
	icon: string
	title: TranslationKeys
	cost: number
	color: string
	bgColor?: string
}

export const CostItem = ({
	icon,
	title,
	cost,
	color,
	bgColor
}: CostItemProps) => {
	const { t } = useTranslation()

	return (
		<div className="flex items-center justify-between px-4 py-3 my-2 rounded-md shadow-md bg-gray-800/80 text-gray-100 hover:bg-gray-700/90 transition-all duration-200 border border-gray-700/40 backdrop-filter backdrop-blur-sm group">
			<div className="flex items-center space-x-3">
				<div className="flex items-center space-x-3">
					{/* Color indicator matching chart segment */}
					<div
						className="w-3 h-full min-h-[24px] rounded-l-md"
						style={{ backgroundColor: color }}
					></div>

					{/* Icon container */}
					<div
						className="p-2 rounded-md shadow-inner flex items-center justify-center"
						style={{ backgroundColor: bgColor || `${color}30` }}
					>
						<Icon
							icon={icon}
							color={color}
							width={22}
							height={22}
							className="flex-shrink-0 transition-transform duration-200 transform group-hover:scale-110"
						/>
					</div>

					<span className="hidden font-medium tracking-wide text-md sm:block">
						{t(title).toLocaleUpperCase()}
					</span>
				</div>
			</div>
			<div className="font-semibold text-lg">
				{accounting.formatMoney(cost, '€')}
			</div>
		</div>
	)
}
