export function validateUpdate(isChecked) {
  for (let i in isChecked) {
    if (isChecked[i] === true) {
      return true
    }
  }
  return false
}


export function validateUpdateTextContent(originalTextContent, updateTextContent) {
  return originalTextContent !== updateTextContent
}


export function validateUpdateImages(originalImages, updateImages) {
  if (originalImages.length !== updateImages.length) {
    return true
  }
  const areDifferent = originalImages.some((el, index) => el !== updateImages[index])
  return areDifferent
}