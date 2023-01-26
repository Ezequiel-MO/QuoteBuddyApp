import { useRef } from 'react'
import ReactToPrint from 'react-to-print'
import { Icon } from '@iconify/react'
import { Invoice } from '../invoice_front_page'

const InvoiceSpecs = () => {
	const componentRef = useRef()

	return (
		<div>
			<ReactToPrint
				trigger={() => (
					<button className="flex flex-row items-center mb-2">
						<span>
							<Icon
								icon="ant-design:file-pdf-twotone"
								color="#ea5933"
								width="40"
							/>
						</span>
						Print the Invoice to a PDF
					</button>
				)}
				content={() => componentRef.current}
			/>
			<Invoice ref={componentRef} />
		</div>
	)
}

export default InvoiceSpecs
