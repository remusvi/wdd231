document.addEventListener('DOMContentLoaded', () => {
  getDiscoverData();
  handleVisitorMessage();
  setFooterInfo();
  setupHamburgerMenu();
});

// Fetch JSON data asynchronously
async function getDiscoverData() {
  try {
    const response = await fetch('data/discover.json');
    if (response.ok) {
      const data = await response.json();
      renderCards(data);
    } else {
      console.error('Failed to load discover data:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching discover data:', error);
  }
}

// Render cards dynamically
function renderCards(items) {
  const container = document.getElementById('discover-grid');
  if (!container) return;

  container.innerHTML = '';

  items.forEach((item, index) => {
    const card = document.createElement('article');
    card.classList.add('discover-card');
    card.style.gridArea = `card${index + 1}`;

    card.innerHTML = `
      <h2>${item.name}</h2>
      <figure>
        <img src="${item.image}" alt="${item.name}" width="300" height="200" loading="lazy">
      </figure>
      <address>${item.address}</address>
      <p>${item.description}</p>
      <button type="button">Learn More</button>
    `;

    container.appendChild(card);
  });
}

// Calculate days between visits using localStorage
function handleVisitorMessage() {
  const messageElement = document.getElementById('visitor-message');
  if (!messageElement) return;

  const lastVisit = localStorage.getItem('lastVisitDate');
  const now = Date.now();

  if (!lastVisit) {
    messageElement.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const msPerDay = 1000 * 60 * 60 * 24;
    const daysDifference = Math.floor((now - parseInt(lastVisit, 10)) / msPerDay);

    if (daysDifference < 1) {
      messageElement.textContent = "Back so soon! Awesome!";
    } else if (daysDifference === 1) {
      messageElement.textContent = "You last visited 1 day ago.";
    } else {
      messageElement.textContent = `You last visited ${daysDifference} days ago.`;
    }
  }

  localStorage.setItem('lastVisitDate', now.toString());
}

// Mobile Hamburger Menu
function setupHamburgerMenu() {
  const navButton = document.getElementById('hamburger-menu');
  const navList = document.querySelector('.navigation');

  if (navButton && navList) {
    navButton.addEventListener('click', () => {
      navList.classList.toggle('open');
      navButton.classList.toggle('open');
    });
  }
}

// Footer Info
function setFooterInfo() {
  const yearElem = document.getElementById('currentyear');
  const modifiedElem = document.getElementById('lastModified');

  if (yearElem) yearElem.textContent = new Date().getFullYear();
  if (modifiedElem) modifiedElem.textContent = `Last Modification: ${document.lastModified}`;
}
