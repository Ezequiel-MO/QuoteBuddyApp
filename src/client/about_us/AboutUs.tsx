import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import heroBackground from '@assets/hero_background.jpg'
import meetingsCongressesImg from '@assets/meetings_congresses.jpg'
import LEO from '@assets/leo.jpg'
import teambuildingActivitiesImg from '@assets/teambuilding_activities.jpg'
import incentiveProgrammesImg from '@assets/incentive_programmes.jpg'
import eventsImg from '@assets/events.jpg'
import andrea from '@assets/andrea.jpg'
import { toast } from 'react-toastify'
import { toastOptions } from '@helper/toast'

const montse =
	'https://cuttevents-app.s3.eu-central-1.amazonaws.com/imageContentUrl-1699457337481.jpg'
const oliver =
	'https://cuttevents-app.s3.eu-central-1.amazonaws.com/imageContentUrl-1681899012609.png'
const minerva =
	'https://cuttevents-app.s3.eu-central-1.amazonaws.com/imageContentUrl-1657288271720.png'
const adriana =
	'https://cuttevents-app.s3.eu-central-1.amazonaws.com/imageContentUrl-1740401859088.jpeg'
const merche =
	'https://cuttevents-app.s3.eu-central-1.amazonaws.com/imageContentUrl-1720015327963.jpeg'

const teamData = [
	{
		name: 'Montse Miranda',
		role: 'Co-founder and Director',
		imageFileName: montse,
		bio: `With an impressive tenure of over three decades immersed in the dynamic world of tourism, Montse Miranda stands as a co-founder and the guiding Director of our company. Her profound expertise is not just a product of time but of a genuine, natural gift for forging meaningful connections with people and astutely understanding their unique needs and aspirations. Montse's journey in the industry saw her based in Valencia for two decades, a period during which she cultivated an intimate knowledge of the region. For more than ten years now, Barcelona has been her home and operational base, allowing her to extend her exceptional understanding of the Iberian Peninsula's rich tapestry of culture, landscapes, and hidden gems. This deep-seated local knowledge, combined with her innate ability to connect, makes Montse an invaluable leader, expertly guiding clients through their next adventure with unparalleled insight and a personal touch that transforms experiences into cherished memories. Her leadership ensures that every client interaction is infused with a deep understanding of their desires, paving the way for truly bespoke and unforgettable journeys.`
	},
	{
		name: 'Oliver Martinez',
		role: 'Owner and Director of Operations',
		imageFileName: oliver,
		bio: `Introducing Oliver Martinez, the esteemed owner and Director of Operations at our company. Oliver's journey into the events industry began with a strong foundation in accounting. However, his visionary leadership soon pivoted towards orchestrating high-end incentive trips and elite conferences, where his true passions and talents lie. Oliver's dedication to excellence and relentless pursuit of innovation are evident in every venture he undertakes. A key aspect of his strategic approach includes the development of proprietary software designed to streamline critical operations, from initial quotes to final invoices. This commitment to technological advancement and operational efficiency underscores his unwavering resolve to elevate the company's stature within the competitive luxury events domain. Clients can experience the brilliance of Oliver's strategic thinking and his commitment to delivering flawlessly executed, memorable events.`
	},
	{
		name: 'Minerva Martinez',
		role: 'Key Client Director and Licensed Architect',
		imageFileName: minerva,
		bio: `Meet Minerva Martinez, our Key Client Director and a licensed architect, bringing a unique blend of design expertise and client management acumen to the team. With a decade of experience as a construction manager for residential buildings, Minerva possesses a strong foundation in project execution and attention to detail. Thirteen years ago, she transitioned her skills into the dynamic field of event production and corporate program management. Her background in construction, combined with her outstanding organizational skills and meticulous attention to detail, makes her the perfect individual to meet the needs of our most discerning clients. Minerva is dedicated to understanding client visions and transforming them into flawlessly executed corporate events, ensuring each experience is elevated to new heights of sophistication and impact. Rely on Minerva to enhance your corporate events with her professional expertise and creative insight.`
	},
	{
		name: 'Merche Sánchez',
		role: 'Creative Designer',
		imageFileName: merche,
		bio: `Meet Merche, our passionate and creative designer who recently joined the team, bringing a fresh perspective and an innate talent for crafting innovative ideas and unforgettable experiences. Merche excels at identifying the perfect venue to host your corporate event, paying meticulous attention to even the smallest detail to ensure each occasion is truly unique and special. Her creative flair and dedication mean that clients can trust Merche to bring her expertise and creativity to the forefront, transforming their event vision into a spectacular reality. She is committed to ensuring that every event is not only flawlessly executed but also leaves a lasting impression on all attendees.`
	},
	{
		name: 'Andrea Rivas',
		role: 'Freelance Collaborator',
		imageFileName: andrea,
		bio: `Meet Andrea, our freelance collaborator, who brings a wealth of knowledge with a degree in Organizational Communication and a Master’s in Professional Cooking and Gastronomy from Hofmann. A passionate traveler and culinary enthusiast, Andrea infuses a unique blend of creativity and expertise into every project she undertakes. Her profound love for gastronomy means she is adept at recommending the highest-quality venues and the finest culinary experiences, ensuring that every event is a feast for the senses. Andrea’s commitment to originality and her keen eye for detail guarantee that our clients enjoy events that are not only seamless in their execution but also exceptionally memorable. She works diligently to ensure that each client's vision is brought to life with a touch of culinary brilliance and sophisticated organization.`
	},
	{
		name: 'Adriana Martinez',
		role: 'Freelance Collaborator',
		imageFileName: adriana,
		bio: `Bio coming up`
	}
]

