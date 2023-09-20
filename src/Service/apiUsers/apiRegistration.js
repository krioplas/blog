import axios from 'axios';

export default async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      'https://blog.kata.academy/api/users/',
      userData,
    );
    localStorage.setItem('token', response.data.user.token);
    localStorage.setItem('data', JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
};
