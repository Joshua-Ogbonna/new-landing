import axios from 'axios';

class CloudinaryService {
  private static CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  private static CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  static async uploadFile(file: File, resourceType: 'image' | 'video'): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', this.CLOUDINARY_UPLOAD_PRESET!);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${this.CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return response.data.secure_url;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw new Error('Failed to upload file to Cloudinary');
    }
  }
}

export default CloudinaryService;