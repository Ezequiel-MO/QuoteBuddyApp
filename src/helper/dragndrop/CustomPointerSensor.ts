import { PointerSensor } from '@dnd-kit/core'

class CustomPointerSensor extends PointerSensor {
	static activators = [
		{
			eventName: 'onPointerDown' as const,
			handler: ({ nativeEvent }: any) => {
				// Ignore clicks on elements with the 'no-drag' class
				return !nativeEvent.target.closest('.no-drag')
			}
		}
	]
}

export default CustomPointerSensor
