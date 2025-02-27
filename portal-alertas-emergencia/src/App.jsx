import React, { useState, useEffect } from "react";
import { getUserLocation } from "./services/locationService";
import { getWeatherAlerts } from "./services/weatherService";
import { getCityCoordinates } from "./services/geocodeService";
import "./styles.css"; // ✅ Importando o novo CSS

function App() {
  const [location, setLocation] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const loc = await getUserLocation();
        setLocation(loc);

        const alertsData = await getWeatherAlerts(loc.lat, loc.lon);
        setAlerts(alertsData);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  async function handleSearch(e) {
    e.preventDefault();
    if (!city.trim()) return;

    setSearchLoading(true);
    try {
      const coords = await getCityCoordinates(city);
      if (coords) {
        setLocation({ lat: coords.lat, lon: coords.lon, method: `Busca: ${city}` });

        const alertsData = await getWeatherAlerts(coords.lat, coords.lon);
        setAlerts(alertsData);
      } else {
        alert("Cidade não encontrada!");
      }
    } catch (error) {
      console.error("Erro na busca:", error);
    } finally {
      setSearchLoading(false);
    }
  }

  return (
    <div className="container">
      <h1>🚨 Portal de Alertas de Emergência</h1>

      {/* Campo de Pesquisa */}
      <form onSubmit={handleSearch} className="input-container">
        <input
          type="text"
          placeholder="Digite uma cidade..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit" disabled={searchLoading}>
          {searchLoading ? "Buscando..." : "Buscar"}
        </button>
      </form>

      {loading ? (
        <p>📡 Obtendo dados...</p>
      ) : location ? (
        <>
          <p>
            🌍 Localização: <strong>{location.lat}, {location.lon}</strong>  
            <br /> 📡 Método: {location.method}
          </p>

          {alerts.length > 0 ? (
            <div className="alert-container">
              <h2 className="alert-title">⚠️ Alertas Climáticos</h2>
              {alerts.map((alert, index) => (
                <div key={index}>
                  <p><strong>{alert.event}</strong></p>
                  <p>{alert.description}</p>
                  <p className="alert-source">🔴 Fonte: {alert.sender_name}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>✅ Nenhum alerta climático no momento.</p>
          )}
        </>
      ) : (
        <p>❌ Não foi possível obter a localização.</p>
      )}
    </div>
  );
}

export default App;
