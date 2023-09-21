import axios from 'axios';

export default async (offset, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(
      `https://blog.kata.academy/api/articles?limit=5&offset=${offset}`,
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
