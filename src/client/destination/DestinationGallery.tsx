import { Icon } from '@iconify/react'
import { FC } from 'react'

interface DestinationGalleryProps {
  images: string[] | []
}

export const DestinationGallery: FC<DestinationGalleryProps> = ({ images }) => {
  return (
    <>
      <h3 className='text-2xl font-bold col-span-full'>
        <Icon icon='mdi:images-outline' className='w-6 h-6 inline-block' />
        <span className='ml-2'>Some cool pics ...</span>
      </h3>
      <div className='w-full p-4 grid grid-cols-3 gap-4'>
        {images.map((image, index) => (
          <div
            key={index}
            className='rounded-lg overflow-hidden bg-gray-200 h-48 relative'
          >
            <img
              src={image}
              alt='destination gallery'
              className='absolute inset-0 w-full h-full object-cover transform transition-transform duration-500 hover:scale-105'
              loading='lazy'
            />
          </div>
        ))}
      </div>
    </>
  )
}
