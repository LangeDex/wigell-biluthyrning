const API_BASE = 'http://localhost:8080/api/v1';

async function login(username, password) {
  const credentials = btoa(username + ':' + password);

  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + credentials
      },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      return { success: false };
    }

    const data = await response.json();

    sessionStorage.setItem('credentials', credentials);
    sessionStorage.setItem('username', data.username);
    sessionStorage.setItem('userId', data.userId);
    sessionStorage.setItem('isAdmin', data.isAdmin);

    return { success: true };

  } catch (error) {
    console.error('Inloggningsfel:', error);
    return { success: false };
  }
}

function logout() {
  sessionStorage.clear();
  window.location.href = 'index.html';
}

function getAuthHeader() {
  return { 'Authorization': 'Basic ' + sessionStorage.getItem('credentials') };
}

function requireLogin() {
  if (!sessionStorage.getItem('credentials')) {
    window.location.href = 'login.html';
  }
}

function isAdmin() {
  return sessionStorage.getItem('isAdmin') === 'true';
}

function requireAdmin() {
  requireLogin();
  if (!isAdmin()) {
    window.location.href = 'index.html';
  }
}

function updateNavbar() {
  const credentials = sessionStorage.getItem('credentials');
  const loginBtn = document.getElementById('login-btn');
  const userMenu = document.getElementById('user-menu');
  const avatarLetter = document.getElementById('avatar-letter');
  const dropdownUsername = document.getElementById('dropdown-username');
  const adminLink = document.getElementById('admin-link');
  const myBookingsLink = document.getElementById('my-bookings-link');

  if (credentials) {
    const username = sessionStorage.getItem('username');
    if (loginBtn) loginBtn.style.display = 'none';
    if (userMenu) userMenu.style.display = 'block';
    if (avatarLetter) avatarLetter.textContent = username.charAt(0).toUpperCase();
    if (dropdownUsername) dropdownUsername.textContent = username;
    if (myBookingsLink) myBookingsLink.style.display = 'inline';
    if (isAdmin() && adminLink) adminLink.style.display = 'inline';
  }
}

function toggleUserDropdown() {
  const dropdown = document.getElementById('user-dropdown');
  if (dropdown) {
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
  }
}