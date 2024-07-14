<!-- NAVBAR -->
<nav class="navbar-top border-gray-200 dark:bg-gray-900">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
    <a href="/" class="flex items-center space-x-1 sm:space-x-3 rtl:space-x-reverse">
      <img src="https://distan.bulelengkab.go.id/public/assets/image/logo_buleleng_100.png" class="h-12"
        alt="Logo" />
      <div class="flex flex-col gap-0">
        <span class="self-start text-xs sm:text-lg sm:font-medium dark:text-white">Sistem Informasi
          Geografis</span>
        <span class="self-start sm:text-2xl font-semibold dark:text-white">Dinas
          Pertanian Kab. Buleleng</span>
      </div>
    </a>
    <button data-collapse-toggle="navbar-default" type="button"
      class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      aria-controls="navbar-default" aria-expanded="false">
      <span class="sr-only">Open main menu</span>
      <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M1 1h15M1 7h15M1 13h15" />
      </svg>
    </button>
    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul
        class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 ">
        <li>
          <a href="#" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:p-0 "
            aria-current="page">Home</a>
        </li>
        <li>
          <a href="#" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:p-0 "
            aria-current="page">About</a>
        </li>
        <li>
          <a href="/login" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:p-0 "
            aria-current="page">Login</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

<!-- Sidebar basemap -->
<div class="sidebar-basemap bg-gray-50 mt-0" id="sidebar-basemap">
  <h5 class="text-center">Basemap</h5>
  <div class="border mb-2"></div>
  {{-- <div class="flex-row">
      <div class="columns-2 my-2">
        <div class="form-check">
          <input class="form-checkbox itemCheckbox border" type="checkbox" value="" id="googleMapsLabel"
            data-layer="markerGroup1">
          <label class="form-check-label" for="googleMapsLabel">
            Label
          </label>
        </div>
      </div>
    </div> --}}
  <div class="flex-row">
    <div class="columns-2">
      <div class="basemap-options">
        <label>
          <img src="{{ asset("/src/assets/icons/icon-basemap/openstreetmap_blackandwhite.png") }}" alt="OpenStreetMap"
            class="w-32 h-28 object-cover">
          <input class="form-radio" type="radio" name="basemap" value="openStreetMap" checked>
          OSM
        </label>
        <label>
          <img src="{{ asset("/src/assets/icons/icon-basemap/google-streets.png") }}" alt="GoogleStreetMap"
            class="w-32 h-28 object-cover">
          <input class="form-check-input" type="radio" name="basemap" value="googleStreetMap">
          Street
        </label>

      </div>
    </div>

    <div class="columns-2">
      <div class="basemap-options">
        <label>
          <img src="{{ asset("/src/assets/icons/icon-basemap/here_satelliteday.png") }}" alt="Satellite "
            class="w-32 h-28 object-cover">
          <input class="form-check-input" type="radio" name="basemap" value="satelliteMap">
          Satelite
        </label>
        <label>
          <img src="{{ asset("/src/assets/icons/icon-basemap/google-hibrid.png") }}" alt="Satellite "
            class="w-32 h-28 object-cover">
          <input class="form-check-input" type="radio" name="basemap" value="googleHibridMap">
          Hibrid
        </label>
      </div>
    </div>
  </div>
  <div class="flex-row">
    <div class="columns-2">
      <div class="basemap-options">
        <label>
          <img src="{{ asset("/src/assets/icons/icon-basemap/esri-street.png") }}" alt="Esri"
            class="w-32 h-28 object-cover">
          <input class="form-check-input" type="radio" name="basemap" value="esriWorldStreetMap">
          Esri Street
        </label>
        <label>
          <img src="{{ asset("/src/assets/icons/icon-basemap/topo-map.png") }}" alt="OpenTopoMap"
            class="w-32 h-28 object-cover">
          <input class="form-check-input" type="radio" name="basemap" value="openTopoMap">
          TopoMap
        </label>
      </div>
    </div>

    <div class="columns-2">
      <div class="basemap-options">
        <label>
          <img src="{{ asset("/src/assets/icons/icon-basemap/esri-satelite.png") }}" alt="Esri "
            class="w-32 h-28 object-cover">
          <input class="form-check-input" type="radio" name="basemap" value="esriSatelite">
          Esri Satelite
        </label>
        <label>
          <img src="{{ asset("/src/assets/icons/icon-basemap/google-earth.png") }}" alt="Thunderforest "
            class="w-32 h-28 object-cover">
          <input class="form-check-input" type="radio" name="basemap" value="googleEarth">
          Earth
        </label>
      </div>
    </div>
  </div>
</div>

<!-- Sidebar layer -->
<div class="sidebar-layer bg-white mt-0 pb-5" id="sidebar-layer">
  <h5 class="text-center">Layer</h5>
  <div class="border"></div>
  <div class="mt-4">
    <div class="border rounded">
      <!-- <div class="border-top"></div> -->
      <p class="bg-secondary p-2 m-0 rounded-top fw-bold">Administrasi</p>
      <div class="p-2">
        <div class="form-check">
          <input name="batas-kecamatan"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            type="checkbox" value="" id="batas-kecamatan" data-layer="batas-kecamatan">
          <label class="form-check-label" for="batas-kecamatan">
            Batas Kecamatan
          </label>
        </div>
      </div>

      <!-- Tambahkan item lain di sini -->
    </div>
    <div class="border rounded mt-4">
      <!-- <div class="border-top"></div> -->
      <p class="bg-secondary p-2 m-0 rounded-top fw-bold">Pertanian</p>
      <div class="p-2">
        <div class="form-check">
          <input name="kelompok-tani"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            type="checkbox" value="" id="kelompok-tani" data-layer="kelompok-tani">
          <label class="form-check-label" for="kelompok-tani">
            Kelompok Tani
          </label>
        </div>
        <div class="form-check">
          <input name="layer_onther"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            type="checkbox" value="" id="layer_onther" data-layer="layer_onther">
          <label class="form-check-label" for="layer_onther">
            Layer Lainnya...
          </label>
        </div>

      </div>

      <!-- Tambahkan item lain di sini -->
    </div>
  </div>

</div>

<!-- Sidebar legend -->
<div class="container sidebar-legend bg-white mt-0 pb-5" id="sidebar-legend">
  <h5 class="text-center">Legenda</h5>
  <div class="border mb-2"></div>
  <div class="col">
    <div class="border rounded mt-2">
      <!-- <div class="border-top"></div> -->
      <p class="bg-secondary p-2 m-0 rounded-top fw-bold">Legenda Informasi Pertanian</p>
      <div class="p-2">
        <div class="">
          <img class="rounded float-left" src="{{ asset("/src/assets/icons/icon-marker/corn.png") }}" alt="">
          Jagung
          </label>
        </div>
        <div class="">
          <img class="rounded float-left" src="{{ asset("/src/assets/icons/icon-marker/paddy.png") }}"
            alt="">
          Padi
          </label>
        </div>
      </div>

      <!-- Tambahkan item lain di sini -->
    </div>
  </div>
</div>

</div>

<!-- Sidebar analisis -->
<div class="container sidebar-analisis bg-white mt-0 pb-5" id="sidebar-analisis">
  <h5 class="text-center">Information</h5>
  <div class="border mb-2"></div>

</div>

<!-- MAP -->
<div id="map-frontpage" class="map-container">

</div>
