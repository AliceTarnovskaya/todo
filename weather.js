let httpWeather = new XMLHttpRequest();
httpWeather.onload = function () {
    let data = JSON.parse(httpWeather.responseText);

    const miniWeather = document.querySelector('.weather-mini__weather');
    const miniTemp = document.querySelector('.weather-mini__temp');
    const miniCity = document.querySelector('.weather-mini__city');
    const miniDate = document.querySelector('.weather-mini__date');
    const date = new Date();


    miniWeather.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.list[0].weather[0]['icon']}@2x.png"> ${data.list[0].weather[0].main}`;
    miniTemp.innerHTML = Math.round(data.list[0].main.temp - 273) + '&deg;';
    miniCity.innerHTML = data.city.name;
    miniDate.innerHTML = `${date.getMonth() + 1} / ${date.getDate()}`;

}

httpWeather.open("GET", 'https://api.openweathermap.org/data/2.5/forecast?q=Minsk&appid=ce4fd278adc9f280efb90641fc2e0098');
httpWeather.send();

const miniBox = document.querySelector('.weather-mini');
const arrowIcon = document.querySelector('.arrow-icon');
miniBox.addEventListener('click', () => {
    arrowIcon.classList.toggle('open');
})