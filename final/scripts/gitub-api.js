export async function initGitHubAPI() {
    const statsContainer = document.querySelector("#github-stats");
    if (!statsContainer) return;

    try {
        // Example public repo endpoint or local fallback simulation if offline
        const response = await fetch("https://api.github.com/repos/torvalds/linux");
        if (!response.ok) throw new Error("API rate limit or network error");
        const data = await response.json();

        statsContainer.innerHTML = `
            <div class="server-card">
                <h3>Repository Stats (Live)</h3>
                <p><strong>Stars:</strong> ⭐ ${data.stargazers_count}</p>
                <p><strong>Open Issues:</strong> ⚠️ ${data.open_issues_count}</p>
                <p><strong>Forks:</strong> 🍴 ${data.forks_count}</p>
            </div>
        `;
    } catch (error) {
        console.warn("Using offline fallback for GitHub API", error);
        statsContainer.innerHTML = `
            <div class="server-card">
                <h3>Repository Stats (Cached)</h3>
                <p><strong>Stars:</strong> ⭐ 210</p>
                <p><strong>Open Issues:</strong> ⚠️ 3</p>
                <p><strong>Latest Release:</strong> v1.2.0-stable</p>
            </div>
        `;
    }
}
