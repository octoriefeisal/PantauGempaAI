function renderCards(container, earthquakes, map, bounds) {

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

        // Marker
        const marker = loadMap(
            map,
            quake,
            mag,
            tsunami,
            color
        );

        bounds.push(marker.getLatLng());

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
                    ${new Date(
                        quake.properties.time
                    ).toLocaleString("id-ID")}

                </p>

                <p>

                    ${tsunami}

                </p>

                <p>

                    Status :
                    <b>
                        ${quake.properties.status.toUpperCase()}
                    </b>

                </p>

            </div>

        `;

    });

}