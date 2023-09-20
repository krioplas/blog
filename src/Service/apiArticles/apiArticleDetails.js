import axios from 'axios';

export default async (slug, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `https://blog.kata.academy/api/articles/${slug}`,
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
};
