let map; // Global map variable that resets on each click

function updateBreedPieChart(breedCounts, rescueType) {
    // To extract labels and values from the object
    const labels = Object.keys(breedCounts);
    const values = Object.values(breedCounts);

    const chartData = [{
        labels: labels,
        values: values,
        type: 'pie',
        textinfo: 'percent',
        insidetextorientation: 'radial'
    }];

    const layout = {
        title: `Breed Distribution: ${rescueType.charAt(0).toUpperCase() + rescueType.slice(1)}`,
        height: 400,
        margin: { t: 50, b: 50, l: 50, r: 50 }
    };

    Plotly.newPlot('pie-chart', chartData, layout);
}

function updateMap(lat, lng, name) {
    if (map) {
        map.remove(); // Prevents memory leaks and overlay errors 
    }
    // To properly initialize the map index and coordinates
    map = L.map('map').setView([lat, lng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);

    L.marker([lat, lng]).addTo(map)
        .bindPopup(`<b>Animal: ${name}</b>`)
        .openPopup();
}

async function loadAnimals(rescueType = 'all') {
    const tableBody = document.querySelector('#resultsTable tbody');
    tableBody.innerHTML = '<tr><td colspan="8">Searching...</td></tr>'; 

    try {
        //To pass the selection as a URL parameter
        const response = await fetch(`http://localhost:3000/api/animals/filter?type=${rescueType}`);
        const data = await response.json();
        
        //Calculate Breed Distribution for the Pie Chart
        const breedCounts = {};
        data.forEach(animal => {
            breedCounts[animal.breed] = (breedCounts[animal.breed] || 0) + 1;
        });
        //Update the Pie Chart with the aggregated data
        updateBreedPieChart(breedCounts, rescueType);
        tableBody.innerHTML = '';
        data.forEach(animal => {
        //data-lat and data-lng attributes to the <tr> tag to map to the grid coordinates from the database
        tableBody.innerHTML += `
            <tr data-lat="${animal.location_lat}" data-lng="${animal.location_long}" style="cursor: pointer;">
                <td>${animal.animal_id}</td>
                <td>${animal.animal_type}</td>
                <td>${animal.breed}</td>
                <td>${animal.color}</td>
                <td>${animal.age_upon_outcome}</td>
                <td>${animal.outcome_type}</td>
                <td>${animal.sex_upon_outcome}</td>
                <td>${animal.age_upon_outcome_in_weeks}</td>
            </tr>
        `;
    });
    if (data.length > 0) {
            const firstRow = tableBody.querySelector('tr');
            selectRow(firstRow); // Trigger the map update
        }
    } catch (error) {
        tableBody.innerHTML = '<tr><td colspan="8">Error loading data.</td></tr>';
    }
}
// Reusable procedure for row selection logic
function selectRow(row) {
    const lat = parseFloat(row.getAttribute('data-lat'));
    const lng = parseFloat(row.getAttribute('data-lng'));
    const name = row.cells[0].innerText;

    if (!isNaN(lat) && !isNaN(lng)) {
        updateMap(lat, lng, name);
        
        // Visual feedback
        document.querySelectorAll('#resultsTable tr').forEach(r => r.style.backgroundColor = '');
        row.style.backgroundColor = '#d2f3ff';
    }
}

// On Initial Page Load
document.addEventListener('DOMContentLoaded', () => {
    loadAnimals('all'); // Automatically loads "Reset/All" on startup
});

// On Filter Button Click
document.getElementById('fetchDogs').addEventListener('click', () => {
    const rescueType = document.getElementById('rescueType').value;
    loadAnimals(rescueType);
});

// Row Selection Listener
document.querySelector('#resultsTable tbody').addEventListener('click', (e) => {
    const row = e.target.closest('tr');
    if (row) selectRow(row);
});