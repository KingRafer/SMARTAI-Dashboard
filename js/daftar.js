(function () {
  if (typeof redirectIfLoggedIn === 'function') redirectIfLoggedIn();

  document.querySelectorAll('.toggle-pass').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var targetId = btn.getAttribute('data-target');
      var input = targetId
        ? document.getElementById(targetId)
        : btn.parentElement.querySelector('input');
      if (!input) return;
      var isHidden = input.type === 'password';
      input.type = isHidden ? 'text' : 'password';
      var eyeOpen = btn.querySelector('.eye-open');
      var eyeClosed = btn.querySelector('.eye-closed');
      if (eyeOpen) eyeOpen.style.display = isHidden ? 'none' : 'block';
      if (eyeClosed) eyeClosed.style.display = isHidden ? 'block' : 'none';
    });
  });

  try {
    var params = new URLSearchParams(location.search);
    var refQ = params.get('ref');
    if (refQ && document.getElementById('referral')) {
      document.getElementById('referral').value = refQ;
    }
  } catch (e) {}

  var form = document.getElementById('interest-form') || document.getElementById('register-form');
  var errorMsg = document.getElementById('error-msg');
  var submitBtn = document.getElementById('submit-btn');
  var formView = document.getElementById('form-view');
  var successView = document.getElementById('success-view');
  if (!form) return;

  function showError(msg) {
    if (!errorMsg) return;
    errorMsg.style.background = '';
    errorMsg.style.borderColor = '';
    errorMsg.style.color = '';
    errorMsg.textContent = msg;
    errorMsg.classList.add('show');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var nama = ((document.getElementById('nama') || {}).value || '').trim();
    var email = ((document.getElementById('email') || {}).value || '').trim();
    var hp = ((document.getElementById('wa') || document.getElementById('hp') || {}).value || '')
      .trim()
      .replace(/\s/g, '');
    var password = ((document.getElementById('password') || {}).value || '');
    var password2 = ((document.getElementById('password2') || {}).value || '');
    var referral = ((document.getElementById('referral') || {}).value || '').trim();

    if (errorMsg) {
      errorMsg.classList.remove('show');
      errorMsg.textContent = '';
    }

    if (!nama || !email || !hp) {
      showError('Nama, email, dan WhatsApp wajib diisi.');
      return;
    }
    if (!/^[0-9]{10,15}$/.test(hp)) {
      showError('Nomor WhatsApp harus 10–15 digit angka.');
      return;
    }
    if (password.length < 6) {
      showError('Password minimal 6 karakter.');
      return;
    }
    if (password2 && password !== password2) {
      showError('Konfirmasi password tidak sama.');
      return;
    }

    var accounts = getAccounts();
    if (accounts.some(function (a) { return a.email && a.email.toLowerCase() === email.toLowerCase(); })) {
      showError('Email sudah terdaftar. Silakan login.');
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Membuat akun...';
    }

    var record = {
      nama: nama,
      email: email,
      hp: hp,
      password: password,
      referral: referral || '',
      avatar: null
    };
    accounts.push(record);
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
    setUser(sessionFromAccount(record));

    if (successView && formView) {
      formView.style.display = 'none';
      successView.classList.add('show');
      successView.style.display = 'block';
    }

    setTimeout(function () {
      location.href = 'dashboard.html';
    }, 1200);
  });
})();
