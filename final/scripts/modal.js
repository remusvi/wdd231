export function openConfigModal(server) {
    let modal = document.querySelector("#config-modal");
    if (!modal) {
        modal = document.createElement("dialog");
        modal.id = "config-modal";
        modal.innerHTML = `
            <div id="modal-content"></div>
            <button id="close-modal" class="btn-primary" style="margin-top:1rem;">Close</button>
        `;
        document.body.appendChild(modal);
        modal.querySelector("#close-modal").addEventListener("click", () => modal.close());
    }

    const content = modal.querySelector("#modal-content");
    content.innerHTML = `
        <h2>${server.name} Configuration</h2>
        <p><strong>Software:</strong> ${server.software} v${server.mcVersion}</p>
        <p><strong>Allocation:</strong> -Xmx${server.minRamGB}G -Xms${server.minRamGB}G</p>
        <p><strong>Startup Flag:</strong> <code>java -jar ${server.software.toLowerCase()}.jar nogui</code></p>
    `;
    modal.showModal();
}
