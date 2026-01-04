const BASE_URL = 'https://worldtimeapi.org/api';

export async function getTime(timezone) {
  try {
    const response = await fetch(`${BASE_URL}/timezone/${timezone}`);

    if (!response.ok) {
      throw new Error('Zaman bilgisi alınamadı');
    }

    return await response.json();
  } catch (error) {
    console.error('getTime error:', error);
    throw error;
  }
}
