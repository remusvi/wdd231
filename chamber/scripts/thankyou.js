document.addEventListener("DOMContentLoaded", () => {
    const currentUrl = window.location.href;
    const formData = currentUrl.split("?")[1];

    if (formData) {
        const urlParams = new URLSearchParams(formData);
        const resultsElement = document.getElementById("results");

        const fname = urlParams.get("fname") || "N/A";
        const lname = urlParams.get("lname") || "N/A";
        const email = urlParams.get("email") || "N/A";
        const phone = urlParams.get("phone") || "N/A";
        const organization = urlParams.get("organization") || "N/A";
        const timestamp = urlParams.get("timestamp") || "N/A";

        // Format Date String if valid
        let formattedDate = timestamp;
        if (timestamp !== "N/A") {
            const dateObj = new Date(decodeURIComponent(timestamp));
            if (!isNaN(dateObj)) {
                formattedDate = dateObj.toLocaleString();
            }
        }

        resultsElement.innerHTML = `
            <p><strong>First Name:</strong> ${decodeURIComponent(fname)}</p>
            <p><strong>Last Name:</strong> ${decodeURIComponent(lname)}</p>
            <p><strong>Email Address:</strong> ${decodeURIComponent(email)}</p>
            <p><strong>Mobile Phone:</strong> ${decodeURIComponent(phone)}</p>
            <p><strong>Organization Name:</strong> ${decodeURIComponent(organization)}</p>
            <p><strong>Submission Time:</strong> ${formattedDate}</p>
        `;
    }
});
