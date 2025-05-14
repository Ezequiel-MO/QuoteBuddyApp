// EventActivate.tsx
import { Icon } from '@iconify/react'

/**
 * @interface EventActivateProps
 * @description Props for the EventActivate component.
 * This component is typically used within @dnd-kit's `DragOverlay`
 * to display a visual preview of the item currently being dragged.
 *
 * @template TEvent - A generic type for the event object. It must at least include a `name` property.
 * It can also include other properties which might be used for display in the future
 * (e.g., an `iconName` or `itemType` for type-specific icons).
 */
export interface EventActivateProps<
	TEvent extends { name: string; [key: string]: any }
> {
	/**
	 * @property {TEvent} event - The data object for the event or item being dragged.
	 * Requires at least a `name: string` property for display.
	 * Other properties can be included and accessed if needed.
	 */
	event: TEvent
}

/**
 * @function EventActivate
 * @description Renders a visual preview of an event or item during a drag-and-drop operation.
 * This component is intended to be used as a child of `@dnd-kit/core`'s `DragOverlay`.
 * It displays the item's name, a drag icon, and applies styles to make it
 * clear it's an active draggable element.
 *
 * The styling aims for a clean, modern look with good visual feedback:
 * - A distinct background color with opacity.
 * - Rounded corners and a shadow to lift it off the page.
 * - A "grabbing" cursor to indicate drag state.
 * - Clear, legible text for the item's name.
 * - An optional drag handle icon for better affordance.
 *
 * @template TEvent - The type of the event object, constrained to have a `name: string`.
 * @param {EventActivateProps<TEvent>} props - The component's props, containing the `event` data.
 * @returns {JSX.Element | null} The rendered JSX element for the drag preview, or null if no event is provided.
 */
export const EventActivate = <
	TEvent extends { name: string; [key: string]: any }
>({
	event
}: EventActivateProps<TEvent>): JSX.Element | null => {
	// If no event data is provided, render nothing.
	if (!event) {
		return null
	}

	return (
		<div
			className="
        flex items-center gap-x-3 /* Align icon and text, add space between them */
        py-2 px-3 /* Comfortable padding */
        my-1 /* Matches original vertical margin if needed */
        bg-[rgba(17,151,234,0.505)] /* Specific blue background with opacity via Tailwind JIT */
        text-white /* Assuming text-white-0 from original CSS is equivalent to text-white */
        font-bold /* Clear and strong text weight */
        rounded-lg 
        shadow-xl 
        min-w-[180px] /* Minimum width */
        max-w-xs /* Max width to prevent overly long overlays */
        w-auto /* Allow width to adjust to content within min/max */
        border border-transparent /* As per original */
        cursor-grabbing /* Indicates item is being dragged */
        select-none /* Prevent text selection during drag */
        focus:outline-none /* As per original */
      "
			// The role and aria-grabbed attributes enhance accessibility for drag-and-drop elements,
			// though for a purely visual overlay they are less critical than on the source item.
			role="status" // Or "alert", "listitem" depending on context, "status" is generic for feedback
			aria-live="assertive" // To announce to screen readers (if needed, usually parent DndContext handles this)
			aria-label={`Dragging ${event.name}`}
		>
			{/* Drag Handle Icon: Provides a visual cue for draggability. */}
			<Icon
				icon="mdi:drag-variant"
				className="
          text-xl /* Icon size */
          text-white/80 /* Icon color with slight transparency */
          flex-shrink-0 /* Prevent icon from shrinking if name is long */
        "
			/>

			<span className="truncate flex-grow" title={event.name}>
				{event.name}
			</span>
		</div>
	)
}
