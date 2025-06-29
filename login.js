document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;

  if (user === 'random.people' && pass === '1234') {
    window.location.href = '/';
  } else {
    document.getElementById('login-error').textContent = 'Invalid credentials.';
  }
});
