const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const GEOCODE_URL = "https://api.openweathermap.org/geo/1.0/direct";

/**
 * Converte o nome da cidade em coordenadas (latitude e longitude).
 * @param {string} city - Nome da cidade a ser buscada.
 * @returns {Promise<object>} - Coordenadas { lat, lon } ou erro.
 */
export async function getCityCoordinates(city) {
  try {
    const url = `${GEOCODE_URL}?q=${city}&limit=1&appid=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Erro ao buscar cidade.");

    const data = await response.json();
    if (data.length === 0) throw new Error("Cidade não encontrada.");

    return { lat: data[0].lat, lon: data[0].lon };
  } catch (error) {
    console.error("Erro ao converter cidade:", error);
    return null;
  }
}
