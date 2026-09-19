document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Footer Info
    const currentYearSpan = document.getElementById('current-year');
    const lastModifiedParagraph = document.getElementById('lastModified');

    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    if (lastModifiedParagraph) {
        lastModifiedParagraph.textContent = `Last Modification: ${document.lastModified}`;
    }

    // 2. Responsive Hamburger Menu Toggle
    const hambutton = document.querySelector('#menu');
    const navigation = document.querySelector('.navigation');

    if (hambutton && navigation) {
        hambutton.addEventListener('click', () => {
            navigation.classList.toggle('open');
            hambutton.classList.toggle('open');
        });
    }

    // 3. OpenWeatherMap API Integration
    const apiKey = "YOUR_OPENWEATHERMAP_API_KEY"; // Replace with your active API key
    // Coordinates for Kingstown, Saint Vincent and the Grenadines (approx: 13.1585, -61.2250)
    const lat = 13.1585;
    const lon = -61.2250;

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    async function apiFetch() {
        try {
            // Fetch Current Weather
            const response = await fetch(currentWeatherUrl);
            if (response.ok) {
                const data = await response.json();
                displayCurrentWeather(data);
            } else {
                throw Error(await response.text());
            }

            // Fetch Forecast
            const forecastResponse = await fetch(forecastUrl);
            if (forecastResponse.ok) {
                const forecastData = await forecastResponse.json();
                displayForecast(forecastData);
            } else {
                throw Error(await forecastData.text());
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
            document.getElementById('weather-desc').textContent = "Weather data unavailable.";
        }
    }

    function displayCurrentWeather(data) {
        const tempElement = document.getElementById('current-temp');
        const descElement = document.getElementById('weather-desc');
        const iconElement = document.getElementById('weather-icon');

        if (tempElement && descElement && iconElement) {
            tempElement.textContent = Math.round(data.main.temp);
            const desc = data.weather[0].description;
            descElement.textContent = desc.charAt(0).toUpperCase() + desc.slice(1);
            const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            iconElement.setAttribute('src', iconSrc);
            iconElement.setAttribute('alt', desc);
        }
    }

    function displayForecast(data) {
        const forecastList = document.getElementById('forecast-list');
        if (!forecastList) return;

        forecastList.innerHTML = '';

        // Filter forecast data for roughly 12:00 PM each day to get a 3-day snapshot
        const filteredList = data.list.filter(item => item.dt_txt.includes('12:00:00'));

        // Take the next 3 days
        filteredList.slice(0, 3).forEach(day => {
            const dateObj = new Date(day.dt * 1000);
            const options = { weekday: 'short' };
            const dayName = dateObj.toLocaleDateString('en-US', options);

            const listItem = document.createElement('li');
            listItem.innerHTML = `<span>${dayName}:</span> <strong>${Math.round(day.main.temp)}&deg;C</strong> - ${day.weather[0].description}`;
            forecastList.appendChild(listItem);
        });
    }

    apiFetch();

    // 4. Member Spotlights (JSON & Fetch API)
    const membersJsonUrl = 'data/members.json';

    async function loadSpotlights() {
        try {
            const response = await fetch(membersJsonUrl);
            if (response.ok) {
                const members = await response.json();
                displaySpotlights(members);
            } else {
                throw Error("Failed to load members JSON data.");
            }
        } catch (error) {
            console.error("Error loading spotlights:", error);
        }
    }

    function displaySpotlights(members) {
        const spotlightsContainer = document.getElementById('spotlights');
        if (!spotlightsContainer) return;

        // Filter for Gold (level 3) or Silver (level 2) members
        const qualifiedMembers = members.filter(member => member.membershipLevel >= 2 || member.membershipLevel === "Gold" || member.membershipLevel === "Silver");

        // Shuffle array and pick 2 or 3 random members
        const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());
        const selectedMembers = shuffled.slice(0, 3); // Pick 3 members

        spotlightsContainer.innerHTML = `<h3>Featured Chamber Members</h3>`;
        const wrapper = document.createElement('div');
        wrapper.className = 'spotlights-grid';

        selectedMembers.forEach(member => {
            const card = document.createElement('div');
            card.className = 'spotlight-card';
            card.innerHTML = `
                <img src="images/${member.image}" alt="${member.name} Logo">
                <h4>${member.name}</h4>
                <p class="membership-badge">${getMembershipName(member.membershipLevel)} Member</p>
                <p>📞 ${member.phone}</p>
                <p>📍 ${member.address}</p>
                <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
            `;
            wrapper.appendChild(card);
        });

        spotlightsContainer.appendChild(wrapper);
    }

    function getMembershipName(level) {
        if (level === 3 || level === "Gold") return "Gold";
        if (level === 2 || level === "Silver") return "Silver";
        return "Member";
    }

    loadSpotlights();
});
