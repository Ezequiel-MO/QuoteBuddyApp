import { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { ModalComponent } from '../../../../../components/atoms'
import TextEditor from '../../../../../components/molecules/TextEditor'
import { useCurrentProject } from '../../../../../hooks'
import { useGiftModalHandlers } from './useGiftModalHandlers' // New hook
import { IGift } from '@interfaces/gift'

interface GiftModalProps {
	open: boolean
	setOpen: (open: boolean) => void
	gift: IGift
	index: number
	setEditIndex: (index: number) => void
}

export const GiftModal: React.FC<GiftModalProps> = ({
	open,
	setOpen,
	gift,
	index,
	setEditIndex
}) => {
	const { editGift } = useCurrentProject()
	const [textContent, setTextContent] = useState<string>(
		gift?.textContent || ''
	)

	useEffect(() => {
		if (gift?.textContent) {
			setTextContent(gift.textContent)
		}
	}, [gift])

	const handlers = useGiftModalHandlers({
		setOpen,
		setEditIndex,
		textContent,
		gift,
		editGift: (index: number, content: string) => editGift(gift, index),
		index
	})

	const styleModal = {
		position: 'absolute' as const,
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: { xs: '95%', sm: '85%', md: '75%', lg: '65%', xl: '55%' },
		height: '85%',
		bgcolor: '#1e293b',
		borderRadius: '0.5rem',
		boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
		p: 3,
		border: '1px solid #334155'
	}

	if (Object.keys(gift).length === 0) {
		return null
	}

	return (
		<div className="relative">
			<ModalComponent
				open={open}
				setOpen={handlers.handleClose}
				styleModal={styleModal}
			>
				<div className="relative flex flex-col h-full text-white">
					<div className="mb-4 flex justify-between items-center border-b border-gray-700 pb-3">
						<h2 className="text-xl font-bold text-white-50">
							{gift.name} - Edit Description
						</h2>
						<button
							className="text-gray-400 hover:text-red-500 transition-colors duration-200"
							onClick={handlers.handleClose}
							aria-label="Close modal"
						>
							<Icon icon="material-symbols:cancel" width="30" />
						</button>
					</div>

					<div className="flex-grow overflow-hidden">
						<TextEditor
							value={textContent}
							onChange={(value: string) => setTextContent(value)}
							className="h-full"
							style={{
								backgroundColor: '#0f172a',
								color: '#000'
							}}
						/>
					</div>

					<div className="mt-4 pt-3 flex justify-end border-t border-gray-700">
						<button
							className="py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white-0 font-medium rounded-lg transition-colors duration-200 flex items-center"
							onClick={handlers.handleConfirm}
						>
							<Icon icon="mdi:content-save" className="mr-2" />
							Save Changes
						</button>
					</div>
				</div>
			</ModalComponent>
		</div>
	)
}
