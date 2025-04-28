import React from 'react'
import useTabs from './useTabs'
import TabList from './TabList'
import TabContent from '@components/atoms/tabs/TabContent'
import { AnimatePresence, motion } from 'framer-motion' // If available

interface TabbedContentProps<T> {
	items: T[]
	renderItem: (item: T, index: number, isActive: boolean) => React.ReactNode
	type: string
	className?: string
}

const TabbedContent = <T extends { _id?: string; name: string }>({
	items,
	renderItem,
	type,
	className = ''
}: TabbedContentProps<T>) => {
	const { openTab, setOpenTab, tabListItems } = useTabs(items)

	if (items.length === 0) return null

	// Animation variants for tab content (if framer-motion is available)
	const contentVariants = {
		hidden: { opacity: 0, y: 10 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.3, ease: 'easeOut' }
		},
		exit: {
			opacity: 0,
			y: -10,
			transition: { duration: 0.2 }
		}
	}

	const MotionDiv = motion ? motion.div : 'div'

	return (
		<div className={`rounded-lg ${className}`}>
			{/* Tab navigation with animated underline */}
			<div className="mb-4">
				<div className="max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
					<div className="flex flex-wrap">
						{tabListItems.map((tab, index) => (
							<button
								key={tab._id ?? index}
								className={`px-6 py-3 text-sm font-medium transition-all duration-300 whitespace-nowrap relative
                  ${
										openTab === index + 1
											? 'text-orange-500 dark:text-orange-400'
											: 'text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white-0'
									}`}
								onClick={() => setOpenTab(index + 1)}
							>
								{tab.name}
								{/* Animated underline for active tab */}
								<span
									className={`absolute bottom-0 left-0 h-0.5 bg-orange-500 transition-all duration-300
                    ${openTab === index + 1 ? 'w-full' : 'w-0'}`}
								></span>
							</button>
						))}
					</div>
				</div>
			</div>

			{/* Tab content with animation */}
			<div className="bg-white-0 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 p-4">
				<AnimatePresence mode="wait">
					{items.map((item, index) => {
						const isActive = openTab === index + 1
						if (!isActive) return null

						return (
							<MotionDiv
								key={item._id ?? index}
								initial="hidden"
								animate="visible"
								exit="exit"
								variants={contentVariants}
							>
								<TabContent isActive={isActive}>
									{renderItem(item, index, isActive)}
								</TabContent>
							</MotionDiv>
						)
					})}
				</AnimatePresence>
			</div>
		</div>
	)
}

export default TabbedContent
