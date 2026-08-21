const API_URL = "http://127.0.0.1:8000/api/contacts";

const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const list = document.getElementById("contact-list");
const contactCount = document.getElementById("contact-count");
const errorMessage = document.getElementById("error-message");

// Zeigt eine Fehlermeldung im Formularbereich an.
function showError(message) {
    errorMessage.textContent = message;
}

// Übersetzt einen technischen Netzwerkfehler in eine verständliche Meldung.
async function fetchApi(url, options) {
    try {
        return await fetch(url, options);
    } catch {
        throw new Error(
            "Das Backend ist nicht erreichbar. Bitte starte zuerst den Backend-Server auf http://127.0.0.1:8000."
        );
    }
}

// Rendert die Kontaktliste als HTML-Elemente und aktualisiert die Anzahl.
function renderContacts(contacts) {
    list.innerHTML = "";
    contactCount.textContent = `${contacts.length} ${contacts.length === 1 ? "Kontakt" : "Kontakte"}`;

    if (contacts.length === 0) {
        const emptyState = document.createElement("li");
        emptyState.className = "empty-state";
        emptyState.textContent = "Noch keine Kontakte vorhanden.";
        list.append(emptyState);
        return;
    }

    for (const contact of contacts) {
        const item = document.createElement("li");
        item.className = "contact-card";

        const avatar = document.createElement("span");
        avatar.className = "contact-avatar";
        avatar.textContent = contact.name.trim().charAt(0).toUpperCase() || "?";
        avatar.setAttribute("aria-hidden", "true");

        const info = document.createElement("div");
        info.className = "contact-info";

        const name = document.createElement("strong");
        name.className = "contact-name";
        name.textContent = contact.name;

        const details = document.createElement("div");
        details.className = "contact-details";

        const email = document.createElement("a");
        email.href = `mailto:${contact.email}`;
        email.textContent = contact.email;

        const phone = document.createElement("a");
        phone.href = `tel:${contact.phone.replace(/\s/g, "")}`;
        phone.textContent = contact.phone;

        details.append(email, phone);
        info.append(name, details);

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.type = "button";
        deleteButton.textContent = "Löschen";
        deleteButton.setAttribute("aria-label", `${contact.name} löschen`);
        deleteButton.addEventListener("click", () => deleteContact(contact.id));

        item.append(avatar, info, deleteButton);
        list.append(item);
    }
}

// Holt alle Kontakte vom Backend und aktualisiert die Anzeige.
async function loadContacts() {
    try {
        const response = await fetchApi(API_URL);
        if (!response.ok) {
            throw new Error(`Fehler beim Laden (${response.status})`);
        }
        const contacts = await response.json();
        renderContacts(contacts);
    } catch (error) {
        showError(error.message);
    }
}

// Verarbeitet das Absenden des Formulars und legt einen neuen Kontakt an.
async function createContact(event) {
    event.preventDefault();
    showError("");

    try {
        const response = await fetchApi(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: nameInput.value,
                email: emailInput.value,
                phone: phoneInput.value,
            }),
        });

        if (!response.ok) {
            throw new Error(`Fehler beim Anlegen (${response.status})`);
        }

        form.reset();
        await loadContacts();
    } catch (error) {
        showError(error.message);
    }
}

// Löscht einen Kontakt mit der ausgewählten ID aus dem Backend.
async function deleteContact(id) {
    showError("");

    try {
        const response = await fetchApi(`${API_URL}/${id}`, { method: "DELETE" });
        if (!response.ok) {
            throw new Error(`Fehler beim Löschen (${response.status})`);
        }
        await loadContacts();
    } catch (error) {
        showError(error.message);
    }
}

form.addEventListener("submit", createContact);
loadContacts();
