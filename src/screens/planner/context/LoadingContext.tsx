import React, { createContext, useContext, useState, ReactNode } from 'react'

// Define types for loading operations
export type LoadingOperation =
	| 'createItem'
	| 'updateItem'
	| 'deleteItem'
	| 'createOption'
	| 'updateOption'
	| 'deleteOption'
	| 'createComment'
	| 'loadItems'

// Context interface
interface LoadingContextType {
	isLoading: (operation: LoadingOperation) => boolean
	startLoading: (operation: LoadingOperation) => void
	stopLoading: (operation: LoadingOperation) => void
}

// Create the context with default values
const LoadingContext = createContext<LoadingContextType>({
	isLoading: () => false,
	startLoading: () => {},
	stopLoading: () => {}
})

// Provider component
interface LoadingProviderProps {
	children: ReactNode
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({
	children
}) => {
	// Use a Set to track which operations are loading
	const [loadingOperations, setLoadingOperations] = useState<
		Set<LoadingOperation>
	>(new Set())

	// Check if a specific operation is loading
	const isLoading = (operation: LoadingOperation): boolean => {
		return loadingOperations.has(operation)
	}

	// Start loading for an operation
	const startLoading = (operation: LoadingOperation): void => {
		setLoadingOperations((prev) => {
			const newSet = new Set(prev)
			newSet.add(operation)
			return newSet
		})
	}

	// Stop loading for an operation
	const stopLoading = (operation: LoadingOperation): void => {
		setLoadingOperations((prev) => {
			const newSet = new Set(prev)
			newSet.delete(operation)
			return newSet
		})
	}

	return (
		<LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
			{children}
		</LoadingContext.Provider>
	)
}

// Custom hook for using the loading context
export const useLoading = (): LoadingContextType => {
	const context = useContext(LoadingContext)

	if (context === undefined) {
		throw new Error('useLoading must be used within a LoadingProvider')
	}

	return context
}
