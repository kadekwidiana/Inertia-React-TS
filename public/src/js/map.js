// BASEMAP
const atributeName = '© SIG Distan Kab. Buleleng';
let openStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: atributeName,
});

let googleStreetMap = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}', {
    attribution: atributeName,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    maxZoom: 20
});

let satelliteMap = L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    attribution: atributeName,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    maxZoom: 20
});

let googleHibridMap = L.tileLayer('http://{s}.google.com/vt?lyrs=s,h&x={x}&y={y}&z={z}', {
    attribution: atributeName,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    maxZoom: 20
});

let openTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',

});
let esriSatelite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '© <a href="https://www.esri.com">Esri</a>',
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    maxZoom: 20
});
let esriWorldStreetMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: '© <a href="https://www.esri.com">Esri</a>',
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    maxZoom: 20
});
let googleEarth = L.tileLayer('https://storage.googleapis.com/global-surface-water/tiles2021/transitions/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.thunderforest.com/maps/landscape/">Thunderforest</a>',
});

// INIT MAP
// Initialize the map with the default basemap
const coorBali = [-8.198517680287658, 115.10051848149178];

let map = L.map('map-frontpage', {
    layers: [openStreetMap],
    center: coorBali,
    zoom: 10,
    minZoom: 5,
    zoomControl: false
});


// custom marker Baresoil
let baresoilIcon = L.icon({
    iconUrl: 'assets/icons/icon-marker/baresoil.png',
    iconSize: [25, 32], // ukuran ikon
    iconAnchor: [16, 32], // anchor point pada ikon
    popupAnchor: [0, -32]
});
// custom marker Cassava
let cassavaIcon = L.icon({
    iconUrl: 'assets/icons/icon-marker/cassava.png',
    iconSize: [25, 32], // ukuran ikon
    iconAnchor: [16, 32], // anchor point pada ikon
    popupAnchor: [0, -32]
});

// LAYER GROUP
// const baresoil = L.layerGroup();
const crop = L.layerGroup();
const paddy = L.layerGroup();

// Custom zoom control
let customZoomControl = L.control.zoom({
    position: 'bottomright'  // Set the position to bottom right
});
// Add the custom zoom control to the map
map.addControl(customZoomControl);


// Fungsi untuk mengganti basemap
function changeBasemap(newBasemap) {
    map.eachLayer(function (layer) {
        map.removeLayer(layer);
    });
    newBasemap.addTo(map);
}

// GET ELEMENT CONTROL BASEMAP
// Event listener untuk pilihan basemap OpenStreetMap
document.querySelector('input[value="openStreetMap"]').addEventListener('change', function () {
    changeBasemap(openStreetMap);
});

// Event listener untuk pilihan basemap GoogleStreet
document.querySelector('input[value="googleStreetMap"]').addEventListener('change', function () {
    changeBasemap(googleStreetMap);
});

// Event listener untuk pilihan basemap Satellite
document.querySelector('input[value="satelliteMap"]').addEventListener('change', function () {
    changeBasemap(satelliteMap);
});

// Event listener untuk pilihan basemap Hibrid
document.querySelector('input[value="googleHibridMap"]').addEventListener('change', function () {
    changeBasemap(googleHibridMap);
});

// Event listener untuk pilihan basemap open topo
document.querySelector('input[value="openTopoMap"]').addEventListener('change', function () {
    changeBasemap(openTopoMap);
});
// Event listener untuk pilihan basemap open topo
document.querySelector('input[value="esriWorldStreetMap"]').addEventListener('change', function () {
    changeBasemap(esriWorldStreetMap);
});
// Event listener untuk pilihan basemap open topo
document.querySelector('input[value="esriSatelite"]').addEventListener('change', function () {
    changeBasemap(esriSatelite);
});
// Event listener untuk pilihan basemap open topo
document.querySelector('input[value="googleEarth"]').addEventListener('change', function () {
    changeBasemap(googleEarth);
});

// Memilih semua gambar basemap
let basemapImages = document.querySelectorAll('.sidebar-basemap img');

