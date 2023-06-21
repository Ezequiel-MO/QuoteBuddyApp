import { Icon } from '@iconify/react'
import { removeItemFromList } from '../../../helper/RemoveItemFromList'
import { useAuth } from '../../../hooks'

export const ButtonDeleted = ({ endpoint, ID, setter, items }) => {
	const { auth } = useAuth()
	if (auth.role !== 'admin') return null
	return (
		<button onClick={() => removeItemFromList(endpoint, ID, setter, items)}>
			<Icon icon="fluent:delete-16-regular" color="#ea5933" />
		</button>
	)
}
