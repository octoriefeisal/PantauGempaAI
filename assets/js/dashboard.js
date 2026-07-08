async function loadEarthquakes() {

    const earthquakes = await getLatestEarthquakes();

    // ==========================
    // Map
    // ==========================

    const map = L.map("map").setView([20, 0], 2);

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution: "© OpenStreetMap"
        }
    ).addTo(map);

    // ==========================
    // Dashboard Summary
    // ==========================

    const summary = document.getElementById("dashboard-summary");

    const total = earthquakes.length;

    const maxMagnitude = Math.max(
        ...earthquakes.map(q => q.properties.mag || 0)
    );

    const tsunamiCount = earthquakes.filter(
        q => q.properties.tsunami === 1
    ).length;

    summary.innerHTML = `
        <div class="summary-container">

            <div class="summary-card">
                <h3>🌍 Total Gempa</h3>
                <h1>${total}</h1>
            </div>

            <div class="summary-card">
                <h3>📈 Magnitude Terbesar</h3>
                <h1>${maxMagnitude}</h1>
            </div>

            <div class="summary-card">
                <h3>🌊 Potential Tsunami</h3>
                <h1>${tsunamiCount}</h1>
            </div>

        </div>
    `;

    // ==========================
    // Earthquake Cards
    // ==========================

    const container = document.getElementById("earthquake-container");

    container.innerHTML = "";

    earthquakes.forEach(quake => {

        // Magnitude
        const mag = Number(
            (quake.properties.mag || 0).toFixed(1)
        );

        // Level & Color
        const result = getMagnitudeLevel(mag);

        const level = result.level;

        const color = result.color;

        // Tsunami
        const tsunami = getTsunamiStatus(
            quake.properties.tsunami
        );

        // Marker Map
        loadMap(
            map,
            quake,
            mag,
            tsunami,
            color
        );

        // Card
        container.innerHTML += `

            <div class="quake-card"
                 style="border-left:8px solid ${color};">

                <span
                    class="badge"
                    style="background:${color};">

                    ${level}

                </span>

                <h2 class="magnitude">

                    M ${mag}

                </h2>

                <h3 class="location">

                    📍 ${quake.properties.place}

                </h3>

                <p>

                    🕒
                    ${new Date(quake.properties.time)
                        .toLocaleString("id-ID")}

                </p>

                <p>

                    ${tsunami}

                </p>

                <p>

                    Status :
                    <b>${quake.properties.status.toUpperCase()}</b>

                </p>

            </div>

        `;

    });

}

loadEarthquakes();