import axios from 'axios';

export default async (articleText, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      'https://blog.kata.academy/api/articles',
      articleText,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );
    return response.data.article;
  } catch (error) {
    return rejectWithValue(error.message);
  }
};
