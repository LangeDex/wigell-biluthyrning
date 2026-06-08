requireAdmin();

// ladda alla bokningar
async function loadBookings() {
  const response = await fetch(`${API_BASE}/bookings`, {
    headers: getAuthHeader()
  });
  const bookings = await response.json();
  const tbody = document.getElementById('bookings-body');
  tbody.innerHTML = '';

  bookings.forEach(booking => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${booking.id}</td>
      <td>${booking.carId}</td>
      <td>${booking.userId}</td>
      <td>${booking.fromDate}</td>
      <td>${booking.toDate}</td>
      <td>${booking.active ? 'Aktiv' : 'Avslutad'}</td>
      <td style="white-space: nowrap;">
        <button class="btn btn--neutral" onclick="editBooking(${booking.id}, '${booking.fromDate}', '${booking.toDate}')">
          Redigera
        </button>
        <button class="btn btn--negative" onclick="deleteBooking(${booking.id})">
          Ta bort
        </button>
      </td>`;
    tbody.appendChild(row);
  });
}

// ladda alla användare
async function loadUsers() {
  const response = await fetch(`${API_BASE}/users`, {
    headers: getAuthHeader()
  });
  const users = await response.json();
  const tbody = document.getElementById('users-body');
  tbody.innerHTML = '';

  users.forEach(user => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.id}</td>
      <td>${user.username}</td>
      <td>${user.email}</td>
      <td>${user.role}</td>
      <td>
        <button class="btn btn--neutral" onclick="editUser(${user.id}, '${user.email}', '${user.role}')">
          Redigera
        </button>
        <button class="btn btn--negative" onclick="deleteUser(${user.id})">
          Ta bort
        </button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// ta bort bokning
async function deleteBooking(id) {
  if (!confirm('Ta bort bokning?')) return;
  const response = await fetch(`${API_BASE}/bookings/${id}`, {
    method: 'DELETE',
    headers: getAuthHeader()
  });
  if (response.ok) loadBookings();
}

// redigera bokning
function editBooking(id, fromDate, toDate) {
  const newFrom = prompt('Från datum (YYYY-MM-DD):', fromDate);
  const newTo = prompt('Till datum (YYYY-MM-DD):', toDate);

  if (newFrom && newTo) {
    updateBooking(id, newFrom, newTo);
  }
}

// uppdatera bokning
async function updateBooking(id, fromDate, toDate) {
  const response = await fetch(`${API_BASE}/bookings/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    },
    body: JSON.stringify({ fromDate, toDate })
  });

  if (response.ok) {
    alert('Bokning uppdaterad!');
    loadBookings();
  } else {
    alert('Något gick fel.');
  }
}

// returnera bil
async function returnCar(bookingId) {
  const response = await fetch(`${API_BASE}/bookings/return/${bookingId}`, {
    method: 'PUT',
    headers: getAuthHeader()
  });

  if (response.ok) {
    alert('Bil returnerad!');
    loadBookings();
  } else {
    alert('Något gick fel.');
  }
}

// ta bort användare
async function deleteUser(id) {
  if (!confirm('Ta bort användare?')) return;
  const response = await fetch(`${API_BASE}/users/${id}`, {
    method: 'DELETE',
    headers: getAuthHeader()
  });
  if (response.ok) loadUsers();
}

// redigera användare
function editUser(id, email, role) {
  const newEmail = prompt('Email:', email);
  const newRole = prompt('Roll (ROLE_USER eller ROLE_ADMIN):', role);

  if (newEmail && newRole) {
    updateUser(id, newEmail, newRole);
  }
}

// uppdatera användare
async function updateUser(id, email, role) {
  const response = await fetch(`${API_BASE}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    },
    body: JSON.stringify({ email, role })
  });

  if (response.ok) {
    alert('Användare uppdaterad!');
    loadUsers();
  } else {
    alert('Något gick fel.');
  }
}

// redigera bil
function editCar(id, name, model, type, price) {
  document.getElementById('car-name').value = name;
  document.getElementById('car-model').value = model;
  document.getElementById('car-type').value = type;
  document.getElementById('car-price').value = price;

  const btn = document.querySelector('.admin-add-car .btn--positive');
  btn.textContent = 'Uppdatera';
  btn.onclick = () => updateCar(id);
}

// uppdatera bil
async function updateCar(id) {
  const name = document.getElementById('car-name').value;
  const model = document.getElementById('car-model').value;
  const type = document.getElementById('car-type').value;
  const price = document.getElementById('car-price').value;

  const response = await fetch(`${API_BASE}/cars/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    },
    body: JSON.stringify({ name, model, type, price: parseFloat(price), booked: false })
  });

  if (response.ok) {
    alert('Bil uppdaterad!');
    loadCars();
    document.querySelector('.admin-add-car .btn--positive').textContent = 'Lägg till';
    document.querySelector('.admin-add-car .btn--positive').onclick = addCar;
  } else {
    alert('Något gick fel.');
  }
}

// sortera tabell
function sortTable(tableId, colIndex) {
  const table = document.getElementById(tableId);
  const tbody = table.querySelector('tbody');
  const rows = Array.from(tbody.querySelectorAll('tr'));

  const ascending = table.dataset.sortAsc !== 'true';
  table.dataset.sortAsc = ascending;

  rows.sort((a, b) => {
    const aText = a.cells[colIndex].textContent.trim();
    const bText = b.cells[colIndex].textContent.trim();
    return ascending ? aText.localeCompare(bText) : bText.localeCompare(aText);
  });

  rows.forEach(row => tbody.appendChild(row));
}

// ladda alla bilar
async function loadCars() {
  const response = await fetch(`${API_BASE}/cars`, {
    headers: getAuthHeader()
  });
  const cars = await response.json();
  const tbody = document.getElementById('cars-body');
  tbody.innerHTML = '';

  cars.forEach(car => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${car.id}</td>
      <td>${car.name}</td>
      <td>${car.type}</td>
      <td>${car.price} kr</td>
      <td>${car.booked ? 'Bokad' : 'Ledig'}</td>
      <td>
        <button class="btn btn--neutral" onclick="editCar(${car.id}, '${car.name}', '${car.model}', '${car.type}', ${car.price})">
          Redigera
        </button>
        <button class="btn btn--negative" onclick="deleteCar(${car.id})">
          Ta bort
        </button>
      </td>`;
    tbody.appendChild(row);
  });
}

// ta bort bil
async function deleteCar(id) {
  if (!confirm('Ta bort bil?')) return;
  const response = await fetch(`${API_BASE}/cars/${id}`, {
    method: 'DELETE',
    headers: getAuthHeader()
  });
  if (response.ok) loadCars();
}

// lägg till bil
async function addCar() {
  const name = document.getElementById('car-name').value;
  const model = document.getElementById('car-model').value;
  const type = document.getElementById('car-type').value;
  const price = document.getElementById('car-price').value;

  const response = await fetch(`${API_BASE}/cars`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    },
    body: JSON.stringify({ name, model, type, price: parseFloat(price), booked: false })
  });

  if (response.ok) {
    alert('Bil tillagd!');
    loadCars();
  } else {
    alert('Något gick fel.');
  }
}

loadBookings();
loadUsers();
loadCars();