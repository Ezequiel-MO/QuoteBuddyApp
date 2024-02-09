import { Icon } from '@iconify/react'

interface ArrowIconProps {
	open: boolean
}

export const ArrowIcon: React.FC<ArrowIconProps> = ({ open }) => {
	const arrowIcon = open ? 'bx:up-arrow' : 'bx:down-arrow'

	return <Icon icon={arrowIcon} color="#ea5933" className="mt-1 ml-2" />
}
