// ModalVenue.tsx
import { useState, useEffect, FC } from 'react'
import {
	ModalCancelButton,
	ModalConfirmButton,
	Spinner
} from '../../../../../../../components/atoms'
import { TableHeadModal } from './TableHeadModal'
import { IVenuePrice, IRestaurant } from '../../../../../../../interfaces'
import { toast } from 'react-toastify'
import { errorToastOptions } from '../../../../../../../helper/toast'
import { ModalWrapper } from './ModalWrapper'
import {
	useCurrentProject,
	useModalValidation,
	useSweetAlertCloseDialog,
	useSweetAlertConfirmationDialog
} from '@hooks/index'

interface ModalVenueProps {
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
	restaurant: IRestaurant
	typeMeal: 'lunch' | 'dinner'
	dayIndex: number
	setChange: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalVenue: FC<ModalVenueProps> = ({
	open,
	setOpen,
	restaurant,
	typeMeal,
	dayIndex,
	setChange
}) => {
	const { addOrEditVenue } = useCurrentProject()
	const [loading, setLoading] = useState(false)
	const [value, setValue] = useState<IVenuePrice>({})
	const [isChecked, setIsChecked] = useState<
		Record<keyof IVenuePrice, boolean>
	>({} as Record<keyof IVenuePrice, boolean>)

	useEffect(() => {
		if (open) {
			setLoading(true)
			const isVenue = Object.values(restaurant?.venue_price || {}).length > 0
			if (isVenue && restaurant.venue_price) {
				setValue({
					...restaurant.venue_price,
					notes: restaurant.venue_price.notes || ''
				})
			}
			const timer = setTimeout(() => {
				setLoading(false)
			}, 800)
			return () => clearTimeout(timer)
		}
	}, [open, restaurant])

	const onSuccess = async () => {
		try {
			await addOrEditVenue({
				typeMeal,
				dayIndex,
				idRestaurant: restaurant._id,
				venueEdit: value
			})
			setOpen(false)
			setChange(false)
			toast.success('Venue details saved successfully!', {
				...errorToastOptions,
				type: 'success'
			})
		} catch (error: any) {
			onError(error.message || 'An error occurred')
		}
	}

	const onError = (error: any) => {
		toast.error(error, errorToastOptions)
	}

	const { handleConfirm } = useSweetAlertConfirmationDialog({
		onSuccess,
		onError
	})

	const handleCloseModal = () => {
		setOpen(false)
		setChange(false)
	}

	const { validate } = useModalValidation({
		isChecked
	})

	const setClosed = () => {
		setOpen(false)
		setChange(false)
	}

	const { handleClose } = useSweetAlertCloseDialog({
		validate: validate,
		setOpen: setClosed
	})

	if (loading) {
		return (
			<ModalWrapper open={open} setOpen={setOpen}>
				<div className="flex justify-center items-center h-64">
					<Spinner />
				</div>
			</ModalWrapper>
		)
	}

	return (
		<ModalWrapper open={open} setOpen={handleCloseModal}>
			<div className="flex flex-col items-center p-4">
				{/* Single Close Button */}
				<ModalCancelButton handleClose={() => handleClose()} />

				<h1 className="text-center text-xl font-bold text-orange-400 mb-4">
					{restaurant.name} - Venue Details
				</h1>

				<div className="w-full mt-4">
					<TableHeadModal
						value={value}
						setValue={setValue}
						isChecked={isChecked}
						setIsChecked={setIsChecked}
						restaurant={restaurant}
					/>
				</div>

				{/* Single Textarea for Notes */}
				<div className="w-full mt-6">
					<label className="block text-sm font-medium text-gray-300 mb-2">
						Additional Notes
					</label>
					<textarea
						className="w-full bg-gray-800 text-gray-100 border border-gray-700 rounded-md p-3 
              focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm placeholder-gray-500
              transition-all duration-200"
						rows={3}
						value={value.notes || ''}
						onChange={(e) =>
							setValue((prev) => ({ ...prev, notes: e.target.value }))
						}
						placeholder="Enter any special requirements, notes, or additional information..."
					/>
				</div>

				<div className="flex justify-end w-full mt-8 border-t border-gray-700 pt-4">
					<ModalConfirmButton
						handleConfirm={handleConfirm}
						text="Save Changes"
					/>
				</div>
			</div>
		</ModalWrapper>
	)
}
