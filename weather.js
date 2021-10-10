const miniWeather = document.querySelector('.weather-mini__weather');
const miniTemp = document.querySelector('.weather-mini__temp');
const miniCity = document.querySelector('.weather-mini__city');
const miniDate = document.querySelector('.weather-mini__date');
const date = new Date();

const weatherContainer = document.querySelector('.weather__container');
const weatherRow = document.createElement('div');
weatherRow.classList.add('weather__row');
const weatherDate = document.createElement('div');
weatherDate.classList.add('weather__date');
const weatherImage = document.createElement('div');
weatherImage.classList.add('weather__image');
const weatherTemp = document.createElement('div');
weatherTemp.classList.add('weather__temp');


let httpWeather = new XMLHttpRequest();
httpWeather.onload = function () {
    let data = JSON.parse(httpWeather.responseText);

    miniWeather.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.list[0].weather[0]['icon']}@2x.png"> ${data.list[0].weather[0].main}`;
    miniTemp.innerHTML = Math.round(data.list[0].main.temp - 273) + '&deg;';
    miniCity.innerHTML = data.city.name;
    miniDate.innerHTML = `${date.getMonth() + 1} / ${date.getDate()}`; 

    for (let i = 0; i < 5; i++) {
        weatherDate.innerHTML = data.list[i].dt;
        weatherImage.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.list[i].weather[0]['icon']}@2x.png"> ${data.list[i].weather[0].main}`;
        weatherTemp.innerHTML = Math.round(data.list[i].main.temp - 273) + '&deg;';
        weatherRow.appendChild(weatherDate);
        weatherRow.appendChild(weatherImage);
        weatherRow.appendChild(weatherTemp);
        weatherContainer.appendChild(weatherRow);
    }
}

httpWeather.open("GET", 'https://api.openweathermap.org/data/2.5/forecast?q=Minsk&appid=ce4fd278adc9f280efb90641fc2e0098');
httpWeather.send();

const miniBox = document.querySelector('.weather-mini');
const arrowIcon = document.querySelector('.arrow-icon');
miniBox.addEventListener('click', () => {  
    arrowIcon.classList.toggle('open');
    weatherContainer.classList.toggle('show');   
});
