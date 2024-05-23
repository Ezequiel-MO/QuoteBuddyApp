import { useAuth } from 'src/context/auth/AuthProvider'
import Settings from './Settings'
import Signout from './Signout'
import { useFetchAccManagers } from 'src/hooks/fetchData/useFetchAccManagers'

interface Props {
	setDropdownActive: (active: boolean) => void
	dropdownActive: boolean
}

const SettingsCard = ({ setDropdownActive, dropdownActive }: Props) => {
	const { auth } = useAuth()
	const { accManagers } = useFetchAccManagers({
		query: auth.email
	})

	return (
		<div
			onClick={() => setDropdownActive(false)}
			onMouseLeave={() => setDropdownActive(false)}
			className={`${
				dropdownActive ? 'block' : 'hidden'
			} absolute top-20 right-10 bg-white-100 z-[100]`}
		>
			<div>
				<div className="font-bold text-black-50 border-3 border-b border-gray-500 p-3">
					<p>
						Hello,{' '}
						<span className="text-orange-500">
							{`${accManagers[0]?.firstName} ${accManagers[0]?.familyName}`}
						</span>
					</p>
				</div>
				<Settings />
				<Signout />
			</div>
		</div>
	)
}

export default SettingsCard
