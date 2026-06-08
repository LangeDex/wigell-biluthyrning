const toggle = document.getElementById('sidebarToggle');
const nav    = document.getElementById('sidebarNav');

if (toggle && nav) {
    toggle.addEventListener('click', () => {
        nav.classList.toggle('is-open');
    });
}