import { withRoleAuthorization } from 'src/HOC/WithRoleAuthorization'
import { removeItemFromList } from 'src/helper/RemoveItemFromList'
import { Button } from './Button'

/**
 * Props for the ButtonDelete component
 */
interface ButtonDeleteProps<T extends { _id?: string }> {
	/** API endpoint for delete operation */
	endpoint: string
	/** ID of the item to delete */
	ID: string
	/** State setter function to update the list after deletion */
	setter: React.Dispatch<React.SetStateAction<T[]>>
	/** Current list of items */
	items: T[]
}

/**
 * Button component for deleting items from a list
 * Uses the Button component with danger variant internally
 */
export const ButtonDelete = <T extends { _id?: string }>({
	endpoint,
	ID,
	setter,
	items
}: ButtonDeleteProps<T>) => {
	return (
		<Button
			variant="danger"
			icon="fluent:delete-16-regular"
			iconColor="#ea5933"
			aria-label="Delete item"
			title="Delete item"
			handleClick={() => removeItemFromList(endpoint, ID, setter, items)}
			className="p-1 bg-transparent hover:bg-red-50"
		/>
	)
}

/**
 * Role-based authorized version of the ButtonDelete component
 * @deprecated Consider using <Button variant="danger"> with withRoleAuthorization directly for new implementations
 */
export const ButtonDeleteWithAuth = withRoleAuthorization<any>(ButtonDelete)
