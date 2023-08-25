export async function fetchImages() {
    try {
      const response = await fetch('/fetch-images'); // Your server route
      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching images:', error);
      throw error;
    }
  }
  