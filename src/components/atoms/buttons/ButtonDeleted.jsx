import { Icon } from '@iconify/react'
import { removeItemFromList } from '../../../helper/RemoveItemFromList'

export const ButtonDeleted = ({ endpoint, ID, setter, items }) => {
	return (
		<button onClick={() => removeItemFromList(endpoint, ID, setter, items)}>
			<Icon icon="fluent:delete-16-regular" color="#ea5933" />
		</button>
	)
}
