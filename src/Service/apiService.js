const url = 'https://blog.kata.academy/api/';

export const apiService = async () => {
  const newResponse = await fetch(`${url}/articles`);
  if (newResponse.ok) {
    const data = await newResponse.json();
    return data;
  }
  throw new Error(newResponse.status);
};

export default apiService;
