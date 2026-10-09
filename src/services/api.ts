const API_URL =
  'https://jsonplaceholder.typicode.com';

export const fetchData = async (
  endpoint: string,
) => {
  try {
    const response = await fetch(
      `${API_URL}/${endpoint}`,
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};