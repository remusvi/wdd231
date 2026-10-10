import { initServers } from './fetch-servers.js';
import { initGitHubAPI } from './github-api.js';
import { initStorage } from './storage.js';

document.addEventListener("DOMContentLoaded", () => {
    // Hamburger menu toggle
    const hamburger = document.querySelector("#hamburger-btn");
    const nav = document.querySelector("nav");
    if (hamburger && nav) {
        hamburger.addEventListener("click", () => {
            nav.classList.toggle("open");
            hamburger.textContent = nav.classList.contains("open") ? "✕" : "☰";
        });
    }

    // Dynamic year and footer
    const yearEl = document.querySelector("#current-year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    const modEl = document.querySelector("#last-modified");
    if (modEl) modEl.textContent = `Last Modified: ${document.lastModified}`;

    // Initialize feature modules depending on page
    initServers();
    initGitHubAPI();
    initStorage();
});
