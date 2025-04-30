import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Define interfaces for the expected data structures
interface Category {
  id: string; 
  name: string;
  // Add other fields if they exist in your API response
}

interface ContentType {
  id: string; 
  name: string;
  // Add other fields if they exist in your API response
}

class DataService {

  static async fetchContentTypes(): Promise<ContentType[]> {
    try {
      const response = await axios.get(`${apiUrl}/api/content-types`);
      // Adjust data access based on your actual API response
      if (response.data && Array.isArray(response.data.data)) {
          return response.data.data;
      } else if (response.data && Array.isArray(response.data)) {
           return response.data; // Handle case where data is top-level array
      }
       console.error("Unexpected data structure for content types:", response.data);
       return []; // Return empty array on unexpected structure
    } catch (error: any) {
      console.error("Error fetching content types:", error);
      throw new Error(error.response?.data?.message || error.message || "Failed to fetch content types");
    }
  }

  static async fetchCategories(): Promise<Category[]> {
    try {
      const response = await axios.get(`${apiUrl}/api/categories`);
      // Adjust data access based on your actual API response
       if (response.data && Array.isArray(response.data.data)) {
          return response.data.data;
      } else if (response.data && Array.isArray(response.data)) {
           return response.data; // Handle case where data is top-level array
      }
      console.error("Unexpected data structure for categories:", response.data);
      return []; // Return empty array on unexpected structure
    } catch (error: any) {
      console.error("Error fetching categories:", error);
      throw new Error(error.response?.data?.message || error.message || "Failed to fetch categories");
    }
  }
}

export default DataService; 