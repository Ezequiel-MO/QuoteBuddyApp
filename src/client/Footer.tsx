import { Icon } from '@iconify/react'

const Footer = () => {
	return (
		<div className="h-64 m-8 p-4 overflow-hidden text-white bg-black rounded-lg flex items-start">
			<div className="flex flex-col basis-1/4 space-y-4">
				<a
					href="https://www.linkedin.com/company/335093/admin/feed/posts/"
					target="_blank"
					rel="noopener noreferrer"
					className="hover:text-blue-600"
				>
					<Icon icon="akar-icons:linkedin-fill" width="30" color="#ccc" />
				</a>
				<a
					href="https://www.instagram.com/cutt.events/"
					target="_blank"
					rel="noopener noreferrer"
					className="hover:text-pink-500"
				>
					<Icon icon="akar-icons:instagram-fill" width="30" color="#ccc" />
				</a>
				<a
					href="https://www.facebook.com/cutt.events/"
					target="_blank"
					rel="noopener noreferrer"
					className="hover:text-blue-800"
				>
					<Icon icon="akar-icons:facebook-fill" width="30" color="#ccc" />
				</a>
			</div>
			<div className="flex flex-col items-start ml-8">
				<h6 className="text-sm tracking-widest mb-1">
					PROPOSED BY: <span className="font-bold">CUTT/events</span>
				</h6>
				<h6 className="text-sm uppercase tracking-widest mb-1">DESIGNED BY</h6>
				<p className="text-sm">@ QUOTE/Buddy - 2024</p>
				<h6 className="text-sm uppercase tracking-widest mt-4 mb-1">
					ABOUT THIS QUOTATION
				</h6>
				<div className="text-sm text-white">
					<p className="italic">
						<span className="font-semibold">
							Introducing your tailor-made quotation,{' '}
						</span>
						<span className="font-light">
							meticulously crafted by the innovators at{' '}
						</span>
						<a
							href="https://www.quotebuddy.eu"
							className="font-bold text-blue-500 text-lg cursor-pointer"
							target="_blank"
						>
							QUOTE/Buddy
						</a>
						<span className="font-light">
							! We're not just a tech startup; we're the{' '}
						</span>
						<span className="font-semibold text-green-500">game-changers</span>
						<span className="font-light">
							{' '}
							revolutionizing how <span className="font-bold">DMC</span>s
							deliver quotes.{' '}
						</span>
						<span className="font-semibold">
							Say goodbye to the old ways and hello to automated RFP responses.
						</span>
						<span className="font-light">
							{' '}
							But wait, there's more! We're relentlessly fine-tuning to make
							this your go-to solution.{' '}
						</span>
						<span className="font-semibold">Ready to join the revolution?</span>
						<span className="font-light"> Reach out to us at </span>
						<a
							href="mailto:oliverm316@gmail.com"
							className="text-blue-400 underline"
						>
							oliverm316@gmail.com
						</a>
						<span className="font-light">
							{' '}
							and let's elevate your client experience together!
						</span>
					</p>
				</div>
			</div>
		</div>
	)
}

export default Footer
