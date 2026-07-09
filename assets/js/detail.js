const params = new URLSearchParams(window.location.search);

const earthquakeId = params.get("id");

document.getElementById("detail-container").innerHTML = `
    <h2>ID Gempa</h2>

    <p>${earthquakeId}</p>
`;