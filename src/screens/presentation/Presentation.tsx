import { Icon } from '@iconify/react'
import { Link, useNavigate } from 'react-router-dom'
import { Spinner } from '@components/atoms'
import { useNavigationLoader } from 'src/hooks'
import { useLocalStorageItem } from "src/hooks"
import { FinancialReports } from "./FinancialReports"
import { Projects } from "./Projects"
import { DBMaster } from "./DBMaster"
import { ISetting } from "src/interfaces"


const Presentation: React.FC = () => {
	const navigate = useNavigate()
	const { isLoading } = useNavigationLoader()

	const setting = useLocalStorageItem("settings", {}) as ISetting


	return isLoading ? (
		<Spinner />
	) : (
		<div className="flex flex-col h-screen justify-around">
			<div className="flex flex-row mb-4 mr-8 ml-8 max-h-40 text-white-100 flex-wrap justify-center">
				<DBMaster />
				<Projects />
				{
					setting.viewFinancial &&
					<FinancialReports />
				}
				<div
					className="text-white-100 bg-black-100 rounded bg-slate-500 p-3 m-1 mt-3 h-48 min-h-full w-60 card"
					onClick={() => navigate('/app/accManager')}
				>
					<div className="indent-3 flex items-center text-white-100 bg-black-100 h-fit   mt-3">
						<Icon
							icon="material-symbols:admin-panel-settings-outline"
							width="22"
							height="22"
							inline={true}
						/>
						<p>Admin</p>
					</div>
					<div>
						<p className="text-base pt-3 pl-0">
							<i>Manage users, add new ones, delete them and more</i>
						</p>
					</div>
				</div>
			</div>
			<div className="text-center p-4 bg-slate-800">
				<Link
					to="/app/tickets"
					className="text-2xl text-white-50 hover:text-blue-500 transition duration-600 ease-in-out inline-flex items-center"
				>
					<Icon icon="fontisto:comments" className="mr-2" />
					Feedback Welcomed! Share Your Ideas or Report an Issue.
				</Link>
			</div>
		</div>
	)
}

export default Presentation
