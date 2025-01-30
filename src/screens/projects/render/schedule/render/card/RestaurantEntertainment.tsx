import { FC, useState } from 'react'
import { toast } from 'react-toastify'
import { DeleteIcon } from '@components/atoms'
import { useCurrentProject } from '../../../../../../hooks'
import { toastOptions, errorToastOptions } from '../../../../../../helper/toast'
import { ModalPriceEntertainment } from '../../../../../entertainment/list/modalPrice/ModalPriceEntertainment'
import { IRestaurant, IEntertainment } from '../../../../../../interfaces'

interface RestaurantEntertainmentProps {
	typeMeal: 'lunch' | 'dinner'
	restaurant: IRestaurant
	dayIndex: number
	setChange: React.Dispatch<React.SetStateAction<boolean>>
}

interface IUpdate {
	isUpdadte: boolean
	typeMeal: string
	dayIndex: number
	idRestaurant: string
}

export const RestaurantEntertainment: FC<RestaurantEntertainmentProps> = ({
	typeMeal,
	restaurant,
	dayIndex,
	setChange
}) => {
	const { deletedEntertainmetInRestaurant } = useCurrentProject()
	const [entertainment, setEntertainment] = useState<IEntertainment>()
	const [open, setOpen] = useState(false)
	const isRestaurant = ['lunch', 'dinner']

	if (!isRestaurant.includes(typeMeal)) return null

	const handleOpenModal = (entertainment: IEntertainment) => {
		setEntertainment(entertainment)
		setOpen(true)
	}

	const handleDelete = (idEntertainment: string) => {
		try {
			deletedEntertainmetInRestaurant({
				dayIndex,
				idRestaurant: restaurant._id,
				typeMeal,
				idEntertainment
			})
			toast.success('Entertainment deleted', toastOptions)
		} catch (err: any) {
			console.log(err)
			toast.error(err.message, errorToastOptions)
		}
	}

	return (
		<div>
			<ModalPriceEntertainment
				entertainmentShow={entertainment as IEntertainment}
				open={open}
				setOpen={setOpen}
				setChange={setChange}
				infoUpdate={{
					dayIndex,
					isUpdadte: true,
					typeMeal,
					idRestaurant: restaurant._id
				}}
			/>
			{restaurant.entertainment?.map((el, index) => (
				<div key={index}>
					<p
						className="cursor-pointer hover:text-orange-500 inline-block  mr-1"
						onClick={() => handleOpenModal(el)}
					>
						<abbr title="open more info Entertainment">Edit {el.name}</abbr>
					</p>
					<DeleteIcon
						id={el._id as string}
						onDelete={() => handleDelete(el._id as string)}
					/>
				</div>
			))}
		</div>
	)
}
