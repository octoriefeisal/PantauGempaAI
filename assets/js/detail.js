const params = new URLSearchParams(window.location.search);

const earthquakeId = params.get("id");

loadDetail();

async function loadDetail() {

    try {

        const response = await fetch(
            `https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/${earthquakeId}.geojson`
        );

        const quake = await response.json();

        renderDetail(quake);

    } catch (error) {

        console.error(error);

        document.getElementById("detail-container").innerHTML = `
            <h2>❌ Gagal mengambil data gempa.</h2>
        `;

    }

}

function renderDetail(quake) {

    const container = document.getElementById("detail-container");

    const mag = quake.properties.mag ?? "-";

    const place = quake.properties.place;

    const time = new Date(
        quake.properties.time
    ).toLocaleString("id-ID");

    const depth = quake.geometry.coordinates[2];

    const lat = quake.geometry.coordinates[1];

    const lng = quake.geometry.coordinates[0];

    const tsunami =
        quake.properties.tsunami === 1
            ? "🌊 Potential Tsunami"
            : "✅ No Tsunami";

    const ai = analyzeEarthquake(quake);

    container.innerHTML = `

        <div class="detail-card">

            <h2>🌍 ${place}</h2>

            <hr>

            <h1>M ${mag}</h1>

            <p>📏 Depth : ${depth} km</p>

            <p>📍 Latitude : ${lat}</p>

            <p>📍 Longitude : ${lng}</p>

            <p>${tsunami}</p>

            <p>🕒 ${time}</p>

            <p>Status : ${quake.properties.status}</p>

            <br>

            <a
                href="${quake.properties.url}"
                target="_blank">

                🔗 View Official USGS

            </a>

            <hr>

            <h2>🗺 Earthquake Location</h2>

            <div id="detail-map"></div>

            <hr>

            <div class="ai-card">

                <h2>🤖 AI Analysis</h2>

                <h3>Risk Level</h3>

                <p>${ai.risk}</p>

                <h3>Analysis</h3>

                <p>${ai.explanation}</p>

                <h3>Recommendation</h3>

                <p>${ai.recommendation}</p>

            </div>

        </div>

    `;

    // ==========================
    // Leaflet Map
    // ==========================

    const map = L.map("detail-map").setView([lat, lng], 7);

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution: "© OpenStreetMap"
        }
    ).addTo(map);

    L.circleMarker([lat, lng], {

        radius: Math.max(8, mag * 3),

        color: "#d32f2f",

        fillColor: "#d32f2f",

        fillOpacity: 0.8,

        weight: 2

    })

    .addTo(map)

    .bindPopup(`

        <b>${place}</b>

        <br>

        Magnitude : ${mag}

        <br>

        Depth : ${depth} km

    `)

    .openPopup();

    setTimeout(() => {

        map.invalidateSize();

    },100);

}