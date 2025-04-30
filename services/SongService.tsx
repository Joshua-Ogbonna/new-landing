import CloudinaryService from "./cloudinary.services";
import axios from 'axios';
// import { getSession } from "next-auth/react"; // Not needed here

// Interface for the data expected by createSong (matching Form2's combined data)
interface SongCreationData {
  releaseTitle: string;
  artistName: string; // Keep for potential use if artist_id isn't available, though API uses artist_id
  featuredArtist?: string;
  releaseDate: string;
  songwriter?: string;
  isCover: string; // 'yes' or 'no'
  category: string; // Should be category_id
  contentType: string; // Should be content_type_id
  artwork: File | null;
  musicFile: File | null;
  // genre?: string; // Optional genre from Form1 if needed by API (not in POST /song/create docs)
  lyrics?: string; // Optional lyrics if collected
}

class SongService {
  static async getSongs() {
    try {
      const response = await axios.get("/api/songs");
      return response.data;
    } catch (error) {
      console.error("Error fetching songs:", error);
      throw error;
    }
  }

  static async createSong(songData: SongCreationData, accessToken: string, userId: string | undefined) {
    if (!songData.musicFile) {
        throw new Error("Music file is required.");
    }
    if (!accessToken) {
        throw new Error("Authentication token is required.");
    }
    
    console.log("Starting song creation process for:", songData.releaseTitle);

    try {
      // Upload music file and get URL + duration using actual CloudinaryService
      console.log("Attempting to upload music file and get duration...");
      const [songUploadResult, durationResult] = await Promise.allSettled([
        CloudinaryService.uploadFile(songData.musicFile, "video"), 
        CloudinaryService.getDuration(songData.musicFile),
      ]);

      if (songUploadResult.status === 'rejected') {
          console.error("Music upload failed:", songUploadResult.reason);
          throw new Error(`Failed to upload music file: ${songUploadResult.reason?.message || 'Unknown reason'}`);
      }
      if (durationResult.status === 'rejected') {
          console.error("Duration calculation failed:", durationResult.reason);
          throw new Error(`Failed to get music duration: ${durationResult.reason?.message || 'Unknown reason'}`); 
      }
      
      const songUrl = songUploadResult.value; 
      const duration = durationResult.value; 
      console.log(`Music uploaded: ${songUrl}, Duration: ${duration}s`);

      // Upload cover image if exists
      let coverUrl = null;
      if (songData.artwork) {
        console.log("Attempting to upload cover art...");
        try {
            coverUrl = await CloudinaryService.uploadFile(songData.artwork, "image");
            console.log(`Cover art uploaded: ${coverUrl}`);
        } catch(uploadError: any) {
            console.error("Cover art upload failed, proceeding without it:", uploadError);
            // Proceeding without coverUrl as decided previously
        }
      }
  
      // Build final payload according to POST /song/create documentation
      const payload = {
        songs: [songUrl],                  
        cover_images: coverUrl ? [coverUrl] : [], 
        titles: [songData.releaseTitle],      
        durations: [duration],             
        artist_id: userId,                 
        release_date: songData.releaseDate || null, 
        lyrics: songData.lyrics || null, // Send null if undefined/empty        
        content_type_id: songData.contentType, 
        category_id: songData.category,       
        isCover: songData.isCover === 'yes',   
        featuredArtist: songData.featuredArtist || null,
        songwriter: songData.songwriter || null,    
      };
  
      console.log("Sending payload to /api/song/create:", JSON.stringify(payload, null, 2));
  
      // Send to backend AS JSON, corrected endpoint
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/song/create`,
        payload, 
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, 
            "Content-Type": "application/json",      
          },
        }
      );
      
      console.log("Backend response received:", response.data);
      return response.data;

    } catch (error: any) {
        // Log more specific error details if available
        console.error("Error during song creation process:", error);
        if (error.response) {
            console.error("Error creating song (server response):", error.response.data);
            console.error("Status code:", error.response.status);
            console.error("Headers:", error.response.headers);
             throw new Error(error.response.data?.message || `Server error: ${error.response.status}`);
        } else if (error.request) {
            console.error("Error creating song (no response):", error.request);
            throw new Error("Could not connect to the server. Please try again.");
        } else {
            console.error("Error creating song (request setup or upload/duration error):", error.message);
             throw error; // Re-throw the original error (could be from uploads)
        }
    }
  }

   // Remove placeholder methods as we are using CloudinaryService now
   // static async uploadFile(file: File, type: 'image' | 'video'): Promise<string> { ... }
   // static async getDuration(file: File): Promise<number> { ... }
}

export default SongService;