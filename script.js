let contacts = [];

const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const emailInput = document.getElementById('email');
const addBtn = document.getElementById('addBtn');
const searchInput = document.getElementById('search');
const contactList = document.getElementById('contactList');

function addContact() {
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const email = emailInput.value.trim();

    if (name && (phone || email)) {
        const newContact = { name, phone, email, id: Date.now() };
        contacts.push(newContact);
        updateContactList();
        clearInputs();
    }
}

function updateContact(id) {
    const contact = contacts.find(c => c.id === id);
    if (contact) {
        nameInput.value = contact.name;
        phoneInput.value = contact.phone;
        emailInput.value = contact.email;
        addBtn.textContent = 'Update Contact';
        addBtn.onclick = () => {
            contact.name = nameInput.value.trim();
            contact.phone = phoneInput.value.trim();
            contact.email = emailInput.value.trim();
            updateContactList();
            clearInputs();
            addBtn.textContent = 'Add Contact';
            addBtn.onclick = addContact;
        };
    }
}

// Replace the existing deleteContact function with this:
function deleteContact(id) {
    const contact = contacts.find(c => c.id === id);
    if (contact && confirm(`Are you sure you want to delete ${contact.name}?`)) {
        contacts = contacts.filter(c => c.id !== id);
        updateContactList();
    }
}

function clearInputs() {
    nameInput.value = '';
    phoneInput.value = '';
    emailInput.value = '';
}

function updateContactList() {
    contactList.innerHTML = '';
    const searchTerm = searchInput.value.toLowerCase();
    
    contacts.filter(contact => 
        contact.name.toLowerCase().includes(searchTerm) ||
        contact.phone.includes(searchTerm) ||
        contact.email.toLowerCase().includes(searchTerm)
    ).forEach(contact => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="contact-info">
                <strong>${contact.name}</strong><br>
                ${contact.phone}<br>
                ${contact.email}
            </div>
            <div class="contact-actions">
                <button class="edit-btn" onclick="updateContact(${contact.id})">Edit</button>
                <button class="delete-btn" onclick="deleteContact(${contact.id})">Delete</button>
            </div>
        `;
        contactList.appendChild(li);
    });
}

addBtn.onclick = addContact;
searchInput.oninput = updateContactList;

// Load initial contacts (you can replace this with loading from localStorage or an API)
contacts = [
    { name: "John Doe", phone: "123-456-7890", email: "john@example.com", id: 1 },
    { name: "Jane Smith", phone: "098-765-4321", email: "jane@example.com", id: 2 }
];
updateContactList();