const AUTH_KEY = 'smartai_user';
const ACCOUNTS_KEY = 'smartai_accounts';

/** Akun demo bawaan */
const DEMO_ACCOUNT = {
  nama: 'Demo Member',
  email: 'demo@smartai.id',
  hp: '081234567890',
  password: 'demo123',
  referral: 'SMARTAI-REF',
  avatar: null
};

function ensureDemoAccount() {
  let accounts = [];
  try {
    accounts = JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || '[]');
    if (!Array.isArray(accounts)) accounts = [];
  } catch (e) {
    accounts = [];
  }
  const idx = accounts.findIndex(function (a) {
    return a && a.email && a.email.toLowerCase() === DEMO_ACCOUNT.email.toLowerCase();
  });
  // also migrate old demo@smartai.com if present
  const oldIdx = accounts.findIndex(function (a) {
    return a && a.email && a.email.toLowerCase() === 'demo@smartai.com';
  });
  if (oldIdx >= 0 && idx < 0) {
    accounts[oldIdx].email = DEMO_ACCOUNT.email;
    accounts[oldIdx].password = DEMO_ACCOUNT.password;
  } else if (idx < 0) {
    accounts.unshift(Object.assign({}, DEMO_ACCOUNT));
  } else {
    accounts[idx].password = DEMO_ACCOUNT.password;
    if (!accounts[idx].referral) accounts[idx].referral = DEMO_ACCOUNT.referral;
    if (!accounts[idx].nama) accounts[idx].nama = DEMO_ACCOUNT.nama;
  }
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  return DEMO_ACCOUNT;
}

function getAccounts() {
  ensureDemoAccount();
  try {
    const list = JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || '[]');
    return Array.isArray(list) ? list : [Object.assign({}, DEMO_ACCOUNT)];
  } catch (e) {
    return [Object.assign({}, DEMO_ACCOUNT)];
  }
}

function findAccount(email, password) {
  const accounts = getAccounts();
  return (
    accounts.find(function (a) {
      return (
        a &&
        a.email &&
        a.email.toLowerCase() === String(email).toLowerCase() &&
        a.password === password
      );
    }) || null
  );
}

function sessionFromAccount(found) {
  return {
    nama: found.nama,
    email: found.email,
    hp: found.hp || '',
    referral: found.referral || '',
    avatar: found.avatar || null
  };
}

function getUser() {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function setUser(user) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

function clearUser() {
  localStorage.removeItem(AUTH_KEY);
  try {
    localStorage.removeItem('smartai_logged_in');
  } catch (e) {}
}

function requireAuth() {
  const user = getUser();
  if (!user) {
    location.href = 'index.html';
    return null;
  }
  return user;
}

function redirectIfLoggedIn() {
  if (getUser()) location.href = 'dashboard.html';
}

function logout() {
  clearUser();
  location.href = 'index.html';
}

function initials(name) {
  if (!name) return 'U';
  return String(name)
    .split(/\s+/)
    .map(function (p) {
      return p[0] || '';
    })
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function setupPasswordToggle(btnId, inputId) {
  const btn = document.getElementById(btnId);
  const input = document.getElementById(inputId);
  if (!btn || !input) return;
  btn.addEventListener('click', function () {
    const show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    btn.setAttribute('aria-label', show ? 'Sembunyikan password' : 'Tampilkan password');
  });
}

/** Login helper dipakai halaman sign-in */
function loginWithCredentials(email, password) {
  ensureDemoAccount();
  const found = findAccount(email, password);
  if (!found) return null;
  const session = sessionFromAccount(found);
  setUser(session);
  return session;
}

ensureDemoAccount();
