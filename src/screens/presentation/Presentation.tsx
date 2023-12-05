import React from 'react'
import { Icon } from '@iconify/react'
import { Link, useNavigate } from 'react-router-dom'

const Presentation: React.FC = () => {
	const navigate = useNavigate()

	return (
		<div className="flex flex-col h-screen justify-around">
			<div className="flex flex-row mb-4 mr-8 ml-8 max-h-40 text-white-100 flex-wrap justify-center">
				<div
					className="text-white-100 bg-black-100 rounded bg-slate-500 p-3 m-1 mt-3 h-48 min-h-full w-60 card"
					onClick={() => navigate('/app/hotel')}
				>
					<div className="indent-3 flex items-center text-white-100 bg-black-100 h-fit   mt-3">
						<Icon
							icon="bi:database-fill"
							width="22"
							height="22"
							inline={true}
						/>
						<p>DB Master</p>
					</div>
					<div>
						<p className="text-base pt-3 pl-0 ">
							<i>
								Manage all vendors from the Database edit their details,add new
								ones, search them add add them to your project
							</i>
						</p>
					</div>
				</div>
				<div
					className="text-white-100 bg-black-100 rounded bg-slate-500 p-3 m-1 mt-3 h-48 min-h-full w-60 card"
					onClick={() => navigate('/app/project')}
				>
					<div className="indent-3 flex items-center text-white-100 bg-black-100 h-fit mt-3">
						<Icon
							icon="material-symbols:cases"
							width="22"
							height="22"
							inline={true}
						/>
						<p>Projects</p>
					</div>
					<div>
						<p className="text-base pt-3 pl-0">
							<i>
								Open a new project, add vendors, prices, dates, notes and more.
								Update the project as you go along
							</i>
						</p>
					</div>
				</div>
				<div
					className="text-white-100 bg-black-100 rounded bg-slate-500 p-3 m-1 mt-3 h-48 min-h-full w-60 card"
					onClick={() => navigate('/app/invoice')}
				>
					<div className="indent-3 flex items-center text-white-100 bg-black-100 h-fit   mt-3">
						<Icon
							icon="fluent-mdl2:financial"
							width="22"
							height="22"
							inline={true}
						/>
						<p>Financial Reports</p>
					</div>
					<div>
						<p className="text-base pt-3 pl-0">
							<i>
								View all your invoices, proformas and sales forecast in one
								place
							</i>
						</p>
					</div>
				</div>
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
