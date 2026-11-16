const AUTH_KEY = 'smartai_user';

function getUser() {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setUser(user) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

function clearUser() {
  localStorage.removeItem(AUTH_KEY);
}

function requireAuth() {
  const user = getUser();
  if (!user) {
    location.href = 'login.html';
    return null;
  }
  return user;
}

function redirectIfLoggedIn() {
  if (getUser()) location.href = 'dashboard.html';
}

function logout() {
  clearUser();
  location.href = 'login.html';
}

function initials(name) {
  if (!name) return 'U';
  return name.split(/\s+/).map(p => p[0]).slice(0, 2).join('').toUpperCase();
}

function setupPasswordToggle(btnId, inputId) {
  const btn = document.getElementById(btnId);
  const input = document.getElementById(inputId);
  if (!btn || !input) return;
  btn.addEventListener('click', () => {
    const show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    btn.setAttribute('aria-label', show ? 'Sembunyikan password' : 'Tampilkan password');
  });
}
