// src/hooks/useTabs.ts

import { useState, useMemo } from 'react'

function useTabs<T extends { _id?: string; name: string }>(items: T[]) {
	const [openTab, setOpenTab] = useState<number>(1) // Start from 1

	const tabListItems = useMemo(
		() =>
			items.map((item) => ({
				_id: item._id ?? '',
				name: item.name
			})),
		[items]
	)

	return { openTab, setOpenTab, tabListItems }
}

export default useTabs
