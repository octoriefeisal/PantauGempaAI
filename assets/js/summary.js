function renderSummary(earthquakes){

    const summary =
        document.getElementById(
            "dashboard-summary"
        );

    const total =
        earthquakes.length;

    const maxMagnitude =
        Math.max(
            ...earthquakes.map(
                q => q.properties.mag || 0
            )
        );

    const tsunamiCount =
        earthquakes.filter(
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

}