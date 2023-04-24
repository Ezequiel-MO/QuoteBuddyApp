export function validateUpdate(isChecked) {
    for(let i in isChecked){
      if(isChecked[i] === true){
        return true
      }
    }
    return false
  }

  export function validateUpdateTextContent(originalTextContent , updateTextContent ){
    return originalTextContent !== updateTextContent 
  }