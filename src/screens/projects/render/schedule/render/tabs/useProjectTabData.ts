// src/hooks/useTabData.ts

import { useMemo } from 'react'

interface TabData {
	tab: string
	icon: string
	onClick?: () => void
}

interface UseTabDataProps {
	multiDestination: boolean
	onPreviewClick: () => void
}

export const useProjectTabData = ({
	multiDestination,
	onPreviewClick
}: UseTabDataProps): TabData[] => {
	return useMemo(() => {
		const baseTabs: TabData[] = [
			{ tab: 'Intro Text/Gifts', icon: 'tabler:book' },
			{ tab: 'Transfers IN', icon: 'solar:bus-bold' },
			{ tab: 'Hotels', icon: 'bx:hotel' },
			{ tab: 'Meetings', icon: 'la:handshake-solid' },
			{ tab: 'Transfers OUT', icon: 'solar:bus-bold' },
			{ tab: 'Preview', icon: 'mdi:print-preview', onClick: onPreviewClick }
		]

		if (multiDestination) {
			return [
				...baseTabs.slice(0, 4),
				{ tab: 'Itinerary', icon: 'ph:car' }, // Itinerary replaces Schedule when multiDestination is true
				...baseTabs.slice(4)
			]
		} else {
			return [
				...baseTabs.slice(0, 4),
				{ tab: 'Schedule', icon: 'ph:calendar' }, // Include Schedule when multiDestination is false
				...baseTabs.slice(4)
			]
		}
	}, [multiDestination, onPreviewClick])
}
