// Obtém a localização do usuário via Geolocation API ou fallback para ip-api.com
export async function getUserLocation() {
    return new Promise((resolve, reject) => {
      // Tenta obter a localização pelo GPS
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
              method: "Geolocation API",
            });
          },
          async (error) => {
            console.warn("Geolocation negada, usando fallback via IP...", error);
            // Se geolocalização falhar, tenta IP-API
            try {
              const response = await fetch("http://ip-api.com/json/");
              const data = await response.json();
              resolve({
                lat: data.lat,
                lon: data.lon,
                method: "IP API",
              });
            } catch (err) {
              reject("Erro ao obter localização via IP.");
            }
          }
        );
      } else {
        reject("Geolocalização não suportada pelo navegador.");
      }
    });
  }
  