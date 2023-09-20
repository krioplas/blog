import axios from 'axios';

export default async (userData, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(
      'https://blog.kata.academy/api/user',
      userData,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );
    localStorage.setItem('data', JSON.stringify(response.data));
    localStorage.setItem(
      'profileImage',
      JSON.stringify(response.data.user.image),
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
};
