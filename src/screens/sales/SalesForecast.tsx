import { useLoaderData } from 'react-router-dom'
import { format, parseISO, isSameYear } from 'date-fns'
import { IProject } from '@interfaces/project'
import accounting from 'accounting'

export const SalesForecast = () => {
	const projects = useLoaderData() as IProject[]
	const year = 2024
	let yearlyTotal = 0

	const months = Array.from({ length: 12 }, (_, i) => {
		const monthProjects = projects.filter(
			(p) =>
				isSameYear(parseISO(p.arrivalDay), new Date(year, 0, 1)) &&
				new Date(p.arrivalDay).getMonth() === i &&
				p.status === 'Confirmed'
		)

		const monthlyTotal = monthProjects.reduce(
			(acc, proj) => acc + proj.estimate,
			0
		)
		yearlyTotal += monthlyTotal

		return {
			name: format(new Date(year, i, 1), 'MMMM'),
			projects: monthProjects,
			total: monthlyTotal
		}
	})

	return (
		<div className="p-6 bg-white shadow-lg rounded-lg">
			<h1 className="text-2xl font-bold mb-5">2024 Sales Forecast</h1>
			{months.map(({ name, projects, total }) => (
				<div key={name} className="mb-8">
					<h2 className="text-xl font-semibold mb-3">{name}</h2>
					{projects.length === 0 ? (
						<p className="text-gray-500 italic">
							... no projects confirmed yet for {name}...
						</p>
					) : (
						<ul className="list-disc pl-5">
							{projects.map((proj) => (
								<li key={proj._id} className="mb-2 text-gray-600">
									<span className="font-medium">
										{proj.code} - {proj.groupName}
									</span>
									<span className="block text-sm text-gray-500">
										{proj.groupLocation} | {proj.arrivalDay} -{' '}
										{proj.departureDay} | Pax: {proj.nrPax} | Estimate:
										{accounting.formatMoney(proj.estimate, ' EUR ')}
									</span>
								</li>
							))}
							<li className="font-semibold mt-2">
								Monthly Total: {accounting.formatMoney(total, ' EUR ')}
							</li>
						</ul>
					)}
				</div>
			))}
			<div className="font-bold text-lg">
				Yearly Total: {accounting.formatMoney(yearlyTotal, ' EUR ')}
			</div>
		</div>
	)
}
