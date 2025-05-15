import React, { useState } from 'react'
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

const AboutUsEnhanced: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [message, setMessage] = useState('')
	const sectionVariants = {
		hidden: { opacity: 0, y: 50 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6, ease: 'easeOut' }
		}
	}
	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: (i: number) => ({
			opacity: 1,
			y: 0,
			transition: { delay: i * 0.15, duration: 0.5, ease: 'easeOut' }
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

	return (
		<div className="font-body bg-white-0 dark:bg-black-50 text-gray-800 dark:text-white-100">
			{/* Hero Section (from original) */}
			<motion.section
				className="relative h-[70vh] min-h-[500px] flex items-center justify-center text-center text-white-0 bg-cover bg-center"
				style={{ backgroundImage: `url(${heroBackground})` }}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1 }}
			>
				<div className="absolute inset-0 bg-black-50 bg-opacity-50 dark:bg-opacity-70"></div>
				<motion.div
					className="relative z-10 p-4 md:p-8"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.5, duration: 0.8 }}
				>
					<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 animate-fade-in">
						Creating Unforgettable Experiences
					</h1>
					<p className="text-lg sm:text-xl md:text-2xl animate-fade-in animation-delay-300">
						Discover Spain & Portugal's hidden treasures with our bespoke
						corporate events.
					</p>
				</motion.div>
			</motion.section>

			{/* Introduction / Who We Are (from original, slightly restyled for consistency) */}
			<motion.section
				className="py-16 md:py-24 container mx-auto px-4"
				variants={sectionVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.3 }}
			>
				<h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-cutt-orange">
					Your Corporate Events Agency in Europe
				</h2>
				<div className="text-lg md:text-xl text-center max-w-3xl mx-auto text-gray-700 dark:text-gray-50 space-y-6">
					<p>
						We are an agency specialized in organizing unforgettable events and
						experiences for corporate and business groups in Europe. Whether
						you're planning a team-building meeting, a conference, or an
						incentive trip, we have the experience, creativity, and local
						knowledge to make it happen.
					</p>
					<p>
						Our team of professionals works closely with you to understand your
						company's culture, objectives, and budget, designing customized
						programs that foster teamwork, inspire innovation, and enhance
						productivity. We take care of every detail, ensuring a seamless,
						stress-free experience.
					</p>
				</div>
			</motion.section>

			{/* Mission & Vision Section (from original, slightly restyled) */}
			<motion.section
				className="py-16 md:py-24 bg-white-100 dark:bg-black-50/60"
				variants={sectionVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.3 }}
			>
				<div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-start">
					<motion.div
						variants={itemVariants}
						custom={0}
						className="p-6 bg-white dark:bg-gray-800/50 rounded-lg shadow-xl"
					>
						<h3 className="text-2xl md:text-3xl font-semibold mb-4 text-primary dark:text-cutt-orange flex items-center">
							<Icon
								icon="mdi:target-arrow"
								className="mr-3 text-3xl text-cutt-orange"
							/>{' '}
							Our Mission
						</h3>
						<p className="text-gray-700 dark:text-gray-50">
							To provide unparalleled event management services that exceed our
							clients' expectations, focusing on delivering unique and
							meticulously crafted corporate events. We strive to be the top
							choice for companies seeking exceptional MICE solutions in Spain
							and beyond, combining local expertise with an international
							perspective.
						</p>
					</motion.div>
					<motion.div
						variants={itemVariants}
						custom={1}
						className="p-6 bg-white dark:bg-gray-800/50 rounded-lg shadow-xl"
					>
						<h3 className="text-2xl md:text-3xl font-semibold mb-4 text-primary dark:text-cutt-orange flex items-center">
							<Icon
								icon="mdi:binoculars"
								className="mr-3 text-3xl text-cutt-orange"
							/>{' '}
							Our Vision
						</h3>
						<p className="text-gray-700 dark:text-gray-50">
							To become a leading and trusted partner for corporate events and
							incentives across Europe, known for our adaptability, creative
							solutions, and exceptional network. Our goal is to be a go-to
							provider worldwide, leveraging our extensive knowledge, commitment
							to excellence, and proven ability to manage events of any scale.
						</p>
					</motion.div>
				</div>
			</motion.section>

			{/* Meet Our Team Section */}
			<motion.section
				className="py-16 md:py-24 container mx-auto px-4"
				variants={sectionVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.2 }}
			>
				<h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-cutt-orange">
					Our Team, Your Team
				</h2>
				<div className="text-lg text-gray-700 dark:text-white-50 mb-12 text-center max-w-3xl mx-auto">
					<p className="mb-4">
						Meet the CUTT/events team – an interdisciplinary, flexible, and
						perfectly complementary group of individuals. With diverse
						backgrounds and skill sets, our team is uniquely equipped to handle
						any challenge and bring innovative solutions to every project. From
						event planning and production to design and marketing, we have the
						expertise and creativity to make your vision a reality.
					</p>
					<p>
						Trust our team to deliver exceptional results and unforgettable
						experiences for your corporate events!
					</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
					{teamData.map((member, index) => (
						<motion.div
							key={member.name}
							className="flex flex-col bg-white dark:bg-gray-800/70 rounded-xl shadow-2xl overflow-hidden hover:shadow-cutt-orange/30 transition-all duration-300 ease-in-out transform hover:-translate-y-2 animate-slide-in-up"
							variants={itemVariants}
							custom={index}
						>
							<div className="relative pt-[75%]">
								<img
									src={`${member.imageFileName}`}
									alt={member.name}
									className="absolute top-0 left-0 w-full h-full object-cover"
								/>
							</div>
							<div className="p-6 flex flex-col flex-grow">
								<h4 className="text-2xl font-bold text-primary dark:text-cutt-sand mb-1">
									{member.name}
								</h4>
								<p className="text-cutt-orange dark:text-secondary text-md font-semibold mb-4">
									{member.role}
								</p>
								<p className="text-gray-600 dark:text-gray-100 text-sm leading-relaxed flex-grow">
									{member.bio}
								</p>
							</div>
						</motion.div>
					))}
				</div>
			</motion.section>

			{/* Core Values Section (from original, slightly restyled) */}
			<motion.section
				className="py-16 md:py-24 bg-white-100 dark:bg-black-50/60"
				variants={sectionVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.2 }}
			>
				<div className="container mx-auto px-4">
					<h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-cutt-orange">
						Our Core Values
					</h2>
					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
						{[
							{
								icon: 'mdi:star-circle-outline',
								title: 'Excellence',
								description: 'Ensuring quality and precision in every event.'
							},
							{
								icon: 'mdi:account-group-outline',
								title: 'Collaboration',
								description:
									'Fostering strong relationships with trusted providers.'
							},
							{
								icon: 'mdi:lightbulb-on-outline',
								title: 'Innovation',
								description:
									'Bringing fresh ideas to meet evolving client needs.'
							},
							{
								icon: 'mdi:handshake-outline',
								title: 'Commitment',
								description:
									'Exceeding client expectations with dedication and detail.'
							},
							{
								icon: 'mdi:earth',
								title: 'Global Perspective',
								description: 'Combining global reach with local expertise.'
							},
							{
								icon: 'mdi:map-marker-outline',
								title: 'Local Expertise',
								description: 'Bringing an authentic touch to each destination.'
							}
						].map((value, index) => (
							<motion.div
								key={value.title}
								className="p-6 bg-white-0 dark:bg-gray-800/50 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
								variants={itemVariants}
								custom={index}
							>
								<Icon
									icon={value.icon}
									className="text-4xl text-cutt-orange mb-4"
								/>
								<h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white-0">
									{value.title}
								</h4>
								<p className="text-gray-600 dark:text-gray-100">
									{value.description}
								</p>
							</motion.div>
						))}
					</div>
				</div>
			</motion.section>

			{/* What We Do / Our Services Section (from original, slightly restyled) */}
			<motion.section
				className="py-16 md:py-24 bg-white-0 dark:bg-black-50"
				variants={sectionVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.2 }}
			>
				<div className="container mx-auto px-4">
					<h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-cutt-orange">
						What We Do
					</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
						{[
							{
								img: meetingsCongressesImg,
								title: 'Meetings & Congresses',
								description:
									'Transforming corporate gatherings into inspiring and influential events.'
							},
							{
								img: teambuildingActivitiesImg,
								title: 'Teambuilding Activities',
								description:
									'Creating experiences that forge unity and propel your company to success.'
							},
							{
								img: incentiveProgrammesImg,
								title: 'Incentive Programmes',
								description:
									'Spectacular incentive trips that elevate motivation and performance.'
							},
							{
								img: eventsImg,
								title: 'Events',
								description:
									'Event planning designed to align with your company’s stature and ambition.'
							}
						].map((service, index) => (
							<motion.div
								key={service.title}
								className="bg-white dark:bg-gray-900 rounded-lg shadow-xl overflow-hidden group transform hover:scale-105 transition-transform duration-300"
								variants={itemVariants}
								custom={index}
							>
								<img
									src={service.img}
									alt={service.title}
									className="w-full h-56 object-cover"
								/>
								<div className="p-6">
									<h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white-0">
										{service.title}
									</h4>
									<p className="text-gray-600 dark:text-gray-100 text-sm">
										{service.description}
									</p>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</motion.section>

			{/* Why Choose Us Section (from original, slightly restyled) */}
			<motion.section
				className="py-16 md:py-24 bg-white-100 dark:bg-black-50/60"
				variants={sectionVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.3 }}
			>
				<div className="container mx-auto px-4">
					<h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-cutt-orange">
						Why Choose CUTT/events?
					</h2>
					<div className="grid md:grid-cols-2 gap-12 items-center">
						<motion.div variants={itemVariants} custom={0}>
							<img
								src={LEO}
								alt="Successful Event in Spain"
								className="rounded-lg shadow-xl w-full h-auto max-h-[400px] object-cover"
							/>
						</motion.div>
						<motion.div
							variants={itemVariants}
							custom={1}
							className="space-y-6 text-gray-700 dark:text-gray-50"
						>
							<div className="flex items-start p-4 bg-white dark:bg-gray-800/50 rounded-md shadow-lg">
								<Icon
									icon="mdi:check-circle-outline"
									className="text-2xl text-secondary mr-3 mt-1 flex-shrink-0"
								/>
								<p>
									<strong className="text-gray-800 dark:text-white-0">
										Expertise & Creativity:
									</strong>{' '}
									We combine local knowledge with innovative ideas to create
									truly unique events.
								</p>
							</div>
							<div className="flex items-start p-4 bg-white dark:bg-gray-800/50 rounded-md shadow-lg">
								<Icon
									icon="mdi:check-circle-outline"
									className="text-2xl text-secondary mr-3 mt-1 flex-shrink-0"
								/>
								<p>
									<strong className="text-gray-800 dark:text-white-0">
										Attention to Detail:
									</strong>{' '}
									From planning to execution, we meticulously manage every
									aspect of your event.
								</p>
							</div>
							<div className="flex items-start p-4 bg-white dark:bg-gray-800/50 rounded-md shadow-lg">
								<Icon
									icon="mdi:check-circle-outline"
									className="text-2xl text-secondary mr-3 mt-1 flex-shrink-0"
								/>
								<p>
									<strong className="text-gray-800 dark:text-white-0">
										Tailored Solutions:
									</strong>{' '}
									Custom programs designed to meet your specific objectives and
									budget.
								</p>
							</div>
							<div className="flex items-start p-4 bg-white dark:bg-gray-800/50 rounded-md shadow-lg">
								<Icon
									icon="mdi:check-circle-outline"
									className="text-2xl text-secondary mr-3 mt-1 flex-shrink-0"
								/>
								<p>
									<strong className="text-gray-800 dark:text-white-0">
										Unforgettable Destinations:
									</strong>{' '}
									Access to the best venues and experiences in Spain, Portugal,
									and beyond.
								</p>
							</div>
						</motion.div>
					</div>
				</div>
			</motion.section>

			{/* Call to Action Section (from original, slightly restyled) */}
			<motion.section
				className="py-20 md:py-32 text-center bg-primary dark:bg-liberty-blue text-black-50 dark:text-white-0"
				variants={sectionVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.5 }}
			>
				<div className="container mx-auto px-4">
					<h2 className="text-3xl md:text-4xl font-bold mb-6">
						Ready to Plan Your Next Event?
					</h2>
					<p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
						Contact us today to start planning your next corporate or business
						event in Spain, Portugal, or beyond. Let's create something
						unforgettable together!
					</p>
					<motion.button
						onClick={() => setIsModalOpen(true)}
						className="inline-block bg-cutt-orange hover:bg-orange-500 text-white-0 font-bold py-4 px-10 rounded-lg text-lg transition-colors duration-300 animate-pulse-subtle shadow-xl hover:shadow-cutt-orange/50"
						whileHover={{
							scale: 1.05,
							boxShadow: '0 10px 20px rgba(234, 89, 51, 0.4)'
						}}
						whileTap={{ scale: 0.95 }}
					>
						Get in Touch
					</motion.button>
					<p className="mt-6 text-sm text-white-50 dark:text-blue-200">
						Or email us directly at: hola@cutt.events
					</p>
				</div>
			</motion.section>
			{isModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
					<div className="bg-white-0 dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
						<h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white-0">
							Send us a message
						</h3>
						<textarea
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							placeholder="Type your message here..."
							className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-cutt-orange text-black-50"
						/>
						<div className="flex justify-end space-x-3">
							<button
								onClick={() => setIsModalOpen(false)}
								className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
							>
								Cancel
							</button>
							<button
								onClick={handleSubmit}
								className="px-4 py-2 bg-cutt-orange text-white rounded hover:bg-orange-600"
							>
								Send
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default AboutUsEnhanced
