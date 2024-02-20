import { useState, useEffect } from 'react'

export const useFontFamily = (fonts) => {
  const [fontFamilyStyle, setFontFamilyStyle] = useState('')

  useEffect(() => {
    const fontFamily = fonts?.split(' ')[0]
    const style = fontFamily ? `font-custom ${fontFamily}` : 'font-body'
    setFontFamilyStyle(style)
  }, [fonts])

  return fontFamilyStyle
}
