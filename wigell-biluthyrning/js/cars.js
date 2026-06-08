let allCars = [];
let activeFilters = [];
let currentSort = null;

async function getCars() {
  const response = await fetch(`${API_BASE}/cars`);
  const cars = await response.json();
  return cars;
}

async function displayCars(cars) {
  const container = document.getElementById('cars-container');
  container.innerHTML = '';

  cars.forEach(car => {
    const card = document.createElement('div');
    card.classList.add('car-card');
    card.innerHTML = `
      <img src="${getCarImage(car.name)}" alt="${car.name}" />
      <div class="car-card__info">
        <h3>${car.name}</h3>
        <p>${car.model}</p>
        <p>${car.type}</p>
        <p>${car.price} kr/dag</p>
        <button class="btn btn--positive" onclick="bookCar(${car.id})">
          Boka
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

function getCarImage(name) { 
  const images = {
    'Audi A4': 'images/Audi-A4.jpg',
    'BMW i3': 'images/BMW-i3.jpg',
    'Toyota Hilux': 'images/Toyota-Hilux.jpg',
    'Volvo XC60': 'images/Volvo-XC60.jpg',
    'Volvo S60': 'images/Volvo-S60.jpg',
    'BMW G20': 'images/BMW-G20.webp',
    'Mercedes C-Class': 'images/Mercedes-C-Class.jpg',
    'Dacia Duster': 'images/Dacia-Duster.jpg',
    'Volkswagen Tiguan': 'images/Volkswagen-Tiguan.webp',
    'Toyota RAV4': 'images/Toyota-RAV4.jpg',
    'Volvo EX40': 'images/Volvo-EX40.jpg',
    'Nissan Leaf': 'images/Nissan-Leaf.webp',
    'BMW iX': 'images/BMW-iX.jpg',
    'Ford Ranger': 'images/Ford-Ranger.jpg',
    'RAM 1500': 'images/RAM-1500.jpg',
    'Mitsubishi L200': 'images/Mitsubishi-L200.jpg',
  };
  return images[name] || 'images/car-default.jpg';
}

async function loadCars() {
  allCars = await getCars();
  displayCars(allCars);
}

function applyFilters() {
  activeFilters = Array.from(document.querySelectorAll('.filter-sidebar input:checked'))
    .map(cb => cb.value);

  let result = activeFilters.length === 0 ? [...allCars] : allCars.filter(car => activeFilters.includes(car.type));

  if (currentSort) result = applySorting(result);
  displayCars(result);
}

function applySorting(cars) {
  if (currentSort === 'price-asc') return [...cars].sort((a, b) => a.price - b.price);
  if (currentSort === 'price-desc') return [...cars].sort((a, b) => b.price - a.price);
  if (currentSort === 'name-asc') return [...cars].sort((a, b) => a.name.localeCompare(b.name));
  if (currentSort === 'name-desc') return [...cars].sort((a, b) => b.name.localeCompare(a.name));
  return cars;
}

function sortByPrice(direction) {
  currentSort = `price-${direction}`;
  applyFilters();
}

function sortCars(field, direction = 'asc') {
  currentSort = `${field}-${direction}`;
  applyFilters();
}

function resetFilters() {
  activeFilters = [];
  currentSort = null;
  document.querySelectorAll('.filter-sidebar input').forEach(cb => cb.checked = false);
  displayCars(allCars);
}

function bookCar(carId) {
  if (!sessionStorage.getItem('credentials')) {
    openLoginModal();
  } else {
    window.location.href = `booking.html?carId=${carId}`;
  }
}