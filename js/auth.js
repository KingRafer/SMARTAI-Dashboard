const AUTH_KEY = 'smartai_user';
const ACCOUNTS_KEY = 'smartai_accounts';

/** Akun demo bawaan */
const DEMO_ACCOUNT = {
  nama: 'Demo Member',
  email: 'demo@smartai.com',
  hp: '081234567890',
  password: 'demo123',
  referral: 'SMARTAI'
};

function ensureDemoAccount() {
  let accounts = [];
  try {
    accounts = JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || '[]');
  } catch {
    accounts = [];
  }
  const exists = accounts.some(
    (a) => a.email && a.email.toLowerCase() === DEMO_ACCOUNT.email.toLowerCase()
  );
  if (!exists) {
    accounts.unshift({ ...DEMO_ACCOUNT });
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  }
  return DEMO_ACCOUNT;
}

function getAccounts() {
  ensureDemoAccount();
  try {
    return JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || '[]');
  } catch {
    return [{ ...DEMO_ACCOUNT }];
  }
}

function findAccount(email, password) {
  const accounts = getAccounts();
  return accounts.find(
    (a) =>
      a.email &&
      a.email.toLowerCase() === String(email).toLowerCase() &&
      a.password === password
  ) || null;
}

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
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
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

// Seed demo saat script dimuat
ensureDemoAccount();
