import { useState } from 'react'
import DemoRequestModal from '@components/atoms/modal/DemoRequestModal'
import { Icon } from '@iconify/react'
import DemoRequestForm from './components/request-demo/DemoRequestForm'
import { submitDemoRequest } from '@services/demoRequest'

interface DemoRequestData {
	email: string
	explanation: string
}

const Footer = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)

	const toggleModal = () => setIsModalOpen((prev) => !prev)

	return (
		<footer
			id="help-support"
			className="my-8 mx-4 md:mx-8 p-6 rounded-xl bg-white-0 dark:bg-gray-800 text-gray-700 dark:text-gray-200 shadow-md transition-colors duration-200"
		>
			{/* Demo Request Banner */}
			<div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border-l-4 border-orange-500 dark:border-orange-400 shadow-sm">
				<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
					<div>
						<h3 className="text-lg font-bold text-orange-700 dark:text-orange-300">
							Want this powerful quote builder for your company?
						</h3>
						<p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
							QUOTE/Buddy is available as a standalone service for your
							business. Win more pitches with professional automated quotes.
						</p>
					</div>
					<button
						onClick={toggleModal}
						className="inline-flex items-center bg-orange-600 hover:bg-orange-700 text-white-0 px-4 py-2 rounded-md transition-colors duration-200 no-underline whitespace-nowrap"
					>
						<Icon icon="mdi:email-outline" className="mr-2" />
						Contact for Demo
					</button>
				</div>
			</div>

			<div className="flex flex-col md:flex-row gap-6">
				{/* Social Links Section */}
				<div className="flex md:flex-col gap-4 md:basis-1/5">
					<h6 className="hidden md:block text-sm font-semibold uppercase tracking-wider mb-2 dark:text-gray-300">
						Connect With Us
					</h6>
					<div className="flex gap-4 md:gap-6">
						<SocialLink
							href="https://www.linkedin.com/company/335093/admin/feed/posts/"
							icon="akar-icons:linkedin-fill"
							label="LinkedIn"
							colorClass="hover:text-blue-600 dark:hover:text-blue-400"
						/>
						<SocialLink
							href="https://www.instagram.com/cutt.events/"
							icon="akar-icons:instagram-fill"
							label="Instagram"
							colorClass="hover:text-pink-500 dark:hover:text-pink-400"
						/>
						<SocialLink
							href="https://www.facebook.com/cutt.events/"
							icon="akar-icons:facebook-fill"
							label="Facebook"
							colorClass="hover:text-blue-800 dark:hover:text-blue-600"
						/>
					</div>
				</div>

				{/* Info Section */}
				<div className="flex-1 space-y-4">
					<div className="border-b border-gray-200 dark:border-gray-700 pb-3">
						<div className="flex flex-wrap items-center gap-2 mb-2">
							<h6 className="text-sm font-medium tracking-wide dark:text-gray-300">
								PROPOSED BY: <span className="font-bold">CUTT/events</span>
							</h6>
							<span className="text-xs px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded-full">
								Powered by QUOTE/Buddy
							</span>
						</div>
						<div className="text-xs text-gray-500 dark:text-gray-400">
							<p>DESIGNED BY @ QUOTE/Buddy - 2025</p>
						</div>
					</div>

					<AboutQuotationSection />
				</div>
			</div>

			{/* Footer Bottom Section */}
			<div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 dark:text-gray-400">
				<p>© 2025 QUOTE/Buddy. All rights reserved.</p>
				<div className="mt-2 md:mt-0 flex items-center gap-4">
					<p>
						<a
							href="#help-section"
							className="text-blue-600 dark:text-blue-400 hover:underline"
						>
							Help Center
						</a>
					</p>
					<button
						onClick={toggleModal}
						className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
					>
						<Icon icon="mdi:email-outline" className="inline" />
						Contact Us
					</button>
				</div>
			</div>

			{/* Demo Request Modal */}
			<DemoRequestModal
				isOpen={isModalOpen}
				onClose={toggleModal}
				title="Request a QUOTE/Buddy Demo"
			>
				<DemoRequestForm
					onSubmit={async (data: DemoRequestData) => {
						try {
							await submitDemoRequest(data)
							toggleModal()
						} catch (error) {
							console.error('Demo request submission failed:', error)
						}
					}}
				/>
			</DemoRequestModal>
		</footer>
	)
}

// Internal Components
const SocialLink = ({
	href,
	icon,
	label,
	colorClass
}: {
	href: string
	icon: string
	label: string
	colorClass: string
}) => (
	<a
		href={href}
		target="_blank"
		rel="noopener noreferrer"
		aria-label={label}
		className="hover:scale-110 transition-transform duration-200"
	>
		<Icon
			icon={icon}
			width="28"
			className={`text-gray-500 dark:text-gray-400 ${colorClass}`}
		/>
	</a>
)

const AboutQuotationSection = () => (
	<div>
		<h6 className="text-sm font-medium uppercase tracking-wide mb-3 dark:text-gray-300">
			ABOUT THIS QUOTATION
		</h6>
		<div className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
			<p className="italic">
				<span className="font-semibold">
					Introducing your tailor-made quotation,{' '}
				</span>
				<span className="font-light">
					meticulously crafted by the innovators at{' '}
				</span>
				<a
					href="https://www.quotebuddy.eu"
					className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
					target="_blank"
					rel="noopener noreferrer"
				>
					QUOTE/Buddy
				</a>
				<span className="font-light">
					! We're not just a tech startup; we're the{' '}
				</span>
				<span className="font-semibold text-green-600 dark:text-green-400">
					game-changers
				</span>
				<span className="font-light">
					{' '}
					revolutionizing how <span className="font-bold">DMC</span>s deliver
					quotes.{' '}
				</span>
				<span className="font-semibold">
					Say goodbye to the old ways and hello to automated RFP responses.
				</span>
				<span className="font-light">
					{' '}
					But wait, there's more! We're relentlessly fine-tuning to make this
					your go-to solution.{' '}
				</span>
			</p>
		</div>
	</div>
)

export default Footer
