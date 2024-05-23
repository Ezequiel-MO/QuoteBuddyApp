import { format, parseISO, isSameYear } from 'date-fns'
import { IProject } from '@interfaces/project'
import accounting from 'accounting'
import { useApiFetch } from 'src/hooks/fetchData'
import { IInvoice } from '@interfaces/invoice'

export const SalesForecast: React.FC = () => {
	const { data: projects } = useApiFetch<IProject[]>('projects')
	const { data: invoices } = useApiFetch<IInvoice[]>('invoices')
	const year = new Date().getFullYear()
	let yearlyTotal = 0

	const months = Array.from({ length: 12 }, (_, i) => {
		const monthProjects = projects.filter(
			(p) =>
				isSameYear(parseISO(p.arrivalDay), new Date(year, 0, 1)) &&
				new Date(p.arrivalDay).getMonth() === i &&
				(p.status === 'Confirmed' || p.status === 'Invoiced')
		)

		const monthlyTotal = monthProjects.reduce((acc, proj) => {
			if (proj.status === 'Invoiced') {
				const projectInvoices = invoices.filter(
					(inv) => inv.projectCode === proj.code
				)
				const invoiceTotal = projectInvoices.reduce(
					(sum, inv) => sum + inv.lineAmount,
					0
				)
				return acc + invoiceTotal
			} else if (proj.status === 'Confirmed') {
				return acc + proj.estimate
			}
			return acc
		}, 0)

		yearlyTotal += monthlyTotal

		return {
			name: format(new Date(year, i, 1), 'MMMM'),
			projects: monthProjects,
			total: monthlyTotal,
			invoices: invoices.filter((inv) =>
				monthProjects.some((proj) => proj.code === inv.projectCode)
			)
		}
	})

	return (
		<div className="p-6 bg-slate-800 shadow-lg rounded-lg">
			<h1 className="text-2xl font-bold mb-5">{year} Sales Forecast</h1>
			{months.map(({ name, projects, total, invoices }) => (
				<div key={name} className="mb-8">
					<h2 className="text-xl font-semibold mb-3">{name}</h2>
					{projects.length === 0 ? (
						<p className="text-gray-500 italic">
							... no projects confirmed or invoiced yet for {name}...
						</p>
					) : (
						<ul className="list-disc pl-5">
							{projects.map((proj) => (
								<li key={proj._id} className="mb-2 text-gray-300">
									<span className="font-medium">
										{proj.code} - {proj.groupName}
									</span>
									<span className="block text-sm text-gray-400">
										{proj.groupLocation} | {proj.arrivalDay} -{' '}
										{proj.departureDay} | Pax: {proj.nrPax} |{' '}
										{proj.status === 'Confirmed' ? 'Estimate' : 'Invoiced'}:
										{proj.status === 'Confirmed'
											? accounting.formatMoney(proj.estimate, ' EUR ')
											: accounting.formatMoney(
													invoices
														.filter((inv) => inv.projectCode === proj.code)
														.reduce((sum, inv) => sum + inv.lineAmount, 0),
													' EUR '
											  )}
									</span>
								</li>
							))}
							{invoices.map((inv) => (
								<li key={inv._id} className="mb-2 text-gray-300">
									<span className="font-medium">
										Invoice: {inv.invoiceNumber} - {inv.lineText}
									</span>
									<span className="block text-sm text-gray-400">
										{format(parseISO(inv.date), 'yyyy-MM-dd')} | Amount:{' '}
										{accounting.formatMoney(inv.lineAmount, ' EUR ')}
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

export default SalesForecast
