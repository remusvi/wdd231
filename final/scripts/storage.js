// Local Storage Module for Beacon Hosting

export function initStorage() {
    // 1. Track site visits (satisfies general state persistence)
    let visitCount = localStorage.getItem("beaconVisits") || 0;
    visitCount++;
    localStorage.setItem("beaconVisits", visitCount);
}

// 2. Save a server ID to bookmarked favorites
export function saveBookmark(serverId) {
    let bookmarks = getBookmarks();

    if (!bookmarks.includes(serverId)) {
        bookmarks.push(serverId);
        localStorage.setItem("beaconBookmarks", JSON.stringify(bookmarks));
        alert("Server preset bookmarked successfully!");
    } else {
        // Optional toggle: remove if already bookmarked
        bookmarks = bookmarks.filter(id => id !== serverId);
        localStorage.setItem("beaconBookmarks", JSON.stringify(bookmarks));
        alert("Server preset removed from bookmarks.");
    }
}

// 3. Retrieve saved bookmarks
export function getBookmarks() {
    const data = localStorage.getItem("beaconBookmarks");
    return data ? JSON.parse(data) : [];
}

// 4. Check if a specific server is bookmarked
export function isBookmarked(serverId) {
    const bookmarks = getBookmarks();
    return bookmarks.includes(serverId);
}