// Menambahkan event listener pada setiap gambar basemap
basemapImages.forEach(function (image) {
    image.addEventListener('click', function () {
        let radio = this.closest('label').querySelector('input[type="radio"]');
        radio.checked = true;

        let selectedBasemap = radio.value;

        map.eachLayer(function (layer) {
            map.removeLayer(layer);
        });

        switch (selectedBasemap) {
            case 'openStreetMap':
                openStreetMap.addTo(map);
                break;
            case 'googleStreetMap':
                googleStreetMap.addTo(map);
                break;
            case 'satelliteMap':
                satelliteMap.addTo(map);
                break;
            case 'googleHibridMap':
                googleHibridMap.addTo(map);
                break;
            case 'openTopoMap':
                openTopoMap.addTo(map);
                break;
            case 'esriWorldStreetMap':
                esriWorldStreetMap.addTo(map);
                break;
            case 'esriSatelite':
                esriSatelite.addTo(map);
                break;
            case 'googleEarth':
                googleEarth.addTo(map);
                break;
            default:
                break;
        }

    });
});

function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.popupContent);
    }
}

const bataKecamatan = L.layerGroup();
const kelompokTani = L.layerGroup();

// Event for checkbox
function checkboxEventListener(checkboxId, layer) {
    document.getElementById(checkboxId).addEventListener("change", function () {
        if (this.checked) {
            layer.addTo(map); // Dislay layer to map
            // console.log("tes");
        } else {
            layer.removeFrom(map); // Remove layer
        }
    });
}

checkboxEventListener("batas-kecamatan", bataKecamatan);
checkboxEventListener("kelompok-tani", kelompokTani);

const popUpContent = `
                    <div classs='w-32 h-36'>
                    <div class="md:pb-2">
                    <div class="relative bg-dark dark:bg-black">
                        <div class="flex items-center justify-between md:pt-2 md:pb-2 border-b rounded-t dark:border-gray-600">
                            <h3 class="text-xl font-medium text-gray-900 dark:text-white">
                                'Data awlr'
                            </h3>
                        </div>
                        <div class="space-y-4 overflow-y-auto h-96">

                            <div class="flex flex-col justify-center items-center m-2">
                                
                                <h3 class='text-gray-600 dark:text-gray-400 mt-1'>Gambar.</h3>
                            </div>
                            <div class="relative overflow-x-auto">
                                <table class="w-full text-sm text-left rtl:text-right text-gray-600 dark:text-gray-400 table-fixed">
                                    <tbody>
                                        <tr class='border-b border-t'>
                                            <td class='px-0 py-2 w-36'>Data </td>
                                            <td class='px-0 py-2 w-2'>: </td>
                                            <td class='px-0 py-2'>Data</td>
                                        </tr>                                                                    </tbody>
                                </table>
                            </div>

                        </div>

                    </div>
                    </div>
                    </div>
                    `;

// batas kecamatan
fetch('/src/data-spasial/batas-kec-buleleng.geojson', {
    method: 'GET'
})
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Proses respons sebagai JSON
        return response.json();

    })
    .then(data => {
        // Lakukan sesuatu dengan data GeoJSON yang diterima
        console.log(data);
        L.geoJSON(data.features, {
            style: function (feature) {
                return {
                    color: 'black',
                    weight: 2,
                    opacity: 1
                };
            },
            onEachFeature: onEachFeature
        }).addTo(bataKecamatan);
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });

// kelompok tani
fetch('/src/data-spasial/kelompok-tani.geojson', {
    method: 'GET'
})
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Proses respons sebagai JSON
        return response.json();

    })
    .then(data => {

        const popUpContent = `
                    <div classs='w-32 h-36 popup-container'>
                    <div class="md:pb-2">
                    <div class="relative bg-dark dark:bg-black">
                        <div class="flex items-center justify-between md:pt-2 md:pb-2 border-b rounded-t dark:border-gray-600">
                        
                            <h3 class="text-xl font-medium text-gray-900 dark:text-white">
                                Data Kelompok Tani
                            </h3>
                        </div>
                        <div class="space-y-4 overflow-y-auto h-96">

                            
                            <div class="relative overflow-x-auto">
                                <table class="w-full text-sm text-left rtl:text-right text-gray-600 dark:text-gray-400 table-fixed">
                                    <tbody>
                                        <tr class='border-b border-t'>
                                            <td class='px-0 py-2 w-36'>Data </td>
                                            <td class='px-0 py-2 w-2'>: </td>
                                            <td class='px-0 py-2'>Data</td>
                                        </tr>                                                                    </tbody>
                                </table>
                            </div>

                        </div>

                    </div>
                    </div>
                    </div>
                    `;

        L.geoJSON(data.features, {
            onEachFeature: onEachFeature
        }).addTo(kelompokTani).bindPopup(popUpContent);
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
