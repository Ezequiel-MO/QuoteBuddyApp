import { ButtonDeleted } from '../../../components/atoms'

export const DeleteButton = ({ endpoint, ID, setter, items }) => {
	return (
		<ButtonDeleted endpoint={endpoint} ID={ID} setter={setter} items={items} />
	)
}
