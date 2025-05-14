import { useCallback } from 'react'
import { IGift } from '@interfaces/gift'

interface UseGiftModalHandlersParams {
	setOpen: (open: boolean) => void
	setEditIndex: (index: number) => void
	textContent: string
	gift: IGift
	editGift: (index: number, content: string) => void
	index: number
}

export const useGiftModalHandlers = ({
	setOpen,
	setEditIndex,
	textContent,
	gift,
	editGift,
	index
}: UseGiftModalHandlersParams) => {
	const handleClose = useCallback(() => {
		setOpen(false)
		setEditIndex(-1)
	}, [setOpen, setEditIndex])

	const handleConfirm = useCallback(() => {
		if (textContent !== gift.textContent) {
			editGift(index, textContent)
		}
		handleClose()
	}, [textContent, gift, index, editGift, handleClose])

	return { handleClose, handleConfirm }
}
