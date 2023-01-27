import { useState } from 'react'
import { DisplayLine, EditLine } from '../'

export const BreakdownLine = ({ line }) => {
	const [isEditing, setIsEditing] = useState(false)
	let listContent

	if (isEditing) {
		listContent = <EditLine line={line} setIsEditing={setIsEditing} />
	} else {
		listContent = <DisplayLine line={line} setIsEditing={setIsEditing} />
	}

	return <>{listContent}</>
}
