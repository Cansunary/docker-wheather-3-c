const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

export async function getWeather(lat, lon) {
  try {
    const url = `${BASE_URL}?latitude=${lat}&longitude=${lon}&current_weather=true`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Hava durumu bilgisi alınamadı');
    }

    return await response.json();
  } catch (error) {
    console.error('getWeather error:', error);
    throw error;
  }
}
