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
    }
}