var map;
var markerGroup;
document.addEventListener("DOMContentLoaded", function (event) {
    map = L.map('map').setView([45.79479, 15.97906], 9);
    L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png')
        .addTo(map);
    markerGroup = L.layerGroup().addTo(map);
    dodajMarkere();
});

async function dohvatiPutovanjaZaPrikazat() {
    const url = `http://localhost:3000/pregledLokacija/dohvatiPutovanja`;
    let rez = await fetch(url);
    if (!rez.ok) {
        alert("Could not fetch data");
        return;
    }
    let json = await rez.json();
    return json;
}

async function dodajMarkere() {
    let json = await dohvatiPutovanjaZaPrikazat();
    json.forEach((element) => {
        L.marker([element.st_y, element.st_x]).addTo(markerGroup);
    });
}

async function sveZnamenitosti() {
    const url = `http://localhost:3000/pregledLokacija/dohvatiZnamenitosti`;
    let rez = await fetch(url);
    if (!rez.ok) {
        alert("Could not fetch data");
        return;
    }
    let json = await rez.json();
    json.forEach((element) => {
        L.marker([element.st_y, element.st_x]).addTo(markerGroup);
    });
}

function spustiDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

async function clickMojaPutovanja() {
    markerGroup.clearLayers();
    await dodajMarkere();
}

async function clickSveZnamenitosti() {
    markerGroup.clearLayers();
    await sveZnamenitosti();
}

