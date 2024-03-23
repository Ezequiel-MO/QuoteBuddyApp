import { Icon } from '@iconify/react'

interface Props {
	logUserOut: () => void
}

const LogoutButton = ({ logUserOut }: Props) => {
	return (
		<div
			onClick={logUserOut}
			className="text-white-0 absolute right-10 top-5 cursor-pointer flex items-center"
		>
			<Icon icon="mdi:logout" width={36} />
			<span>Log out</span>
		</div>
	)
}

export default LogoutButton
