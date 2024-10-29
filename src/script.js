document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const contactList = document.getElementById('contactList');

    function fetchContacts() {
        fetch('http://127.0.0.1:5000/contacts')
            .then(response => response.json())
            .then(data => {
                contactList.innerHTML = '';
                data.forEach(contact => {
                    const li = document.createElement('li');
                    li.textContent = `${contact[1]} - ${contact[2]} (Location: ${contact[3]})`;
                    li.setAttribute('data-id', contact[0]); // Set data-id for later reference
                    contactList.appendChild(li);
                });
            });
    }

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const location = document.getElementById('location').value;

        fetch('http://127.0.0.1:5000/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, phone, location })
        }).then(() => {
            fetchContacts();
            contactForm.reset();
        });
    });

    fetchContacts();
});