import axios from 'axios';

export default async (payload, { rejectWithValue }) => {
  try {
    const { slug, newArticleText } = payload;
    const token = localStorage.getItem('token');
    const response = await axios.put(
      `https://blog.kata.academy/api/articles/${slug}`,
      newArticleText,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
};
