import axios from 'axios';

export default async (slug, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(
      `https://blog.kata.academy/api/articles/${slug}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );
    localStorage.setItem('dArticles', response.data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
};
