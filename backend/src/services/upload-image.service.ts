import cloudinary from '../config/cloudinary.config';

export class UploadImageService {
  public async uploadImage(file: Express.Multer.File): Promise<string> {
    const cloudResponse = await cloudinary.uploader.upload(file.path);
    return `${cloudResponse.url}`;
  }

  public async deleteUploadedImage(url: string): Promise<void> {
    try {
      const convertedUrl = url?.split('/');
      if (convertedUrl?.length) {
        const imagePublicId =
          convertedUrl?.[convertedUrl.length - 1]?.split('.')[0];
        await cloudinary.uploader.destroy(imagePublicId);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
