
/**
 * API service for skin analysis
 */

// Base URL for the API - would need to be updated to your actual backend URL
const API_BASE_URL = 'http://localhost:8000'; // Replace with your FastAPI backend URL

/**
 * Analyzes a skin image using the SkinGPT-4 model via the backend API
 * @param imageFile The image file to analyze
 * @returns The analysis result from the SkinGPT-4 model
 */
export async function analyzeSkinImage(imageFile: File) {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);
    
    const response = await fetch(`${API_BASE_URL}/analyze`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error during skin analysis:', error);
    throw error;
  }
}
