const BASE_URL =
"https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary";

async function apiRequest(endpoint){

    const response = await fetch(BASE_URL + endpoint);

    if(!response.ok){

        throw new Error("Gagal mengambil data");

    }

    return await response.json();

}

async function getLatestEarthquakes(){

    const data = await apiRequest("/all_hour.geojson");

    return data.features;

}