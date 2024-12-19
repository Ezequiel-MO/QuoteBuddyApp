import { FC } from 'react'
import { tableRowClasses } from 'src/constants/listStyles'
import { OptionSelect } from '../../multipleOrSingle'
import { EditableCell } from '../meals_activities/EditableCell'
import { existGift } from '../../../helpers'
import accounting from 'accounting'
import { IGift } from 'src/interfaces/'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useCurrentProject } from 'src/hooks'
import { UpdateGiftPayload } from 'src/redux/features/currentProject/types'

interface GiftRowProps {
	items: IGift[]
	selectedGift: IGift
	setSelectedGift: React.Dispatch<React.SetStateAction<IGift>>
}

export const GiftRow: FC<GiftRowProps> = ({
	items,
	selectedGift,
	setSelectedGift
}) => {
	const mySwal = withReactContent(Swal)

	const { currentProject, updateGift } = useCurrentProject()

	const noGifts = items.length === 0
	if (noGifts) return null

	const originalGift = currentProject.gifts.find(
		(el: IGift) => el._id === selectedGift?._id
	)

	const handleSelectChange = (e: React.ChangeEvent<{ value: unknown }>) => {
		const newValue = e.target.value as string
		const newSelectedGift =
			items && items.find((item) => item.name === newValue)
		if (newSelectedGift) {
			setSelectedGift(newSelectedGift)
		}
	}

	const handleUpdate = async (newValue: number, keyGift: 'qty' | 'price') => {
		try {
			existGift(items, selectedGift?._id as string)
			const updatedGift = { ...selectedGift }
			updatedGift[keyGift] = newValue
			setSelectedGift(updatedGift)
			const payload: UpdateGiftPayload = {
				value: newValue <= 0 ? 1 : newValue,
				idGift: selectedGift._id as string,
				keyGift
			}
			updateGift(payload)
		} catch (error: any) {
			console.log(error)
			await mySwal.fire({
				title: 'Error!',
				text: error.message,
				icon: 'error',
				confirmButtonColor: 'green'
			})
		}
	}

	return (
		<tr className={tableRowClasses}>
			<td></td>
			<td className="text-lg">{`Gift`}</td>
			<td>
				<OptionSelect
					options={items}
					value={selectedGift?.name || ''}
					handleChange={(e) => handleSelectChange(e)}
				/>
			</td>
			<td>
				<EditableCell
					value={selectedGift?.qty || 1}
					originalValue={originalGift?.qty || 1}
					typeValue="unit"
					onSave={(newValue) => handleUpdate(newValue, 'qty')}
				/>
			</td>
			<td>
				<EditableCell
					value={selectedGift?.price}
					originalValue={originalGift?.price as number}
					typeValue="price"
					onSave={(newValue) => handleUpdate(newValue, 'price')}
				/>
			</td>
			<td>
				{accounting.formatMoney(selectedGift?.qty * selectedGift?.price, '€')}
			</td>
		</tr>
	)
}
