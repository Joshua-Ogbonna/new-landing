
import CloudinaryService from "./cloudinary.services";
import axios from 'axios';



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

  static async createSong(songData: any) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    
    try {
      // Upload music file and get URL + duration
      const [songUrl, duration] = await Promise.all([
        CloudinaryService.uploadFile(songData.musicFile, "video"),
        CloudinaryService.getDuration(songData.musicFile),
      ]);
  
      // Upload cover image if exists
      let coverUrl = null;
      if (songData.artwork) {
        coverUrl = await CloudinaryService.uploadFile(songData.artwork, "image");
      }
  
      // Extract filename as title
      const fileName = songData.musicFile.name.replace(/\.[^/.]+$/, "");
  
      // Build final payload (with arrays)
      const payload = {
        songs: [songUrl],        // Array
        cover_images: [coverUrl],// Array 
        titles: [songData.releaseTitle || fileName], // Array
        durations: [duration],   // Array
        artist_name: songData.artistName,
        featuredArtist: songData.featuredArtist,
        genre: songData.genre,
        artist_id: userId,
        album_id: null,
        release_date: songData.releaseDate,
        songwriter: songData.songwriter,
        isCover: songData.isCover === "yes",
        lyrics: songData.lyrics ?? "<p>No lyrics provided</p>",
      };
  
      // Send to backend AS JSON
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/song/create/`,
        payload, // Axios automatically stringifies JSON
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // 🚨 Critical change
          },
        }
      );
  
      return response.data;
    } catch (error) {
      console.error("Error creating song:", error);
      throw error;
    }
  }
}


export default SongService