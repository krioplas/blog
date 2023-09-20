import axios from 'axios';

export default async (slug, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(
      `https://blog.kata.academy/api/articles/${slug}/favorite`,
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
