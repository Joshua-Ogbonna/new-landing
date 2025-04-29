 import axios from 'axios';

// class CloudinaryService {
//   private static CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
//   private static CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

//   static async uploadFile(file: File, resourceType: 'image' | 'video'): Promise<string> {
//     try {
//       const formData = new FormData();
//       formData.append('file', file);
//       formData.append('upload_preset', this.CLOUDINARY_UPLOAD_PRESET!);

//       const response = await axios.post(
//         `https://api.cloudinary.com/v1_1/${this.CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );

//       return response.data.secure_url;
//     } catch (error) {
//       console.error('Error uploading to Cloudinary:', error);
//       throw new Error('Failed to upload file to Cloudinary');
//     }
//   }

//   static async uploadMultipleFiles(files: File[], resourceType: 'image' | 'video'): Promise<string[]> {
//     try {
//       const uploadPromises = files.map(file => this.uploadFile(file, resourceType));
//       return await Promise.all(uploadPromises);
//     } catch (error) {
//       console.error('Error uploading multiple files to Cloudinary:', error);
//       throw new Error('Failed to upload multiple files to Cloudinary');
//     }
//   }

  // static async getDuration(audioFile: File): Promise<number> {
  //   return new Promise((resolve, reject) => {
  //     const audio = new Audio();
  //     const objectUrl = URL.createObjectURL(audioFile);
      
  //     audio.addEventListener('loadedmetadata', () => {
  //       URL.revokeObjectURL(objectUrl);
  //       resolve(audio.duration);
  //     });

  //     audio.addEventListener('error', () => {
  //       URL.revokeObjectURL(objectUrl);
  //       reject(new Error('Failed to load audio file'));
  //     });

  //     audio.src = objectUrl;
  //   });
  // }

//   static async uploadSongWithMetadata(songFile: File, coverImage: File) {
//     try {
//       const [songUrl, coverImageUrl, duration] = await Promise.all([
//         this.uploadFile(songFile, 'video'),
//         this.uploadFile(coverImage, 'image'),
//         this.getDuration(songFile)
//       ]);

//       return {
//         songUrl,
//         coverImageUrl,
//         duration
//       };
//     } catch (error) {
//       console.error('Error uploading song with metadata:', error);
//       throw new Error('Failed to upload song with metadata');
//     }
//   }

//   static async uploadSongBatch(songFiles: File[], coverImages: File[]) {
//     try {
//       // Upload all songs and get their URLs and durations
//       const songUploads = await Promise.all(
//         songFiles.map(async (file) => {
//           const [songUrl, duration] = await Promise.all([
//             this.uploadFile(file, 'video'),
//             this.getDuration(file)
//           ]);
//           return { songUrl, duration };
//         })
//       );

//       // Upload all cover images
//       const coverImageUrls = await this.uploadMultipleFiles(coverImages, 'image');

//       // Return combined results
//       return songUploads.map((song, index) => ({
//         file: song.songUrl,
//         duration: song.duration,
//         cover_image: coverImageUrls[index] || coverImageUrls[0] // Fallback to first image if not enough images
//       }));
//     } catch (error) {
//       console.error('Error uploading song batch:', error);
//       throw new Error('Failed to upload song batch');
//     }
//   }
// }

// export default CloudinaryService;



class CloudinaryService {
  private static readonly CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
  private static readonly CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

  static async uploadFile(file: File, resourceType: 'image' | 'video'): Promise<string> {
    try {
      console.log('Uploading to Cloudinary with:', {
        cloudName: this.CLOUDINARY_CLOUD_NAME,
        preset: this.CLOUDINARY_UPLOAD_PRESET,
        fileInfo: { name: file.name, size: file.size, type: file.type }
      });
  
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', this.CLOUDINARY_UPLOAD_PRESET);
  
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${this.CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      console.log('Upload successful:', response.data);
      return response.data.secure_url;
    } catch (error: any) {
      console.error('Full Cloudinary error:', {
        message: error.message,
        response: error.response?.data,
        config: error.config
      });
      throw new Error('Failed to upload file to Cloudinary');
    }
  }
  static async getDuration(audioFile: File): Promise<number> {
    return new Promise((resolve, reject) => {
      const audio = new Audio();
      const objectUrl = URL.createObjectURL(audioFile);
      
      audio.addEventListener('loadedmetadata', () => {
        URL.revokeObjectURL(objectUrl);
        resolve(audio.duration);
      });

      audio.addEventListener('error', () => {
        URL.revokeObjectURL(objectUrl);
        reject(new Error('Failed to load audio file'));
      });

      audio.src = objectUrl;
    });
  }
}
export default CloudinaryService;