import { openConfigModal } from './modal.js';
import { saveBookmark } from './storage.js';

export async function initServers() {
    const container = document.querySelector("#servers-container");
    if (!container) return;

    try {
        // FIX: Actually fetch the JSON file and parse it into an array
        const response = await fetch("data/data.json");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const servers = await response.json();

        renderServers(servers);

        const buttons = document.querySelectorAll(".filter-btn");
        buttons.forEach(btn => {
            btn.addEventListener("click", (e) => {
                buttons.forEach(b => b.classList.remove("active"));
                e.target.classList.add("active");
                const category = e.target.dataset.category;

                // Array filter method
                const filtered = category === "all"
                    ? servers
                    : servers.filter(s => s.category.toLowerCase() === category.toLowerCase());
                renderServers(filtered);
            });
        });

    } catch (error) {
        console.error("Error loading servers:", error);
        container.innerHTML = `<p style="color: red;">Failed to load server presets.</p>`;
    }
}

function renderServers(servers) {
    const container = document.querySelector("#servers-container");
    container.innerHTML = "";

    servers.forEach(server => {
        const card = document.createElement("div");
        card.classList.add("server-card");

        card.innerHTML = `
            <h3>${server.name}</h3>
            <p><strong>Software:</strong> ${server.software} (${server.mcVersion})</p>
            <p><strong>Category:</strong> ${server.category}</p>
            <p><strong>Min RAM:</strong> ${server.minRamGB} GB</p>
            <p><strong>Rec. Players:</strong> ${server.recommendedPlayers}</p>
            <p>${server.summary}</p>
            <button class="btn-primary config-btn" style="margin-top:0.5rem; font-size:0.8rem; padding:0.4rem 0.8rem;">View Config</button>
        `;

        card.querySelector(".config-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            openConfigModal(server);
        });

        container.appendChild(card);
    });
}
