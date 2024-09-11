async function search(term) {
    let data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${term}&days=3`);
    if (data.ok && 400 != data.status) {
        let term = await data.json();
        displayCurrent(term.location, term.current),
        displayAnother(term.forecast.forecastday)
    }
}
document.getElementById("search").addEventListener("keyup", term => {
    search(term.target.value)
}
);
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function displayCurrent(term, data) {
    if (null !=data) {
        var e = new Date(data.last_updated.replace(" ", "T"));
        let n = `<div class="today forecast">\n    <div class="forecast-header"  id="today">\n    <div class="day">${days[e.getDay()]}</div>\n    <div class=" date">${e.getDate() + monthNames[e.getMonth()]}</div>\n    </div> \x3c!-- .forecast-header --\x3e\n    <div class="forecast-content" id="current">\n    <div class="location">${term.name}</div>\n    <div class="degree">\n        <div class="num">${data.temp_c}<sup>o</sup>C</div>\n      \n        <div class="forecast-icon">\n            <img src="https:${data.condition.icon}" alt="" width=90>\n        </div>\t\n    \n    </div>\n    <div class="custom">${data.condition.text}</div>\n    <span><img src="images/icon-umberella.png" alt="">20%</span>\n\t\t\t\t\t\t\t\t<span><img src="images/icon-wind.png" alt="">18km/h</span>\n\t\t\t\t\t\t\t\t<span><img src="images/icon-compass.png" alt="">East</span>\n    </div>\n</div>`;
        document.getElementById("forecast").innerHTML = n
    }
}
function displayAnother(term) {
    let data = "";
    for (let e = 1; e < term.length; e++)
        data += `\t<div class="forecast">\n        <div class="forecast-header">\n            <div class="day">${days[new Date(term[e].date.replace(" ", "T")).getDay()]}</div>\n        </div> \x3c!-- .forecast-header --\x3e\n        <div class="forecast-content">\n            <div class="forecast-icon">\n                <img src="https:${term[e].day.condition.icon}" alt="" width=48>\n            </div>\n            <div class="degree">${term[e].day.maxtemp_c}<sup>o</sup>C</div>\n            <small>${term[e].day.mintemp_c}<sup>o</sup></small>\n            <div class="custom">${term[e].day.condition.text}</div>\n        </div>\n        </div>`;
    document.getElementById("forecast").innerHTML += data
}
search("cairo");
