document.addEventListener("DOMContentLoaded", () => {

    const timestampField = document.getElementById("timestamp");
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    const infoButtons = document.querySelectorAll(".info-btn");
    const closeButtons = document.querySelectorAll(".close-modal");

    infoButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const modalId = btn.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.showModal();
            }
        });
    });

    closeButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const modal = btn.closest("dialog");
            if (modal) {
                modal.close();
            }
        });
    });

    const modals = document.querySelectorAll("dialog");
    modals.forEach(modal => {
        modal.addEventListener("click", (e) => {
            const dialogDimensions = modal.getBoundingClientRect();
            if (
                e.clientX < dialogDimensions.left ||
                e.clientX > dialogDimensions.right ||
                e.clientY < dialogDimensions.top ||
                e.clientY > dialogDimensions.bottom
            ) {
                modal.close();
            }
        });
    });
});
