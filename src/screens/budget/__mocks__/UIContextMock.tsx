// src/screens/budget/__mocks__/UIContextMock.tsx
import React, { PropsWithChildren } from 'react'
import { UIContext } from '../context/UIContext'

interface MockUIProviderProps extends PropsWithChildren {
	showActionIcons?: boolean
}

export const MockUIProvider: React.FC<MockUIProviderProps> = ({
	children,
	showActionIcons = false
}) => {
	const value = {
		showActionIcons
	}

	return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}

// This helper is used to wrap components in tests
export const withMockUIProvider = (
	component: React.ReactNode,
	showActionIcons = false
) => {
	return (
		<MockUIProvider showActionIcons={showActionIcons}>
			{component}
		</MockUIProvider>
	)
}
