const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/3.0/onecall"; // 🔥 Nova API One Call 3.0

/**
 * Obtém alertas climáticos da OpenWeatherMap API.
 * @param {number} lat - Latitude do usuário.
 * @param {number} lon - Longitude do usuário.
 * @returns {Promise<object>} - Dados dos alertas climáticos.
 */
export async function getWeatherAlerts(lat, lon) {
  try {
    const url = `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&exclude=current,minutely,hourly,daily`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Erro ao buscar alertas meteorológicos.");

    const data = await response.json();
    return data.alerts || []; // Retorna alertas ou array vazio se não houver nenhum
  } catch (error) {
    console.error("Erro na requisição da OpenWeatherMap:", error);
    return [];
  }
}
