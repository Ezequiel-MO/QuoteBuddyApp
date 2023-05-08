export const GiftFormData = {
    create: (data , files) =>{
        const formData = new FormData()
        for(let i  in data){
            if( i !== "imageContentUrl" ){
                formData.append(i , data[i])
            }
        }
        if (files.length > 0) {
			for (let i = 0; i < files.length; i++) {
				formData.append('imageContentUrl', files[i])
			}
		}
        return formData
    },
    update: (values) =>{
        const jsonData ={}
        for(let i in  values){
            if(i !== "imageContentUrl"){
                jsonData[i] = values[i]
            }
        }
        return jsonData
    },
    updateImageData: (values, files) => {
		let formData = new FormData()
		if (values?.imageContentUrl.length > 0) {
			formData.append('imageUrls', values.imageContentUrl)
		}
		if (values?.deletedImage?.length > 0) {
			formData.append('deletedImage', values.deletedImage)
		}
		if (files.length > 0) {
			for (let i = 0; i < files.length; i++) {
				formData.append('imageContentUrl', files[i])
			}
		}
		return formData
	}
}