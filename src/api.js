import axios from "axios";

export async function getImages(searchQuery, page = 1) {
  try {
    const response = await axios.get(`https://pixabay.com/api/?key=39286260-36ff99979e0a23a42f4451b46&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`);

    if (response.status !== 200) {
      throw new Error('Ошибка при получении данных');
    }

    return response.data;
  } catch (error) {
    throw error;
  }
}