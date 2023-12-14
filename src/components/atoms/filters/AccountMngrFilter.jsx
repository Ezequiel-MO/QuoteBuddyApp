import { useFetchAccManagers } from 'src/hooks/fetchData/useFetchAccManagers'

export const AccountMngrFilter = ({ setAccountManager, accountManagerID }) => {
	const { accManagers } = useFetchAccManagers()

	return (
		<div className="w-full max-w-lg my-2 ml-0 mr-0">
			<form>
				<div className="flex items-center gap-8">
					<label className="text-xl text-gray-100" htmlFor="accMngr">
						... by Acc. Manager
					</label>
					<select
						id="accMngr"
						className="flex-1 py-1 px-2 border-0 rounded-xl bg-green-50 text-center cursor-pointer"
						value={accountManagerID}
						onChange={(e) => setAccountManager(e.target.value)}
					>
						<option value="">--- Select an Acc. Manager ---</option>
						{accManagers.map((option) => (
							<option
								key={option._id}
								value={option._id}
							>{`--- ${option.firstName} ${option.email} ---`}</option>
						))}
					</select>
				</div>
			</form>
		</div>
	)
}
