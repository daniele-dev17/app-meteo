const apiKey = "66f301343920a3690e58149227008840"; // la tua chiave API

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");
const cityName = document.getElementById("cityName");
const temp = document.getElementById("temp");
const desc = document.getElementById("desc");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city === "") {
    alert("Inserisci il nome di una città!!");
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=it`)
    .then(response => response.json())
    .then(data => {
      if (data.cod === "404") {
        alert("Città non trovata! Controlla di aver scritto correttamente.");
        weatherInfo.classList.add("hidden");
        return;
      }

      // --- DATI BASE ---
      cityName.textContent = `${data.name}, ${data.sys.country}`;
      temp.textContent = `🌡️ Temperatura: ${data.main.temp} °C`;
      desc.textContent = `☁️ Condizione: ${data.weather[0].description}`;

      // --- CONTROLLO PIOGGIA ---
      const weatherId = data.weather[0].id;
      let rainMessage = "";

      if (weatherId >= 200 && weatherId < 600) {
        rainMessage = "🌧️ Oggi pioverà, ricordati l’ombrello!";
      } else {
        rainMessage = "☀️ Non sembra che pioverà oggi.";
      }

      let rainParagraph = document.getElementById("rain");
      if (!rainParagraph) {
        rainParagraph = document.createElement("p");
        rainParagraph.id = "rain";
        weatherInfo.appendChild(rainParagraph);
      }
      rainParagraph.textContent = rainMessage;

      weatherInfo.classList.remove("hidden");
    })
    .catch(error => {
      console.error("Errore nel recupero dei dati meteo:", error);
      alert("Ops! Qualcosa è andato storto. Riprova più tardi.");
    });
});
