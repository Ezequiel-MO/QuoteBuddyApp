import { useEffect, useState, Dispatch, SetStateAction } from 'react'

/**
 * Represents the basic structure of an item that this hook can process.
 * Each item must have an `_id` property, which can be a string or a number.
 */
type BaseInputItem = {
	_id: string | number
	// Allows for any other properties on the item.
	[key: string]: any
}

/**
 * Represents the structure of an item after transformation by the `useItems` hook.
 * It includes all properties from the original item (`TItem`), and additionally
 * an `id` property that is a copy of the original `_id`.
 *
 * @template TItem - The type of the original input item, extending `BaseInputItem`.
 */
type TransformedItem<TItem extends BaseInputItem> = TItem & { id: TItem['_id'] }

/**
 * Defines the structure of the object returned by the `useItems` hook.
 *
 * @template TInputItem - The type of the original items passed to the hook.
 */
interface UseItemsReturn<TInputItem extends BaseInputItem> {
	/**
	 * The array of transformed items. Each item in this array includes
	 * an `id` property that mirrors its original `_id` property,
	 * in addition to all other original properties.
	 */
	itemsState: TransformedItem<TInputItem>[]
	/**
	 * The React state dispatcher function for `itemsState`.
	 * This allows the consuming component to manually update the list of transformed items,
	 * which can be useful for optimistic updates or direct manipulation by UI libraries (e.g., for D&D).
	 */
	setItems: Dispatch<SetStateAction<TransformedItem<TInputItem>[]>>
}

/**
 * @function useItems
 * @description A custom React hook designed to process an array of items.
 * For each item, it ensures an `id` property exists, making its value identical to the item's `_id` property.
 * This is particularly useful for preparing data for components or libraries (like drag-and-drop libraries)
 * that expect a unique `id` field on each item.
 *
 * The hook manages this transformed list of items in its own state.
 *
 * @template TInputItem - Specifies the type of items in the input array.
 * This type must extend `BaseInputItem`, meaning each item
 * is expected to have an `_id` property (string or number).
 *
 * @param {TInputItem[] | undefined | null} initialItems - The initial array of items to be processed.
 * If `undefined` or `null` is passed, the hook will treat it as an empty array,
 * resulting in `itemsState` being an empty array.
 *
 * @returns {UseItemsReturn<TInputItem>} An object containing:
 * - `itemsState`: The stateful array of transformed items.
 * - `setItems`: The function to update `itemsState`.
 */
export const useItems = <TInputItem extends BaseInputItem>(
	initialItems: TInputItem[] | undefined | null
): UseItemsReturn<TInputItem> => {
	const [itemsState, setItems] = useState<TransformedItem<TInputItem>[]>([])

	useEffect(() => {
		const currentItems = initialItems || []
		const transformedItems = currentItems.map(
			(item) =>
				({
					...item,
					id: item._id
				} as TransformedItem<TInputItem>)
		)

		setItems(transformedItems)
	}, [initialItems])

	return { itemsState, setItems }
}
