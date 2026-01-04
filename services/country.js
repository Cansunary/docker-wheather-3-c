const BASE_URL = 'https://restcountries.com/v3.1';

export async function getCountry(countryCode) {
  try {
    const response = await fetch(`${BASE_URL}/alpha/${countryCode}`);

    if (!response.ok) {
      throw new Error('Ülke bilgisi alınamadı');
    }

    return await response.json();
  } catch (error) {
    console.error('getCountry error:', error);
    throw error;
  }
}
