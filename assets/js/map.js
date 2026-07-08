const markers = {};

let markerLayer;

function loadMap(map, quake, mag, tsunami, color) {

    const lat = quake.geometry.coordinates[1];
    const lng = quake.geometry.coordinates[0];

    const marker = L.circleMarker([lat, lng], {

        radius: Math.max(8, mag * 4),

        color: color,

        fillColor: color,

        fillOpacity: 0.8,

        weight: 2

    }).addTo(markerLayer);

    marker.bindPopup(`

        <div style="min-width:220px;">

            <h3 style="margin:0;color:${color};">

                🌍 Earthquake

            </h3>

            <hr>

            <p>

                📍 ${quake.properties.place}

            </p>

            <p>

                📈 Magnitude :

                <b>${mag}</b>

            </p>

            <p>

                ${tsunami}

            </p>

            <p>

                🕒

                ${new Date(
                    quake.properties.time
                ).toLocaleString("id-ID")}

            </p>

            <p>

                Status :

                <b>

                    ${quake.properties.status.toUpperCase()}

                </b>

            </p>

        </div>

    `);

    markers[quake.id] = marker;
    return marker;
}