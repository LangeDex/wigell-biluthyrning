// Hämta carId från URL
const params = new URLSearchParams(window.location.search);
const carId = params.get('carId');

// Visa bilinfo
async function loadCarInfo() {
  const response = await fetch(`${API_BASE}/cars/${carId}`, {
    headers: getAuthHeader()
  });
  const car = await response.json();

  document.getElementById('car-info').innerHTML = `
    <div class="car-summary">
      <h3>${car.name}</h3>
      <p>${car.type} – ${car.price} kr/dag</p>
    </div>
  `;
}

// Skicka bokning
document.getElementById('booking-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  requireLogin();

  const fromDate = document.getElementById('from-date').value;
  const toDate = document.getElementById('to-date').value;
  const userId = sessionStorage.getItem('userId');

  const response = await fetch(`${API_BASE}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    },
    body: JSON.stringify({
      carId: carId,
      userId: userId,
      fromDate: fromDate,
      toDate: toDate
    })
  });

  if (response.ok) {
    alert('Bokning lyckades!');
    window.location.href = 'my-bookings.html';
  } else {
    alert('Något gick fel, försök igen.');
  }
});

// Körs vid sidladdning
requireLogin();
loadCarInfo();