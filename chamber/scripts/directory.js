document.addEventListener("DOMContentLoaded", () => {

    const menuButton = document.querySelector("#menu-button");
    const navigationBar = document.querySelector("#navigation-bar");

    if (menuButton && navigationBar) {
        menuButton.addEventListener("click", () => {
            navigationBar.classList.toggle("open");
        });
    }

    const membersContainer = document.querySelector("#members-container");
    const gridButton = document.querySelector("#grid-view");
    const listButton = document.querySelector("#list-view");

    async function getMembers() {
        try {
            const response = await fetch("data/members.json");
            if (!response.ok) throw new Error("Failed to load members data.");
            const data = await response.json();
            displayMembers(data);
        } catch (error) {
            console.error("Error fetching members:", error);
            membersContainer.innerHTML = "<p>Unable to load directory data at this time.</p>";
        }
    }

    function displayMembers(members) {
        membersContainer.innerHTML = "";
        members.forEach(member => {
            const card = document.createElement("div");
            card.classList.add("member-card");

            card.innerHTML = `
                <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="100" height="100">
                <div>
                    <h3>${member.name}</h3>
                    <p class="membership-level">Level: ${getMembershipText(member.membership)}</p>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
                </div>
            `;
            membersContainer.appendChild(card);
        });
    }

    function getMembershipText(level) {
        switch(level) {
            case 3: return "Gold Member";
            case 2: return "Silver Member";
            default: return "Member";
        }
    }


    if (gridButton && listButton) {
        gridButton.addEventListener("click", () => {
            membersContainer.classList.add("grid-view");
            membersContainer.classList.remove("list-view");
            gridButton.classList.add("active");
            listButton.classList.remove("active");
        });

        listButton.addEventListener("click", () => {
            membersContainer.classList.add("list-view");
            membersContainer.classList.remove("grid-view");
            listButton.classList.add("active");
            gridButton.classList.remove("active");
        });
    }

    getMembers();


    const currentYearSpan = document.querySelector("#current-year");
    const lastModifiedSpan = document.querySelector("#last-modified");

    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }
});
