let map;

async function loadEarthquakes() {

    const earthquakes = await getLatestEarthquakes();

    // ==========================
    // Map
    // ==========================

    if (!map) {

        map = L.map("map").setView([20, 0], 2);

        L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
                attribution: "© OpenStreetMap"
            }
        ).addTo(map);

    }

    // Summary
    renderSummary(earthquakes);

    // ==========================
    // Earthquake Cards
    // ==========================

    const container =
        document.getElementById("earthquake-container");

    const bounds = [];

    if (markerLayer) {

        markerLayer.clearLayers();

    } else {

        markerLayer = L.layerGroup().addTo(map);

    }

    renderCards(
        container,
        earthquakes,
        map,
        bounds
    );

    renderStatistics(earthquakes);

    if (bounds.length > 0) {

        map.fitBounds(bounds, {
            padding: [50, 50]
        });

    }

}

loadEarthquakes();