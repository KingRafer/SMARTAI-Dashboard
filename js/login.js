(function () {
  if (typeof redirectIfLoggedIn === 'function') redirectIfLoggedIn();

  var togglePass = document.getElementById('toggle-pass');
  var passwordInput = document.getElementById('password');
  if (togglePass && passwordInput) {
    var eyeOpen = togglePass.querySelector('.eye-open');
    var eyeClosed = togglePass.querySelector('.eye-closed');
    togglePass.addEventListener('click', function () {
      var isHidden = passwordInput.type === 'password';
      passwordInput.type = isHidden ? 'text' : 'password';
      if (eyeOpen) eyeOpen.style.display = isHidden ? 'none' : 'block';
      if (eyeClosed) eyeClosed.style.display = isHidden ? 'block' : 'none';
    });
  }

  var loginForm = document.getElementById('login-form');
  var errorMsg = document.getElementById('error-msg');
  var submitBtn = document.getElementById('submit-btn');
  if (!loginForm) return;

  function showError(msg) {
    if (!errorMsg) return;
    errorMsg.style.background = '';
    errorMsg.style.borderColor = '';
    errorMsg.style.color = '';
    errorMsg.textContent = msg;
    errorMsg.classList.add('show');
  }

  function showOk(msg) {
    if (!errorMsg) return;
    errorMsg.style.background = 'rgba(52,211,153,.1)';
    errorMsg.style.borderColor = 'rgba(52,211,153,.3)';
    errorMsg.style.color = 'var(--green)';
    errorMsg.textContent = msg;
    errorMsg.classList.add('show');
  }

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var email = (document.getElementById('email') || {}).value || '';
    var password = (document.getElementById('password') || {}).value || '';
    email = email.trim();

    if (errorMsg) {
      errorMsg.classList.remove('show');
      errorMsg.textContent = '';
    }

    if (!email || !password) {
      showError('Email dan password wajib diisi.');
      return;
    }
    if (password.length < 6) {
      showError('Password minimal 6 karakter.');
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Memproses...';
    }

    setTimeout(function () {
      var found = findAccount(email, password);
      if (!found) {
        showError('Email atau password salah. Coba lagi atau daftar akun baru.');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Masuk →';
        }
        return;
      }
      setUser(sessionFromAccount(found));
      showOk('Berhasil masuk. Mengalihkan ke dashboard…');
      setTimeout(function () {
        location.href = 'dashboard.html';
      }, 500);
    }, 400);
  });

  var forgot = document.getElementById('forgot-link');
  if (forgot) {
    forgot.addEventListener('click', function (e) {
      e.preventDefault();
      var text = encodeURIComponent('Halo Admin Smart AI, saya lupa password akun member. Mohon bantu reset.');
      window.open('https://wa.me/6282137585596?text=' + text, '_blank');
    });
  }
})();
