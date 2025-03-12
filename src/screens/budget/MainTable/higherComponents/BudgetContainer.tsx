interface BudgetContainerProps {
	children: React.ReactNode
}

export const BudgetContainer = ({ children }: BudgetContainerProps) => (
	<div className="overflow-x-auto relative mb-10 z-[200] text-black-50">
		{children}
	</div>
)
