import { FC } from 'react'
import { Field, FieldArray, FormikProps } from 'formik'
import { FieldArrayRenderProps } from 'formik/dist/FieldArray'

interface ArrayFieldFormProps {
	formikProps: FormikProps<any>
	name: string
}

function camelCaseToTitleCase(text: string): string {
	let result: string = text.replace(/([A-Z])/g, ' $1')
	let finalResult: string = result.charAt(0).toUpperCase() + result.slice(1)
	return finalResult
}

export const ArrayFieldForm: FC<ArrayFieldFormProps> = ({
	formikProps,
	name
}) => {
	const { values } = formikProps
	const arrayValues = values[name]

	return (
		<FieldArray name={name}>
			{({ remove, push }: FieldArrayRenderProps) => (
				<div>
					<label className="text-xl" htmlFor={name}>
						{camelCaseToTitleCase(name)}
					</label>
					{arrayValues.length > 0 &&
						arrayValues.map((_: any, index: number) => (
							<div className="grid grid-cols-3 gap-2 mb-2" key={index}>
								<Field
									name={`${name}.${index}.title`}
									placeholder="Title"
									type="text"
									className="rounded-lg border-gray-300 p-2 col-span-2 text-black-50"
								/>
								<button
									type="button"
									onClick={() => remove(index)}
									className="mt-2 px-4 py-2 bg-red-500 text-white-0 rounded-lg"
								>
									Remove
								</button>
								<Field
									name={`${name}.${index}.description`}
									placeholder="Description"
									type="text"
									className="rounded-lg border-gray-300 p-2 col-span-2 text-black-50"
								/>
							</div>
						))}
					<button
						type="button"
						onClick={() => push({ title: '', description: '' })}
						className="mt-2 px-4 py-2 bg-green-500 text-white-0 rounded-lg"
					>
						Add
					</button>
				</div>
			)}
		</FieldArray>
	)
}
