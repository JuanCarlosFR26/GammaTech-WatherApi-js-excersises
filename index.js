// Weather App
// Para este ejercicio usaremos la OpenWeather API, que ofrece datos meteorológicos de todo el mundo. En concreto, usaremos la Current Weather Data API, que proporciona datos en tiempo real.

// Para usar la API es necesario registrarse en la página para obtener una API key que deberás añadir a las peticiones que hagas a la API. Sigue la documentación para ver cómo hacerlo.

// El ejercicio consiste en lo siguiente:

// Se creará un formulario con un input de tipo texto para que el usuario introduzca el nombre de una ciudad.
const form = document.querySelector('form')


// 1- Cuando se envíe el formulario, se hará una petición a la API para recuperar el estado del tiempo de esa ciudad.
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let inputValue = document.querySelector('input').value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${'fff84c545190e505b8ce27ebf90fdc60'}&units=metric&lang=${'sp'}`)
        .then(response => response.json())
        .then(data => {

        // 2- A continuación, deberás pintar en el DOM una card con la información básica: nombre de la ciudad, estado del tiempo (soleado, nublado, etc.) y la temperatura. Busca cómo lograr la información en el sistema métrico y en español.
            let card = document.querySelector('.card');
            
            // 4- Las cards no deben acumularse en el DOM: si he buscado el tiempo en Madrid, cuando luego busque en Barcelona, la información anterior debe desaparecer y ser sustituida por la nueva.
            card.innerHTML = '';
            const cityName = document.createElement('h2');
            const weather = document.createElement('p');
            const temperatura = document.createElement('p');
            const iconImg = document.createElement('img');

            // Styles
            card.style.border = '1px solid #000';
            card.style.width = '50%'
            card.style.padding = '15px';
            card.style.textAlign = 'center';

            // Adding data
            cityName.innerText = 'Ciudad: ' + data.name;
            data.weather.forEach(e => {
                const icon = e.icon;
                let iconlink = `https://openweathermap.org/img/wn/${icon}@2x.png`;
                iconImg.src = iconlink
                weather.innerText = 'Tiempo: ' + e.description;
            })
            temperatura.innerText = 'Temperatura: ' + data.main['temp'] + 'º';

            card.appendChild(cityName)

            // 3- Verás que en el JSON que devuelve la API, hay un icono que ilustra el estado meteorológico. Busca cómo lograr que aparezca ese icono junto a los datos anteriores.
            card.appendChild(iconImg)

            card.appendChild(weather)
            card.appendChild(temperatura)

        })
})
