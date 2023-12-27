import { useState } from 'react'
import { Link } from 'react-router-dom'
import header_image from '../../assets/header_image.jpg'
import SettingsCard from './dropdown/settingsCard'
import { Breadcrumbs } from '../atoms'
import { styleMap } from 'src/constants/theme'
import { useGetSetting } from 'src/hooks/useGetSetting'
import { useTheme } from 'src/context/theme/ThemeContext'
import { useFetchAccManagers } from 'src/hooks/fetchData/useFetchAccManagers'
import { IAccManager } from '../../interfaces/accManager'

const Header: React.FC = () => {
	const [dropdownActive, setDropdownActive] = useState<boolean>(false)
	const userEmail = localStorage.getItem('user_email') || ''
	const { accManagers } = useFetchAccManagers({ query: userEmail })
	const { logo, colors } = useTheme()
	const { setting, isLoading, setIsLoading, refreshSetting } = useGetSetting()

	const accManager = accManagers as IAccManager

	const standardImage =
		'https://user-images.githubusercontent.com/90182096/212350795-d40af2d3-5c41-4a88-a531-327b92f472d5.png'

	const imagePerfil =
		accManager?.imageContentUrl?.length > 0
			? accManager.imageContentUrl[0]
			: standardImage

	return (
		<div className="sticky top-0 z-50 h-20 my-4 bg-white-50 rounded-lg ">
			<div className="absolute z-30 flex w-full h-full">
				<div className="relative z-30 w-5/6 px-6 md:py-10 md:w-1/2 flex items-center">
					<Link to="/app">
						<img
							alt="Backoffice header"
							className="object-contain h-6 w-auto"
							src={setting?.logo}
						/>
					</Link>
					<div className="ml-6">
						<Breadcrumbs />
					</div>
				</div>
				<div className="absolute top-0 right-0 flex w-full h-full">
					<div
						className="w-1/3 h-full"
						style={{
							backgroundColor: styleMap.colors[colors.tertiary]
						}}
					></div>
					<div className="relative w-1/3">
						<svg
							fill="currentColor"
							viewBox="0 0 100 100"
							style={{ color: styleMap.colors[colors.tertiary] }}
							className="absolute inset-y-0 z-20 h-full"
						>
							<polygon id="diagonal" points="0,0 100,0 50,100 0,100"></polygon>
						</svg>
						<svg
							fill="currentColor"
							viewBox="0 0 100 100"
							className="absolute inset-y-0 z-10 h-full ml-6 text-white-0 opacity-50"
						>
							<polygon points="0,0 100,0 50,100 0,100"></polygon>
						</svg>
					</div>
				</div>
			</div>
			<div className="absolute top-0 right-0 block w-9/12 h-full">
				<img
					alt="Backoffice header"
					className="object-cover h-full min-w-full"
					src={header_image}
				/>
			</div>
			<div
				className="absolute top-1 right-1 z-50"
				onMouseEnter={() => setDropdownActive(true)}
			>
				<img
					className="w-16 h-16 rounded-full cursor-pointer"
					src={imagePerfil}
					alt="Rounded avatar"
					onClick={() => setDropdownActive(!dropdownActive)}
				/>
			</div>
			<SettingsCard
				setDropdownActive={setDropdownActive}
				dropdownActive={dropdownActive}
			/>
		</div>
	)
}

export default Header
