import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { ICostItem, usePartialCostsData } from './usePartialCostsData'
import { CostItem } from './CostItem'
import { TranslationKeys } from '../../../interfaces/translations'

interface PartialCostsProps {
  colorPalette?: string[]
}

export const PartialCosts = ({ colorPalette = [] }: PartialCostsProps) => {
  const { data, costItems } = usePartialCostsData()

  ChartJS.register(ArcElement, Tooltip, Legend)

  const iconColor = colorPalette.length > 0 ? colorPalette[2] : '#ea5933'

  return (
    <div className='flex flex-row items-center justify-center'>
      <div className='mt-10 w-2/3'>
        {costItems
          ?.filter((item) => item?.cost !== 0)
          .map((item: ICostItem) => (
            <CostItem
              key={item.title}
              icon={item.icon}
              title={item.title as TranslationKeys}
              cost={item.cost || 0}
              color={iconColor}
            />
          ))}
      </div>
      <div className='w-1/3 hidden md:flex md:justify-center md:items-center'>
        <Doughnut data={data} className='flex-shrink-0' />
      </div>
    </div>
  )
}
