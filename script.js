document
  .querySelector(".busca")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    let input = document.querySelector("#searchInput").value;

    if (input.length > 0) {
      limparResultado();
      mostrarAviso("Carregando...");
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
        input
      )}&appid=9963cf5f56da248aea535d4ef8a755e5&units=metric&lang=pt_br`;

      let results = await fetch(url);
      let json = await results.json();

      if (json.cod === 200) {
        mostrarResultado({
          name: json.name,
          country: json.sys.country,
          temp: json.main.temp,
          temp_max: json.main.temp_max,
          temp_min: json.main.temp_min,
          humidity: json.main.humidity,
          temp_icon: json.weather[0].icon,
          windSpeed: json.wind.speed,
          windAngle: json.wind.deg,
        });
      } else {
        limparResultado();
        mostrarAviso("Cidade não encontrada");
      }

      console.log(json);
    } else {
      mostrarAviso("Digite uma cidade");
    }
    console.log(input);
  });

function mostrarAviso(msg) {
  document.querySelector(".aviso").innerHTML = msg;
}

function mostrarResultado(resultado) {
  mostrarAviso("");

  document.querySelector(
    ".titulo"
  ).innerHTML = `${resultado.name}, ${resultado.country}`;
  document.querySelector(
    ".tempInfo"
  ).innerHTML = `${resultado.temp} <sup>°C</sup>`;
  document.querySelector(
    ".ventoInfo"
  ).innerHTML = `${resultado.windSpeed} km/h`;

  document
    .querySelector(".temp img")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${resultado.temp_icon}@2x.png`
    );
  document.querySelector(".ventoPonto").style.transform = `rotate(${
    resultado.windAngle - 90
  }deg)`;
  document.querySelector(".resultado").style.display = "block";
}

function limparResultado() {
  mostrarAviso("");
  document.querySelector(".resultado").style.display = "none";
}
//key wheathermap 9963cf5f56da248aea535d4ef8a755e5
