import { Icon } from '@iconify/react'

const Settings = () => {
	const openExternalLink = () => {
		window.open('https://docsbackoffice.netlify.app/', '_blank')
	}

	return (
		<div
			className="font-bold text-black-50 border-3 border-b border-gray-800 p-3 flex items-center cursor-pointer"
			onClick={openExternalLink}
		>
			<Icon icon="material-symbols:help-outline" />
			<p className="ml-2">Help</p>
		</div>
	)
}

export default Settings