// Function to add text formatting to bio paragraphs
const formatBio = (bio: string) => {
	if (!bio || bio === 'Bio coming up')
		return <p className="text-gray-400 italic">Coming soon...</p>

	// Split the bio into sections for more dynamic formatting
	const sentences = bio.split('. ').filter((s) => s.trim() !== '')

	return (
		<div className="space-y-3">
			{sentences.map((sentence, idx) => {
				// Highlight key phrases
				let formattedSentence = sentence

				// Highlight years of experience
				formattedSentence = formattedSentence.replace(
					/(three decades|decade of experience|two decades|ten years|Thirteen years)/gi,
					'<span class="font-semibold text-cutt-orange">$1</span>'
				)

				// Highlight educational credentials
				formattedSentence = formattedSentence.replace(
					/(degree in |Master's in |from Hofmann)/gi,
					'<span class="font-semibold text-liberty-blue dark:text-liberty-gold">$1</span>'
				)

				// Highlight locations
				formattedSentence = formattedSentence.replace(
					/(Valencia|Barcelona|Spain|Portugal|Iberian Peninsula)/gi,
					'<span class="italic font-medium text-liberty-green dark:text-primary">$1</span>'
				)

				// Highlight key skills
				formattedSentence = formattedSentence.replace(
					/(expertise|attention to detail|organizational skills|creative flair|culinary|gastronomy|visionary leadership|innovative|proprietary software)/gi,
					'<span class="font-medium underline decoration-cutt-orange decoration-dotted underline-offset-2">$1</span>'
				)

				// Apply different styling based on position in text
				if (idx === 0) {
					return (
						<p
							key={idx}
							className="text-gray-800 dark:text-white-0 leading-relaxed"
							dangerouslySetInnerHTML={{ __html: formattedSentence + '.' }}
						/>
					)
				} else if (idx === sentences.length - 1) {
					return (
						<p
							key={idx}
							className="text-gray-700 dark:text-gray-100 leading-relaxed font-medium"
							dangerouslySetInnerHTML={{ __html: formattedSentence + '.' }}
						/>
					)
				} else {
					return (
						<p
							key={idx}
							className="text-gray-600 dark:text-gray-200 leading-relaxed"
							dangerouslySetInnerHTML={{ __html: formattedSentence + '.' }}
						/>
					)
				}
			})}
		</div>
	)
}

const AboutUs: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [message, setMessage] = useState('')
	const [activeTeamMember, setActiveTeamMember] = useState(null)
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const [scrollPosition, setScrollPosition] = useState(0)
	const [isNavSticky, setIsNavSticky] = useState(false)

	// Parallax effect for hero section
	useEffect(() => {
		const handleScroll = () => {
			setScrollPosition(window.scrollY)
			setIsNavSticky(window.scrollY > 100)
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const sectionVariants = {
		hidden: { opacity: 0, y: 50 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.8, ease: 'easeOut' }
		}
	}

	const itemVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: (i: number) => ({
			opacity: 1,
			y: 0,
			transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' }
		})
	}

	const handleSubmit = () => {
		if (message.trim()) {
			toast.success(
				'Your message has been sent to hola@cutt.events!',
				toastOptions
			)
			setMessage('')
			setIsModalOpen(false)
		}
	}

	// Quick navigation for sections
	const navLinks = [
		{ name: 'About', href: '#about' },
		{ name: 'Mission', href: '#mission' },
		{ name: 'Team', href: '#team' },
		{ name: 'Values', href: '#values' },
		{ name: 'Services', href: '#services' },
		{ name: 'Why Us', href: '#why-us' },
		{ name: 'Contact', href: '#contact' }
	]

	return (
		<div className="font-body bg-white-0 dark:bg-black-50 text-gray-800 dark:text-white-100">
			<nav
				className={`${
					isNavSticky
						? 'fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white-0/90 dark:bg-black-50/90 shadow-lg transition-all duration-300'
						: 'fixed top-0 left-0 right-0 z-50 bg-black-50/80 backdrop-blur-sm'
				}`}
			>
				<div className="container mx-auto px-4">
					<div className="flex items-center justify-between py-4">
						<div className="flex items-center space-x-2">
							<span
								className={`font-bold text-xl ${
									isNavSticky ? 'text-cutt-orange' : 'text-cutt-orange'
								}`}
							>
								CUTT
							</span>
							<span
								className={`font-light text-xl ${
									isNavSticky
										? 'text-black-50 dark:text-white-0'
										: 'text-white-0'
								}`}
							>
								/events
							</span>
						</div>

						{/* Mobile menu button */}
						<div className="md:hidden">
							<button
								onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
								className="text-white-0 hover:text-cutt-orange focus:outline-none"
							>
								<Icon
									icon={mobileMenuOpen ? 'mdi:close' : 'mdi:menu'}
									className="text-2xl"
								/>
							</button>
						</div>

						{/* Desktop navigation */}
						<div className="hidden md:flex items-center space-x-6">
							{navLinks.map((link) => (
								<a
									key={link.name}
									href={link.href}
									className={`text-sm uppercase tracking-wider font-medium hover:text-cutt-orange transition-colors duration-200 ${
										isNavSticky
											? 'text-black-50 dark:text-white-0'
											: 'text-white-0'
									}`}
								>
									{link.name}
								</a>
							))}
						</div>
					</div>
				</div>

				{/* Mobile navigation menu */}
				{mobileMenuOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.3 }}
						className="md:hidden bg-black-50/95 backdrop-blur-md"
					>
						<div className="container mx-auto px-4 py-4">
							<div className="flex flex-col space-y-4">
								{navLinks.map((link) => (
									<a
										key={link.name}
										href={link.href}
										onClick={() => setMobileMenuOpen(false)}
										className="text-white-0 text-base uppercase tracking-wide font-medium hover:text-cutt-orange transition-colors duration-200 py-2 border-b border-white-0/10"
									>
										{link.name}
									</a>
								))}
							</div>
						</div>
					</motion.div>
				)}
			</nav>

			{/* Hero Section with Parallax */}
			<motion.section
				id="about"
				className="relative h-screen min-h-[700px] flex items-center justify-center text-center text-white-0 bg-cover bg-center overflow-hidden"
				style={{
					backgroundImage: `url(${heroBackground})`,
					backgroundPositionY: `${scrollPosition * 0.5}px`
				}}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1.2 }}
			>
				<div className="absolute inset-0 bg-gradient-to-b from-black-50/60 via-black-50/40 to-black-50/70 dark:from-black-50/80 dark:via-black-50/60 dark:to-black-50/80"></div>

				<motion.div
					className="relative z-10 p-6 md:p-12 max-w-4xl mx-auto"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.5, duration: 1 }}
				>
					<div className="mb-6">
						<motion.div
							className="inline-block px-4 py-1 rounded-full bg-cutt-orange/80 text-white-0 text-sm font-medium mb-4"
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ delay: 1, duration: 0.5, type: 'spring' }}
						>
							Corporate Events Agency
						</motion.div>
					</div>

					<h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight leading-tight">
						<motion.span
							className="block text-white-0"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.7, duration: 0.8 }}
						>
							Creating
						</motion.span>
						<motion.span
							className="block text-cutt-orange"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.9, duration: 0.8 }}
						>
							Unforgettable
						</motion.span>
						<motion.span
							className="block text-white-0"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 1.1, duration: 0.8 }}
						>
							Experiences
						</motion.span>
					</h1>

					<motion.p
						className="text-xl sm:text-2xl md:text-3xl text-white-0/90 max-w-3xl mx-auto mb-10 leading-relaxed"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 1.4, duration: 1 }}
					>
						Discover Spain & Portugal's hidden treasures with our bespoke
						corporate events.
					</motion.p>
				</motion.div>

				{/* Decorative floating elements */}
				<motion.div
					className="absolute top-1/4 left-1/4 w-16 h-16 bg-cutt-orange/30 backdrop-blur-md rounded-full"
					animate={{
						y: [0, -20, 0],
						opacity: [0.3, 0.7, 0.3]
					}}
					transition={{
						repeat: Infinity,
						duration: 4,
						ease: 'easeInOut'
					}}
				/>

				<motion.div
					className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-white-0/20 backdrop-blur-md rounded-full"
					animate={{
						y: [0, 30, 0],
						opacity: [0.2, 0.5, 0.2]
					}}
					transition={{
						repeat: Infinity,
						duration: 5,
						ease: 'easeInOut',
						delay: 1
					}}
				/>

				<motion.div
					className="absolute bottom-1/4 left-1/3 w-12 h-12 bg-liberty-blue/30 backdrop-blur-md rounded-full"
					animate={{
						y: [0, -15, 0],
						opacity: [0.3, 0.6, 0.3]
					}}
					transition={{
						repeat: Infinity,
						duration: 3.5,
						ease: 'easeInOut',
						delay: 0.5
					}}
				/>

				<div className="absolute bottom-8 left-0 right-0 flex justify-center">
					<motion.div
						animate={{
							y: [0, 10, 0]
						}}
						transition={{
							repeat: Infinity,
							duration: 1.5,
							ease: 'easeInOut'
						}}
					>
						<a href="#about-intro" className="flex flex-col items-center">
							<span className="text-white-0/70 text-sm mb-2">Scroll Down</span>
							<Icon icon="mdi:chevron-down" className="text-white-0 text-2xl" />
						</a>
					</motion.div>
				</div>
			</motion.section>

			{/* Introduction / Who We Are */}
			<motion.section
				id="about-intro"
				className="py-24 md:py-32 container mx-auto px-4 relative overflow-hidden"
				variants={sectionVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.2 }}
			>
				{/* Background decorations */}
				<div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-cutt-orange/5 blur-3xl"></div>
				<div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-liberty-blue/5 blur-3xl"></div>

				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					whileInView={{ opacity: 1, scale: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="mb-12 text-center"
				>
					<span className="inline-block px-3 py-1 rounded-full bg-white-100 dark:bg-gray-800 text-cutt-orange dark:text-cutt-orange text-sm font-medium tracking-wide mb-3">
						ABOUT US
					</span>
					<h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-black-50 dark:text-white-0">
						Your <span className="text-cutt-orange">Corporate Events</span>{' '}
						Agency in Europe
					</h2>
					<div className="w-24 h-1 bg-cutt-orange mx-auto mb-10"></div>
				</motion.div>

				<div className="grid md:grid-cols-2 gap-12 items-center">
					<motion.div className="relative" variants={itemVariants} custom={0}>
						<div className="absolute inset-0 bg-gradient-to-br from-cutt-orange to-liberty-blue opacity-20 rounded-2xl transform rotate-3"></div>
						<div className="absolute inset-0 bg-gradient-to-tr from-liberty-gold to-liberty-green opacity-20 rounded-2xl transform -rotate-2"></div>
						<div className="bg-white-100 dark:bg-gray-800/50 p-8 md:p-10 rounded-2xl shadow-xl relative z-10">
							<div className="flex items-center mb-6">
								<div className="w-12 h-12 flex items-center justify-center bg-cutt-orange/10 rounded-full mr-4">
									<Icon icon="mdi:flag" className="text-2xl text-cutt-orange" />
								</div>
								<h3 className="text-2xl font-bold text-black-50 dark:text-white-0">
									Who We Are
								</h3>
							</div>
							<div className="prose prose-lg dark:prose-invert">
								<p className="text-lg leading-relaxed text-gray-700 dark:text-gray-200 mb-4">
									We are an agency{' '}
									<span className="font-semibold text-cutt-orange">
										specialized in organizing unforgettable events
									</span>{' '}
									and experiences for corporate and business groups in Europe.
									Whether you're planning a team-building meeting, a conference,
									or an incentive trip, we have the experience, creativity, and
									local knowledge to make it happen.
								</p>
								<p className="text-lg leading-relaxed text-gray-700 dark:text-gray-200">
									Our team of professionals works closely with you to understand
									your company's{' '}
									<span className="italic font-medium text-liberty-green dark:text-primary">
										culture, objectives, and budget
									</span>
									, designing customized programs that foster teamwork, inspire
									innovation, and enhance productivity.
								</p>
							</div>
						</div>
					</motion.div>

					<motion.div className="space-y-6" variants={itemVariants} custom={1}>
						<div className="relative">
							<div className="absolute -top-3 -left-3 bg-cutt-orange w-16 h-16 rounded-lg opacity-20"></div>
							<div className="relative z-10 bg-white-0 dark:bg-gray-800/50 p-6 rounded-lg shadow-lg border-l-4 border-cutt-orange">
								<h4 className="font-semibold text-xl mb-2 text-black-50 dark:text-white-0">
									Corporate Excellence
								</h4>
								<p className="text-gray-600 dark:text-gray-300">
									We take pride in delivering exceptional corporate events
									tailored to your specific needs, ensuring a seamless and
									memorable experience for all participants.
								</p>
							</div>
						</div>

						<div className="relative">
							<div className="absolute -top-3 -left-3 bg-liberty-blue w-16 h-16 rounded-lg opacity-20"></div>
							<div className="relative z-10 bg-white-0 dark:bg-gray-800/50 p-6 rounded-lg shadow-lg border-l-4 border-liberty-blue">
								<h4 className="font-semibold text-xl mb-2 text-black-50 dark:text-white-0">
									Local Expertise
								</h4>
								<p className="text-gray-600 dark:text-gray-300">
									Our deep knowledge of Spain and Portugal allows us to offer
									unique experiences and hidden gems that go beyond typical
									tourist attractions.
								</p>
							</div>
						</div>

						<div className="relative">
							<div className="absolute -top-3 -left-3 bg-liberty-green w-16 h-16 rounded-lg opacity-20"></div>
							<div className="relative z-10 bg-white-0 dark:bg-gray-800/50 p-6 rounded-lg shadow-lg border-l-4 border-liberty-green">
								<h4 className="font-semibold text-xl mb-2 text-black-50 dark:text-white-0">
									Creative Solutions
								</h4>
								<p className="text-gray-600 dark:text-gray-300">
									We transform ordinary events into extraordinary experiences
									through creative thinking and innovative approaches tailored
									to your goals.
								</p>
							</div>
						</div>
					</motion.div>
				</div>
			</motion.section>

			{/* Mission & Vision Section */}
			<motion.section
				className="py-24 md:py-32 relative overflow-hidden bg-white-100 dark:bg-black-50/60"
				id="mission"
				variants={sectionVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.3 }}
			>
				{/* Background decorations */}
				<div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-liberty-blue/10 blur-3xl"></div>
				<div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-cutt-orange/10 blur-3xl"></div>

				<div className="container mx-auto px-4 relative z-10">
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="mb-16 text-center"
					>
						<span className="inline-block px-3 py-1 rounded-full bg-white-100 dark:bg-gray-800 text-cutt-orange dark:text-cutt-orange text-sm font-medium tracking-wide mb-3">
							OUR PURPOSE
						</span>
						<h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-black-50 dark:text-white-0">
							Mission & <span className="text-cutt-orange">Vision</span>
						</h2>
						<div className="w-24 h-1 bg-cutt-orange mx-auto mb-10"></div>
						<p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-200 text-lg">
							Guiding principles that drive our passion for creating exceptional
							corporate events.
						</p>
					</motion.div>

					<div className="grid md:grid-cols-2 gap-12 items-stretch">
						<motion.div
							variants={itemVariants}
							custom={0}
							className="relative group"
							whileHover={{ y: -5, transition: { duration: 0.3 } }}
						>
							<div className="absolute inset-0 bg-gradient-to-br from-cutt-orange to-liberty-blue opacity-10 rounded-2xl transform rotate-3 group-hover:rotate-1 transition-transform duration-300"></div>
							<div className="absolute inset-0 bg-gradient-to-tr from-liberty-gold to-cutt-orange opacity-10 rounded-2xl transform -rotate-1 group-hover:rotate-0 transition-transform duration-300"></div>

							<div className="bg-white-0 dark:bg-gray-800/70 p-8 md:p-10 rounded-2xl shadow-xl relative z-10 h-full flex flex-col">
								<div className="flex items-center mb-6">
									<div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-cutt-orange to-liberty-blue rounded-full mr-4 shadow-lg">
										<Icon
											icon="mdi:target-arrow"
											className="text-3xl text-white-0"
										/>
									</div>
									<h3 className="text-3xl font-bold text-black-50 dark:text-white-0">
										Our Mission
									</h3>
								</div>

								<div className="prose prose-lg dark:prose-invert flex-grow">
									<p className="text-lg leading-relaxed text-gray-700 dark:text-gray-200">
										To provide{' '}
										<span className="font-semibold text-cutt-orange">
											unparalleled event management services
										</span>{' '}
										that exceed our clients' expectations, focusing on
										delivering unique and meticulously crafted corporate events.
										We strive to be the top choice for companies seeking
										exceptional{' '}
										<span className="italic font-medium text-liberty-green dark:text-primary">
											MICE solutions in Spain and beyond
										</span>
										, combining local expertise with an international
										perspective.
									</p>
								</div>

								<div className="mt-6 w-12 h-1 bg-cutt-orange opacity-70 group-hover:w-20 transition-all duration-300"></div>
							</div>
						</motion.div>

						<motion.div
							variants={itemVariants}
							custom={1}
							className="relative group"
							whileHover={{ y: -5, transition: { duration: 0.3 } }}
						>
							<div className="absolute inset-0 bg-gradient-to-br from-liberty-blue to-liberty-green opacity-10 rounded-2xl transform rotate-3 group-hover:rotate-1 transition-transform duration-300"></div>
							<div className="absolute inset-0 bg-gradient-to-tr from-cutt-orange to-liberty-blue opacity-10 rounded-2xl transform -rotate-1 group-hover:rotate-0 transition-transform duration-300"></div>

							<div className="bg-white-0 dark:bg-gray-800/70 p-8 md:p-10 rounded-2xl shadow-xl relative z-10 h-full flex flex-col">
								<div className="flex items-center mb-6">
									<div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-liberty-blue to-liberty-green rounded-full mr-4 shadow-lg">
										<Icon
											icon="mdi:binoculars"
											className="text-3xl text-white-0"
										/>
									</div>
									<h3 className="text-3xl font-bold text-black-50 dark:text-white-0">
										Our Vision
									</h3>
								</div>

								<div className="prose prose-lg dark:prose-invert flex-grow">
									<p className="text-lg leading-relaxed text-gray-700 dark:text-gray-200">
										To become a{' '}
										<span className="font-semibold text-liberty-blue dark:text-liberty-gold">
											leading and trusted partner
										</span>{' '}
										for corporate events and incentives across Europe, known for
										our adaptability, creative solutions, and exceptional
										network. Our goal is to be a go-to provider worldwide,
										leveraging our{' '}
										<span className="font-medium underline decoration-cutt-orange decoration-dotted underline-offset-2">
											extensive knowledge, commitment to excellence
										</span>
										, and proven ability to manage events of any scale.
									</p>
								</div>

								<div className="mt-6 w-12 h-1 bg-liberty-blue dark:bg-liberty-gold opacity-70 group-hover:w-20 transition-all duration-300"></div>
							</div>
						</motion.div>
					</div>
				</div>
			</motion.section>

			{/* Meet Our Team Section - Refactored */}
			<motion.section
				className="py-20 md:py-32 relative overflow-hidden bg-white-100 dark:bg-black-50/60"
				id="team"
				variants={sectionVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.2 }}
			>
				{/* Background decorations */}
				<div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-cutt-orange/10 blur-3xl"></div>
				<div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-liberty-blue/10 blur-3xl"></div>
				<div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-liberty-green/10 blur-3xl"></div>

				<div className="container mx-auto px-4 relative z-10">
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="mb-16 text-center"
					>
						<span className="inline-block px-3 py-1 rounded-full bg-white-100 dark:bg-gray-800 text-cutt-orange dark:text-cutt-orange text-sm font-medium tracking-wide mb-3">
							OUR TEAM
						</span>
						<h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-black-50 dark:text-white-0">
							Meet Our <span className="text-cutt-orange">Visionaries</span>
						</h2>
						<div className="w-24 h-1 bg-cutt-orange mx-auto mb-10"></div>
						<p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-200 text-lg">
							Our interdisciplinary team combines diverse expertise and
							creativity to deliver unforgettable corporate experiences.
						</p>
					</motion.div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
						{teamData.map((member, index) => (
							<motion.div
								key={member.name}
								className="relative group flex flex-col bg-white-0 dark:bg-gray-800/90 rounded-xl shadow-xl overflow-hidden"
								variants={itemVariants}
								custom={index}
								whileHover={{ y: -5, transition: { duration: 0.3 } }}
							>
								{/* Decorative gradients */}
								<div className="absolute inset-0 bg-gradient-to-br from-cutt-orange to-liberty-blue opacity-10 rounded-xl transform rotate-2 group-hover:rotate-1 transition-transform duration-300"></div>
								<div className="absolute inset-0 bg-gradient-to-tr from-liberty-gold to-liberty-green opacity-10 rounded-xl transform -rotate-1 group-hover:rotate-0 transition-transform duration-300"></div>

								<div className="relative z-10 flex flex-col h-full">
									<div className="relative pt-[56.25%]">
										<img
											src={member.imageFileName}
											alt={member.name}
											className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black-50/60 to-transparent"></div>
										<div className="absolute bottom-4 left-4 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-cutt-orange to-liberty-blue shadow-lg group-hover:scale-110 transition-transform duration-300">
											<Icon
												icon="mdi:account"
												className="text-2xl text-white-0"
											/>
										</div>
									</div>
									<div className="p-6 flex flex-col flex-grow">
										<h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-white-0">
											{member.name}
										</h4>
										<p className="text-cutt-orange dark:text-cutt-orange text-sm font-semibold mb-4">
											{member.role}
										</p>
										<div className="text-sm text-gray-600 dark:text-gray-200 flex-grow">
											{formatBio(member.bio)}
										</div>
										<div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
											<div className="w-10 h-1 bg-cutt-orange"></div>
										</div>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</motion.section>

			{/* Core Values Section */}
			<motion.section
				className="py-20 md:py-32 relative overflow-hidden bg-white-100 dark:bg-black-50/60"
				variants={sectionVariants}
				id="values"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.2 }}
			>
				{/* Background decorations */}
				<div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-cutt-orange/10 blur-3xl"></div>
				<div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-liberty-blue/10 blur-3xl"></div>
				<div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-liberty-green/10 blur-3xl"></div>

				<div className="container mx-auto px-4 relative z-10">
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="mb-16 text-center"
					>
						<span className="inline-block px-3 py-1 rounded-full bg-white-100 dark:bg-gray-800 text-cutt-orange dark:text-cutt-orange text-sm font-medium tracking-wide mb-3">
							OUR PRINCIPLES
						</span>
						<h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-black-50 dark:text-white-0">
							Core <span className="text-cutt-orange">Values</span> That Drive
							Us
						</h2>
						<div className="w-24 h-1 bg-cutt-orange mx-auto mb-6"></div>
						<p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-200 text-lg">
							These principles guide everything we do and ensure we deliver
							exceptional experiences for our clients.
						</p>
					</motion.div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
						{[
							{
								icon: 'mdi:star-circle-outline',
								title: 'Excellence',
								description:
									'Ensuring quality and precision in every event, with meticulous attention to detail that elevates every experience.',
								color: 'from-cutt-orange to-red-500'
							},
							{
								icon: 'mdi:account-group-outline',
								title: 'Collaboration',
								description:
									'Fostering strong relationships with trusted providers to create seamless and exceptional experiences.',
								color: 'from-liberty-blue to-blue-600'
							},
							{
								icon: 'mdi:lightbulb-on-outline',
								title: 'Innovation',
								description:
									'Bringing fresh ideas to meet evolving client needs, constantly pushing boundaries to create unique events.',
								color: 'from-yellow-500 to-yellow-300'
							},
							{
								icon: 'mdi:handshake-outline',
								title: 'Commitment',
								description:
									'Exceeding client expectations with dedication and focus on even the smallest details that make events memorable.',
								color: 'from-liberty-green to-green-400'
							},
							{
								icon: 'mdi:earth',
								title: 'Global Perspective',
								description:
									'Combining global reach with local expertise to create experiences that resonate across cultural boundaries.',
								color: 'from-purple-600 to-indigo-500'
							},
							{
								icon: 'mdi:map-marker-outline',
								title: 'Local Expertise',
								description:
									'Bringing an authentic touch to each destination, showcasing hidden gems and unique cultural experiences.',
								color: 'from-pink-500 to-rose-400'
							}
						].map((value, index) => (
							<motion.div
								key={value.title}
								className="relative group"
								variants={itemVariants}
								custom={index}
								whileHover={{ y: -5, transition: { duration: 0.3 } }}
							>
								<div className="absolute inset-0 bg-gradient-to-br rounded-xl transform rotate-2 group-hover:rotate-1 transition-transform duration-300"></div>
								<div
									className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-10 rounded-xl transform -rotate-1 group-hover:rotate-0 transition-transform duration-300`}
								></div>

								<div className="p-8 bg-white-0 dark:bg-gray-800/90 rounded-xl shadow-xl relative z-10 h-full flex flex-col">
									<div
										className={`w-16 h-16 rounded-full bg-gradient-to-br ${value.color} flex items-center justify-center mb-6 transform transition-transform group-hover:scale-110 duration-300`}
									>
										<Icon icon={value.icon} className="text-3xl text-white-0" />
									</div>

									<h4 className="text-xl font-bold mb-4 text-gray-900 dark:text-white-0">
										{value.title}
									</h4>

									<p className="text-gray-600 dark:text-gray-200 flex-grow">
										{value.description}
									</p>

									<div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
										<div className="w-10 h-1 bg-cutt-orange"></div>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</motion.section>

			{/* What We Do / Our Services Section */}
			<motion.section
				className="py-20 md:py-32 relative bg-white-100 dark:bg-black-50/60"
				id="services"
				variants={sectionVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.3 }}
			>
				{/* Background decorations */}
				<div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-cutt-orange/10 blur-3xl"></div>
				<div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-liberty-blue/10 blur-3xl"></div>
				<div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-liberty-green/10 blur-3xl"></div>

				<div className="container mx-auto px-4 relative z-10">
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="mb-16 text-center"
					>
						<span className="inline-block px-3 py-1 rounded-full bg-white-100 dark:bg-gray-800 text-cutt-orange dark:text-cutt-orange text-sm font-medium tracking-wide mb-3">
							OUR SERVICES
						</span>
						<h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-black-50 dark:text-white-0">
							What We <span className="text-cutt-orange">Do</span>
						</h2>
						<div className="w-24 h-1 bg-cutt-orange mx-auto mb-10"></div>
						<p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-200 text-lg">
							Discover our tailored services designed to create extraordinary
							corporate experiences.
						</p>
					</motion.div>

					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
						{[
							{
								img: meetingsCongressesImg,
								title: 'Meetings & Congresses',
								description:
									'Transforming corporate gatherings into inspiring and influential events.',
								icon: 'mdi:account-group',
								gradient: 'from-cutt-orange to-red-500'
							},
							{
								img: teambuildingActivitiesImg,
								title: 'Teambuilding Activities',
								description:
									'Creating experiences that forge unity and propel your company to success.',
								icon: 'mdi:handshake',
								gradient: 'from-liberty-blue to-blue-600'
							},
							{
								img: incentiveProgrammesImg,
								title: 'Incentive Programmes',
								description:
									'Spectacular incentive trips that elevate motivation and performance.',
								icon: 'mdi:star',
								gradient: 'from-yellow-500 to-yellow-300'
							},
							{
								img: eventsImg,
								title: 'Events',
								description:
									'Event planning designed to align with your company’s stature and ambition.',
								icon: 'mdi:calendar-star',
								gradient: 'from-liberty-green to-green-400'
							}
						].map((service, index) => (
							<motion.div
								key={service.title}
								className="relative group"
								variants={itemVariants}
								custom={index}
								whileHover={{ y: -5, transition: { duration: 0.3 } }}
							>
								<div className="absolute inset-0 bg-gradient-to-br rounded-xl transform rotate-2 group-hover:rotate-1 transition-transform duration-300"></div>
								<div
									className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-10 rounded-xl transform -rotate-1 group-hover:rotate-0 transition-transform duration-300`}
								></div>

								<div className="bg-white-0 dark:bg-gray-800/90 rounded-xl shadow-xl relative z-10 overflow-hidden flex flex-col h-full">
									<div className="relative pt-[56.25%]">
										<img
											src={service.img}
											alt={service.title}
											className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black-50/60 to-transparent"></div>
										<div className="absolute bottom-4 left-4 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${service.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300">
											<Icon
												icon={service.icon}
												className="text-2xl text-white-0"
											/>
										</div>
									</div>
									<div className="p-6 flex flex-col flex-grow">
										<h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-white-0">
											{service.title}
										</h4>
										<p className="text-gray-600 dark:text-gray-200 text-sm flex-grow">
											{service.description}
										</p>
										<div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
											<div className="w-10 h-1 bg-cutt-orange"></div>
										</div>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</motion.section>

			{/* Why Choose Us Section */}
			<motion.section
				className="py-20 md:py-32 bg-white-100 dark:bg-black-50/60 relative overflow-hidden"
				id="why-us"
				variants={sectionVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.3 }}
			>
				{/* Background decorations */}
				<div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-cutt-orange/5 blur-3xl"></div>
				<div className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-liberty-green/5 blur-3xl"></div>

				<div className="container mx-auto px-4 relative z-10">
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="mb-16 text-center"
					>
						<span className="inline-block px-3 py-1 rounded-full bg-white-100 dark:bg-gray-800 text-cutt-orange dark:text-cutt-orange text-sm font-medium tracking-wide mb-3">
							WHAT SETS US APART
						</span>
						<h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-black-50 dark:text-white-0">
							Why Choose <span className="text-cutt-orange">CUTT/events</span>?
						</h2>
						<div className="w-24 h-1 bg-cutt-orange mx-auto mb-10"></div>
						<p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-200 text-lg">
							We bring unparalleled expertise and creativity to every corporate
							event, ensuring exceptional experiences.
						</p>
					</motion.div>

					<div className="grid md:grid-cols-2 gap-12 items-center">
						<motion.div
							variants={itemVariants}
							custom={0}
							className="relative"
							whileHover={{ scale: 1.02 }}
							transition={{ duration: 0.3 }}
						>
							<div className="absolute inset-0 bg-gradient-to-br from-cutt-orange to-liberty-blue opacity-20 rounded-2xl transform rotate-3"></div>
							<img
								src={LEO}
								alt="Successful Event in Spain"
								className="rounded-xl shadow-xl w-full h-auto max-h-[450px] object-cover relative z-10"
							/>
							<div className="absolute -bottom-4 -right-4 w-24 h-24 bg-cutt-orange/20 backdrop-blur-sm rounded-full"></div>
							<div className="absolute -top-6 -left-6 w-16 h-16 bg-liberty-blue/20 backdrop-blur-sm rounded-full"></div>
						</motion.div>

						<motion.div
							variants={itemVariants}
							custom={1}
							className="space-y-6 text-gray-700 dark:text-gray-50"
						>
							{[
								{
									icon: 'mdi:check-circle-outline',
									title: 'Expertise & Creativity',
									desc: 'We combine local knowledge with innovative ideas to create truly unique events.'
								},
								{
									icon: 'mdi:magnify-scan',
									title: 'Attention to Detail',
									desc: 'From planning to execution, we meticulously manage every aspect of your event.'
								},
								{
									icon: 'mdi:handshake',
									title: 'Tailored Solutions',
									desc: 'Custom programs designed to meet your specific objectives and budget.'
								},
								{
									icon: 'mdi:map-marker-star',
									title: 'Unforgettable Destinations',
									desc: 'Access to the best venues and experiences in Spain, Portugal, and beyond.'
								}
							].map((item, index) => (
								<motion.div
									key={item.title}
									className="flex items-start p-6 bg-white-0 dark:bg-gray-800/70 rounded-lg shadow-lg border-l-4 border-cutt-orange hover:shadow-xl transition-all duration-300"
									whileHover={{
										y: -5,
										boxShadow:
											'0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
									}}
									transition={{ duration: 0.2 }}
								>
									<div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-cutt-orange to-liberty-blue/70 mr-4">
										<Icon icon={item.icon} className="text-2xl text-white-0" />
									</div>
									<div>
										<h4 className="text-xl font-bold mb-2 text-gray-800 dark:text-white-0">
											{item.title}
										</h4>
										<p className="text-gray-600 dark:text-gray-200">
											{item.desc}
										</p>
									</div>
								</motion.div>
							))}
						</motion.div>
					</div>
				</div>
			</motion.section>

			{/* Call to Action Section */}
			<motion.section
				className="py-24 md:py-32 text-center relative overflow-hidden"
				id="contact"
				variants={sectionVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.3 }}
			>
				{/* Background with gradient and elements */}
				<div className="absolute inset-0 bg-gradient-to-br from-liberty-blue via-primary to-liberty-blue/80 dark:from-liberty-blue dark:via-black-50 dark:to-liberty-blue/90"></div>

				{/* Decorative elements */}
				<motion.div
					className="absolute top-20 left-1/4 w-32 h-32 bg-white-0/10 backdrop-blur-sm rounded-full"
					animate={{
						y: [0, -15, 0],
						opacity: [0.3, 0.7, 0.3]
					}}
					transition={{
						repeat: Infinity,
						duration: 5,
						ease: 'easeInOut'
					}}
				/>

				<motion.div
					className="absolute bottom-20 right-1/4 w-24 h-24 bg-cutt-orange/10 backdrop-blur-sm rounded-full"
					animate={{
						y: [0, 20, 0],
						opacity: [0.2, 0.5, 0.2]
					}}
					transition={{
						repeat: Infinity,
						duration: 6,
						ease: 'easeInOut',
						delay: 1
					}}
				/>

				<div className="container mx-auto px-4 relative z-10">
					<motion.div
						variants={{
							hidden: { opacity: 0, y: 30 },
							visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
						}}
					>
						<span className="inline-block px-3 py-1 rounded-full bg-white-0/10 backdrop-blur-sm text-white-0 text-sm font-medium tracking-wide mb-6">
							LET'S WORK TOGETHER
						</span>
						<h2 className="text-4xl md:text-5xl font-bold mb-8 text-white-0">
							Ready to Plan Your{' '}
							<span className="text-cutt-orange">Next Event</span>?
						</h2>
						<p className="text-xl md:text-2xl max-w-2xl mx-auto mb-10 text-white-0/90 leading-relaxed">
							Contact us today to start planning your next corporate or business
							event in Spain, Portugal, or beyond. Let's create something
							unforgettable together!
						</p>

						<div className="flex flex-col sm:flex-row items-center justify-center gap-6 max-w-xl mx-auto mb-10">
							<motion.button
								onClick={() => setIsModalOpen(true)}
								className="w-full sm:w-auto flex bg-cutt-orange hover:bg-orange-500 text-white-0 font-bold py-5 px-10 rounded-xl text-lg transition-all duration-300 shadow-xl hover:shadow-cutt-orange/50 items-center justify-center gap-3"
								whileHover={{
									scale: 1.05,
									boxShadow: '0 10px 25px rgba(234, 89, 51, 0.5)'
								}}
								whileTap={{ scale: 0.97 }}
							>
								<Icon icon="mdi:send" className="text-xl" />
								Get in Touch
							</motion.button>

							<a
								href="mailto:hola@cutt.events"
								className="w-full sm:w-auto inline-block bg-white-0/10 backdrop-blur-sm hover:bg-white-0/20 text-white-0 font-medium py-5 px-10 rounded-xl text-lg transition-all duration-300 border border-white-0/30 flex items-center justify-center gap-3"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Icon icon="mdi:email-outline" className="text-xl" />
								hola@cutt.events
							</a>
						</div>
					</motion.div>

					<motion.div
						className="mt-12 bg-white-0/10 backdrop-blur-md rounded-xl p-8 max-w-4xl mx-auto"
						variants={{
							hidden: { opacity: 0, y: 50 },
							visible: {
								opacity: 1,
								y: 0,
								transition: { delay: 0.3, duration: 0.8 }
							}
						}}
					>
						<div className="grid md:grid-cols-3 gap-8 text-left">
							<div>
								<h4 className="text-xl font-semibold mb-4 text-white-0 flex items-center gap-2">
									<Icon icon="mdi:phone" className="text-cutt-orange" />
									Contact
								</h4>
								<ul className="space-y-3 text-white-0/80">
									<li className="flex items-center gap-2">
										<Icon icon="mdi:email" className="text-sm" />
										hola@cutt.events
									</li>
									<li className="flex items-center gap-2">
										<Icon icon="mdi:phone" className="text-sm" />
										+34 647 801 160
									</li>
								</ul>
							</div>

							<div>
								<h4 className="text-xl font-semibold mb-4 text-white-0 flex items-center gap-2">
									<Icon
										icon="mdi:map-marker"
										className="imageFileName-cutt-orange"
									/>
									Location
								</h4>
								<ul className="space-y-3 text-white-0/80">
									<li className="flex items-center gap-2">
										<Icon icon="mdi:office-building" className="text-sm" />
										Barcelona, Spain
									</li>
									<li>Serving all of Spain & Portugal</li>
								</ul>
							</div>

							<div>
								<h4 className="text-xl font-semibold mb-4 text-white-0 flex items-center gap-2">
									<Icon icon="mdi:link" className="text-cutt-orange" />
									Follow Us
								</h4>
								<div className="flex space-x-4">
									<a
										href="#"
										className="text-white-0 hover:text-cutt-orange transition-colors"
									>
										<Icon icon="mdi:linkedin" className="text-2xl" />
									</a>
									<a
										href="#"
										className="text-white-0 hover:text-cutt-orange transition-colors"
									>
										<Icon icon="mdi:instagram" className="text-2xl" />
									</a>
									<a
										href="#"
										className="text-white-0 hover:text-cutt-orange transition-colors"
									>
										<Icon icon="mdi:facebook" className="text-2xl" />
									</a>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</motion.section>

			{/* Contact Form Modal */}
			{isModalOpen && (
				<motion.div
					className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black-50/50"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<motion.div
						className="bg-white-0 dark:bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md mx-auto border border-cutt-orange/20"
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.9, opacity: 0 }}
						transition={{ type: 'spring', damping: 25 }}
					>
						<div className="flex items-center justify-between mb-6">
							<h3 className="text-2xl font-bold text-gray-800 dark:text-white-0">
								Send us a message
							</h3>
							<button
								onClick={() => setIsModalOpen(false)}
								className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white-0"
							>
								<Icon icon="mdi:close" className="text-2xl" />
							</button>
						</div>

						<div className="mb-6">
							<textarea
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								placeholder="Type your message here..."
								className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 h-36 resize-none focus:outline-none focus:ring-2 focus:ring-cutt-orange text-black-50 dark:text-white-0 dark:bg-gray-700"
							/>
						</div>

						<div className="flex justify-end space-x-3">
							<button
								onClick={() => setIsModalOpen(false)}
								className="px-5 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
							>
								Cancel
							</button>
							<motion.button
								onClick={handleSubmit}
								className="px-5 py-2 bg-cutt-orange text-white-0 rounded-lg hover:bg-orange-600 transition-colors duration-200"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								Send Message
							</motion.button>
						</div>
					</motion.div>
				</motion.div>
			)}
		</div>
	)
}

export default AboutUs
