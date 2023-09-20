export default async (offset, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `https://blog.kata.academy/api/articles?offset=${offset}&limit=5`,
    );
    if (!response.ok) {
      throw new Error(response.status);
    }
    const articlesList = await response.json();
    return articlesList;
  } catch (error) {
    return rejectWithValue(error.message);
  }
};
