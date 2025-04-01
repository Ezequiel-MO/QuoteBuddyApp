import { useEffect, useRef } from 'react'
import * as styles from '../../../constants/mainsectionStyles'
import Schedule from './Schedule'
import { Icon } from '@iconify/react'
import { Hotels } from './cardswrappers/Hotels'
import { useCurrentProject } from 'src/hooks'
import { useTranslation } from 'src/context/translations/translationContext'
import { RichParagraph } from '@components/atoms/paragraphs/RichParagraph'
import { hasMeaningfulText } from 'src/helper/hasMeaningfulText'
import { Gifts } from './cardswrappers/Gifts'
import { BudgetTable } from '@screens/budget/MainTable/higherComponents'

interface FormPreviewProps {
	isOpen: boolean
	onClose: () => void
}

export const MainSectionPreview: React.FC<FormPreviewProps> = ({
	isOpen,
	onClose
}) => {
	if (!isOpen) return null
	const { t } = useTranslation()
	const { currentProject } = useCurrentProject()
	const { hotels, multiDestination, groupName, projectIntro, gifts } =
		currentProject

	const modalRef = useRef<HTMLDivElement>(null)

	const handleModalClick = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		event.stopPropagation()
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node)
			) {
				onClose()
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [onClose])

	return (
		<div className="fixed inset-0 z-50 overflow-auto bg-indigo-800 bg-opacity-85 flex justify-center items-start pt-20">
			<div
				className="relative p-8 bg-white-0 bg-opacity-50 max-w-6xl w-5/6 m-auto flex-col flex rounded-lg"
				ref={modalRef}
				onClick={handleModalClick}
			>
				<span
					className="absolute top-0 right-0 p-4 cursor-pointer"
					onClick={onClose}
				>
					<button className="text-lg font-semibold">
						<Icon
							icon="material-symbols:tab-close"
							width={36}
							className="text-red-900"
						/>
					</button>
				</span>
				<div className="mt-4 opacity-95">
					<h1 className={styles.quoteTitle}>
						{`${t('quotation')} Gr. ${groupName}`}
					</h1>
					{hasMeaningfulText(projectIntro[0]) && (
						<RichParagraph
							text={projectIntro[0]}
							truncate={true}
							maxLines={15}
						/>
					)}
					{!multiDestination && <Hotels hotels={hotels} />}
					<Schedule />
					<Gifts gifts={gifts} />
					<BudgetTable />
				</div>
			</div>
		</div>
	)
}
