import sun from '../../assets/sun-svgrepo-com.svg'
import moon from '../../assets/moon-svgrepo-com.svg'

export const DarkModeToggle = ({ isDarkMode, toggleDarkMode }) => {
	return (
		<div
			className="absolute top-20 right-5 z-50 cursor-pointer"
			onClick={toggleDarkMode}
		>
			<img
				className="w-10 h-10 rounded-full transition-all duration-500 ease-out hover:rotate-180"
				src={isDarkMode ? moon : sun}
				alt="light/dark mode"
			/>
		</div>
	)
}
