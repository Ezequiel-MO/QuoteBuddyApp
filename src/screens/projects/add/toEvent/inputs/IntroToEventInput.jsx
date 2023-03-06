export const IntroToEventInput = ({ setIntro, intro }) => {
	return (
		<>
			<textarea
				name="intro"
				rows="10"
				cols="50"
				placeholder="Write an intro to the event"
				value={intro}
				className="border-2 p-2 rounded-xl w-[400px]"
				onChange={(e) => setIntro(e.target.value)}
			/>
		</>
	)
}
