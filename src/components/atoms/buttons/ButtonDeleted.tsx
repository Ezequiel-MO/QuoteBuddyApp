import { Icon } from '@iconify/react'
import { withRoleAuthorization } from 'src/HOC/WithRoleAuthorization'
import { removeItemFromList } from 'src/helper/RemoveItemFromList'

interface ButtonDeleteProps<T extends { _id?: string }> {
	endpoint: string
	ID: string
	setter: React.Dispatch<React.SetStateAction<T[]>>
	items: T[]
}

export const ButtonDelete = <T extends { _id?: string }>({
	endpoint,
	ID,
	setter,
	items
}: ButtonDeleteProps<T>) => {
	return (
		<button onClick={() => removeItemFromList(endpoint, ID, setter, items)}>
			<Icon icon="fluent:delete-16-regular" color="#ea5933" />
		</button>
	)
}

export const ButtonDeleteWithAuth = withRoleAuthorization<any>(ButtonDelete)
