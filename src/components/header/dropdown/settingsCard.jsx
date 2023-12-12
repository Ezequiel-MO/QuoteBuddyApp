import Settings from './Settings'
import Signout from './Signout'
import { useGetAccManager } from '../../../hooks'
import { useAuth } from '../../../context/auth/useAuth'

const SettingsCard = ({ setDropdownActive, dropdownActive }) => {
	const { auth } = useAuth()
	const { isLoading, accManager, setAccManager } = useGetAccManager(auth.email)

	return (
		<div
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
							{`${accManager?.firstName} ${accManager?.familyName}`}
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
