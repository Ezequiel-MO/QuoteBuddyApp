import React, { FC } from 'react'
import { LanguageSelector } from "./LanguageSelector"
import { RichTextEditor } from "src/components/molecules"
import lenguagesJson from "src/constants/languages.json"
interface DescriptionFormProps {
    descriptionsByLanguage: object[]
    setDescriptionsByLanguage: React.Dispatch<React.SetStateAction<object[]>>
    setData: React.Dispatch<React.SetStateAction<any>>
    data: any //
}

export const DescriptionForm: FC<DescriptionFormProps> = ({
    descriptionsByLanguage,
    setDescriptionsByLanguage,
    data,//
    setData
}) => {

    // Función para agregar una nueva "description" al estado.
    const addDescription = () => {
        const newExperience = {}
        setDescriptionsByLanguage([...descriptionsByLanguage, newExperience]);
    }

    // Función para manejar la eliminación de una "description" específica.
    const removeDescription = (index: number) => {
        const updatedExperiences = descriptionsByLanguage.filter((_, idx) => idx !== index);
        setDescriptionsByLanguage(updatedExperiences);
    };

    // handle para RichTextEditor.
    const handleRichTextEditor = (text:string, index:number) => {
        console.log("handle rich en descriptions")
        const updated = descriptionsByLanguage.map((el, idIndex) => {
            if (idIndex === index) {
                return { ...el, [Object.keys(el)[0]]: text }
            }
            return el
        })
        setDescriptionsByLanguage(updated);
    }

    const nameCountryByCode = (code:string) => {
        const country = lenguagesJson.find(el => el.code === code)
        return country?.name
    }

    return (
        <div>
            {
                descriptionsByLanguage.map((el:any, index) => (
                    <div key={index} className='mt-4'>
                        <label className="block uppercase text-lg text-gray-400 font-medium mb-4 ">
                            <hr />
                            {
                                Object.keys(el).length > 0 &&
                                `description ( ${nameCountryByCode(Object.keys(el)[0])} )`
                            }
                        </label>
                        <LanguageSelector
                            index={index}
                            descriptionsByLanguage={descriptionsByLanguage}
                            setDescriptionsByLanguage={setDescriptionsByLanguage}
                            setData={setData}
                        />
                        {
                            Object.keys(el).length > 0 &&
                            <div className='mt-4'>
                                <RichTextEditor
                                    textContent={el[Object.keys(el)[0]]}
                                    setTextContent={(text:string) => handleRichTextEditor(text, index)}
                                    update={false} // 
                                    screen={{}} // 
                                    keyScreen='' //
                                    style={{ width: '102%', marginBottom: '50px' }}
                                />
                            </div>
                        }
                        <button
                            type="button"
                            className=' text-red-400 hover:text-red-600 ml-96 mt-2'
                            onClick={() => removeDescription(index)}
                        >
                            Delete Description
                        </button>
                    </div>
                ))
            }
            <button
                type="button"
                className=' text-green-300 hover:text-green-500'
                onClick={addDescription}
            >
                + Add Description
            </button>
        </div>
    )
}