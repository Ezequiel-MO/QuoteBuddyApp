import { Spinner } from 'src/components/atoms'
import { FC } from 'react'

export const LoginHeader: FC<{ withSpinner: boolean }> = ({ withSpinner }) => (
	<>
		<h1 className="font-black text-4xl capitalize">
			Login to <span className="text-primary">APP</span>
		</h1>
		{withSpinner && <Spinner />}
	</>
)
