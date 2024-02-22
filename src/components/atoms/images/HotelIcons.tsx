import { Icon } from '@iconify/react'
import { useCurrentProject } from 'src/hooks'

interface Props {
	leftIconsText: string[]
	rightIconsText: string[]
}

const HotelIcons: React.FC<Props> = ({ leftIconsText, rightIconsText }) => {
	const { currentProject } = useCurrentProject()
	const { clientCompany = [] } = currentProject
	const { colorPalette = [] } = clientCompany[0] || {}
	const defaultColor = '#ea5933'
	const iconColor = colorPalette.length > 0 ? colorPalette[0] : defaultColor

	const createIconElement = (iconName: string) => (
		<Icon icon={iconName} color={iconColor} width="28" />
	)

	const leftIcons = [
		createIconElement('akar-icons:location'),
		createIconElement('bx:bx-restaurant'),
		createIconElement('icon-park-outline:hotel-please-clean'),
		createIconElement('akar-icons:wifi')
	]

	const rightIcons = [
		createIconElement('ic:outline-pool'),
		createIconElement('akar-icons:clock'),
		createIconElement('ic:sharp-meeting-room'),
		createIconElement('si-glyph:wheel-chair')
	]

	const createMixedArray = (icons: JSX.Element[], texts: string[]) => {
		return icons.map((icon, i) => ({ icon, text: texts[i] }))
	}

	const mixedLeft = createMixedArray(leftIcons, leftIconsText)
	const mixedRight = createMixedArray(rightIcons, rightIconsText)

	const renderList = (items: { icon: JSX.Element; text: string }[]) => (
		<ul className="list-none">
			{items.map((item, i) => (
				<li key={i} className="flex items-center mb-2 last:mb-0">
					<div className="mr-2">{item.icon}</div>
					<span className="text-sm font-medium">{item.text}</span>
				</li>
			))}
		</ul>
	)

	return (
		<div className="overflow-x-scroll no-scrollbar mt-4 sm:m-6">
			<div className="flex justify-around">
				{renderList(mixedLeft)}
				{renderList(mixedRight)}
			</div>
		</div>
	)
}

export default HotelIcons
