import { v2 as cloudinary } from 'cloudinary';

// Configuration
cloudinary.config({
    cloud_name: import.meta.env.CLOUDINARY_CLOUD_NAME,
    api_key: import.meta.env.CLOUDINARY_API_KEY,
    api_secret: import.meta.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
});

export class uploadToCloud {

    static async uploadImages(file: File) {


        const buffer = await file.arrayBuffer()
        const base64Image = Buffer.from(buffer).toString('base64')
        const imageType = file.type.split('/')[1]

        const resp = await cloudinary.uploader.upload(`data:image/${imageType};base64,${base64Image}`)

       

        return resp.secure_url
    }


    static async deleteImage(image: string) {

        try {
            
            const imageName = image.split('/').pop() ?? ''
            const ImageId = imageName.split('.')[0]
            const resp = await cloudinary.uploader.destroy(ImageId)
    
    
            console.log('holuuus',resp)
    
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

}

