import { Icon } from '@iconify/react'
import { withRoleAuthorization } from 'src/HOC/WithRoleAuthorization'
import { removeItemFromList } from 'src/helper/RemoveItemFromList'

interface ButtonDeleteProps {
	endpoint: string
	ID: string
	setter: React.Dispatch<React.SetStateAction<any[]>>
	items: any[]
}

export const ButtonDelete = ({
	endpoint,
	ID,
	setter,
	items
}: ButtonDeleteProps) => {
	return (
		<button onClick={() => removeItemFromList(endpoint, ID, setter, items)}>
			<Icon icon="fluent:delete-16-regular" color="#ea5933" />
		</button>
	)
}

export const ButtonDeleteWithAuth = withRoleAuthorization(ButtonDelete)
