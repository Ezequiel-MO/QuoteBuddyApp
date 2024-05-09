import { useState, FC } from 'react'
import { IInvoiceBreakdownLine } from '@interfaces/invoice' // Adjust the path as per your project structure
import { DisplayLine, EditLine } from '..'

interface Props {
	line: IInvoiceBreakdownLine
}

const BreakdownLine: FC<Props> = ({ line }) => {
	const [isEditing, setIsEditing] = useState<boolean>(false)
	let listContent

	if (isEditing) {
		listContent = <EditLine line={line} setIsEditing={setIsEditing} />
	} else {
		listContent = <DisplayLine line={line} setIsEditing={setIsEditing} />
	}

	return <>{listContent}</>
}

export default BreakdownLine
