import { FC, MouseEvent } from 'react'
import { Icon } from '@iconify/react'
import { Button } from '../../../../../../components/atoms'

interface EyeIconDetailProps {
	handleClick: (e: MouseEvent<HTMLSpanElement>) => void
	eye?: boolean
	isDragging?: boolean
}

export const EyeIconDetail: FC<EyeIconDetailProps> = ({
	handleClick,
	eye = true,
	isDragging
}) => {
	const classEye =
		' mr-2 inline-block text-base hover:text-orange-500 hover:scale-150 hover:transition hover:duration-150 hover:ease-in-out'

	if (isDragging) return null

	return (
		<>
			<Button
				icon=""
				newClass={classEye}
				type="button"
				handleClick={(e) => {
					e.stopPropagation()
					handleClick(e)
				}}
			>
				<abbr title="open details">
					{eye ? (
						<Icon
							icon="mdi:eye-outline"
							style={{ fontSize: '20px', color: 'orangered' }}
						/>
					) : (
						'Edit Details'
					)}
				</abbr>
			</Button>
		</>
	)
}
