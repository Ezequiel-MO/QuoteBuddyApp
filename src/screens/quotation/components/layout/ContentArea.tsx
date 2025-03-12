import React, { useRef, useEffect } from 'react'
import { useQuotation } from '../../context/QuotationContext'
import OverviewSection from '../content/OverviewSection'
import ScheduleSection from '../content/ScheduleSection'
import HotelsSection from '../content/HotelsSection'
import TransfersSection from '../content/TransferSection'
import BudgetSection from '../content/BudgetSection'

const ContentArea: React.FC = () => {
	const {
		registerSectionRef,
		isSidebarOpen,
		currentProject,
		setActiveSection,
		isMapVisible
	} = useQuotation()

	// References to each section
	const overviewRef = useRef<HTMLDivElement>(null)
	const scheduleRef = useRef<HTMLDivElement>(null)
	const hotelsRef = useRef<HTMLDivElement>(null)
	const transfersRef = useRef<HTMLDivElement>(null)
	const budgetRef = useRef<HTMLDivElement>(null)

	// Set up intersection observer to detect which section is in view
	useEffect(() => {
		// Register refs with context
		registerSectionRef('overview', overviewRef.current)
		registerSectionRef('schedule', scheduleRef.current)
		registerSectionRef('accommodation', hotelsRef.current)
		registerSectionRef('transfers', transfersRef.current)
		registerSectionRef('budget', budgetRef.current)

		// Set up IntersectionObserver for active section detection
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && entry.target.id) {
						setActiveSection(entry.target.id)
					}
				})
			},
			{
				rootMargin: '-100px 0px -300px 0px',
				threshold: 0.1
			}
		)

		// Observe all section refs
		const sections = [
			overviewRef.current,
			scheduleRef.current,
			hotelsRef.current,
			transfersRef.current,
			budgetRef.current
		]

		sections.forEach((section) => {
			if (section) observer.observe(section)
		})

		return () => {
			sections.forEach((section) => {
				if (section) observer.unobserve(section)
			})
		}
	}, [registerSectionRef, setActiveSection])

	return (
		<main
			className={`
        flex-1 transition-all duration-300 px-4 md:px-6 lg:px-8 py-6
        ${isSidebarOpen ? 'lg:ml-64' : ''}
        ${isMapVisible ? 'mt-4' : ''}
      `}
		>
			<div className="max-w-5xl mx-auto">
				{/* Project Details Section */}
				<section id="overview" ref={overviewRef} className="mb-16">
					<OverviewSection projectDetails={currentProject} />
				</section>

				{/* Schedule Section */}
				<section id="schedule" ref={scheduleRef} className="mb-16">
					<ScheduleSection
						schedule={currentProject?.schedule || []}
						arrivalDay={currentProject?.arrivalDay}
						departureDay={currentProject?.departureDay}
						hideDates={currentProject?.hideDates}
					/>
				</section>

				{/* Hotels Section */}
				<section id="accommodation" ref={hotelsRef} className="mb-16">
					<HotelsSection hotels={currentProject?.hotels || []} />
				</section>

				{/* Transfers Section */}
				<section id="transfers" ref={transfersRef} className="mb-16">
					<TransfersSection />
				</section>

				{/* Budget Section */}
				<section id="budget" ref={budgetRef} className="mb-16">
					<BudgetSection budget={currentProject?.budget} />
				</section>
			</div>
		</main>
	)
}

export default ContentArea
