import { Spinner } from 'src/components/atoms'
import { FC } from 'react'

export const LoginHeader: FC<{
	withSpinner: boolean
	userType: 'client' | 'agency'
}> = ({ withSpinner, userType }) => (
	<>
		<h1 className="font-black text-4xl capitalize text-secondary">
			Login to <span className="text-primary">APP</span> -
			<span className="capitalize"></span>{' '}
			<span className="uppercase text-tertiary">{userType}</span>
		</h1>
		{withSpinner && <Spinner />}
	</>
)
