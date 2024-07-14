const signUp = async function (e) {
  e.preventDefault();

  const usernameInput = document
    .querySelector('#signUp-username')
    .value.trim();
  const passwordInput = document
    .querySelector('#signUp-password')
    .value.trim();

  if (passwordInput.length >= 6 && passwordInput.length <= 24 && usernameInput) {
    const response = await fetch('/api/users/', {
      method: 'POST',
      body: JSON.stringify({
        username: usernameInput,
        password: passwordInput,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      window.location.assign('/dashboard');
    } else {
      alert('Sign up unsuccessful.');
    }
  };
};

document
  .querySelector('#signUp-form')
  .addEventListener('submit', signUp);