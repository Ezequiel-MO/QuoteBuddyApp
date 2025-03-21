import React from 'react'
import {
	CategoryIndicator,
	categoryStyles
} from '@screens/budget/CategoryIndicator'

/**
 * Reusable component for creating consistent section headers in the budget table
 * Designed to be visually subordinate to the day dividers
 */
interface SectionHeaderProps {
	title: string
	type:
		| 'accommodation'
		| 'meeting'
		| 'transfer'
		| 'meal'
		| 'activity'
		| 'gift'
		| 'entertainment'
		| string
	subtitle?: string
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
	title,
	type,
	subtitle
}) => {
	const styles =
		categoryStyles[type as keyof typeof categoryStyles] ||
		categoryStyles.activity

	return (
		<tr className="group transition-colors duration-150">
			<td colSpan={6} className="p-0">
				<div
					className={`${styles.header} py-2 px-6 ml-4 border-l-2 border-l-${styles.color}-600/40`}
				>
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-3">
							<CategoryIndicator type={type} />
							<span
								className={`font-medium text-base ${styles.title} tracking-wide`}
							>
								{title}
							</span>
							{subtitle && (
								<span className="text-sm text-gray-400 ml-2">{subtitle}</span>
							)}
						</div>
					</div>
				</div>
			</td>
		</tr>
	)
}
