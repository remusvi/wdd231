export function initStorage() {
    let visitCount = localStorage.getItem("beaconVisits") || 0;
    visitCount++;
    localStorage.setItem("beaconVisits", visitCount);
    console.log(`Beacon site visit count: ${visitCount}`);
}
