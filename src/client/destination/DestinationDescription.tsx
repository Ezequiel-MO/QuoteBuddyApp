import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { ILocation } from '../../interfaces/location'

interface DestinationDescriptionProps {
  locationObj: ILocation
}

export const DestinationDescription = ({
  locationObj
}: DestinationDescriptionProps) => {
  const [textArray, setTextArray] = useState<string[]>([])
  const { textContent } = locationObj || {}

  useEffect(() => {
    const parser = new DOMParser()
    const htmlDoc = parser.parseFromString(
      decodeURIComponent(textContent),
      'text/html'
    )
    const paragraphs = htmlDoc.getElementsByTagName('p')
    let texts: string[] = []
    for (let i = 0; i < paragraphs.length; i++) {
      let paragraphText = paragraphs[i].innerText.trim()
      paragraphText = paragraphText.replace(
        /\b([A-Z]{2,})\b/g,
        '<span class="font-bold uppercase text-red-500">$1</span>'
      )
      texts.push(paragraphText)
    }
    setTextArray(texts)
  }, [textContent])

  return (
    <div className='w-full p-4 flex flex-col'>
      <h3 className='text-2xl font-bold'>
        <Icon icon='raphael:raphael' className='w-6 h-6 inline-block' />
        <span className='ml-2'>{`${locationObj?.name} Overview`}</span>
      </h3>
      <div className='grid grid-cols-1 xs:grid-cols-2 gap-1'>
        {textArray.map((text, index) => (
          <div key={index} className='mt-4 text-white-100 sm:text-xl'>
            <p
              className='pl-8 italic font-bold indent-2'
              dangerouslySetInnerHTML={{ __html: text }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
