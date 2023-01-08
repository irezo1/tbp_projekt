var map;
var marker;
var forma;
var forma2;
var obavijest;
var obavijest2;
var lista;
var izborDrzave;
document.addEventListener("DOMContentLoaded", function (event) {
    map = L.map('map').setView([45.79479, 15.97906], 14);
    L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png')
        .addTo(map);
    map.on('click', onMapClick);
    forma = document.getElementById('dodaj_putovanje');
    forma2 = document.getElementById('dodaj_znamenitost');
    obavijest = document.getElementById('obavijest');
    obavijest2 = document.getElementById('obavijest2');
    lista = document.getElementById('lista');
    DodajDrzave();
});

function onMapClick(e) {
    if (marker) map.removeLayer(marker)
    marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
}

async function dodajUBazu() {
    if (forma.elements['datum'].value != "" && marker) {
        const url = `http://localhost:3000/putovanja/dodaj_putovanje?lat=${marker.getLatLng()['lat']}&lng=${marker.getLatLng()['lng']}&datum=${forma.elements['datum'].value}`;
        let rez = await fetch(url);
        if (!rez.ok) {
            alert("Could not fetch data");
            return;
        }
        obavijest.innerHTML = "Dodano";
    }
}
async function DodajDrzave() {
    const url = `http://localhost:3000/putovanja/dohvatiDrzave`;
    let rez = await fetch(url);
    if (!rez.ok) {
        alert("Could not fetch data");
        return;
    }
    let json = await rez.json();
    json.forEach((element, index, array) => {
        lista.options[index] = new Option(element.naziv, element.id);
    });
    izborDrzave = lista.options[0].value;
}

function dohvatiDrzavu() {
    izborDrzave = lista.options[lista.selectedIndex].value;
}

async function dodajUBazuZnamenitost() {
    if (forma2.elements['naziv'].value != "" && marker && izborDrzave) {
        const url = `http://localhost:3000/putovanja/dodaj_znamenitost?drzava=${izborDrzave}&naziv=${forma2.elements['naziv'].value}&lat=${marker.getLatLng()['lat']}&lng=${marker.getLatLng()['lng']}`;
        let rez = await fetch(url);
        if (!rez.ok) {
            alert("Could not fetch data");
            return;
        }
        let json = await rez.json();
        if (json == "P0001") {
            obavijest2.innerHTML = "Kordinate znamenitosti su izvan granica trazene drzave!";
        } else {
            obavijest2.innerHTML = "Uspjesno dodano";
        }
    }
}
