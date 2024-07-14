const signOut = async () => {
  const response = await fetch('/api/users/signOut', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    window.location.assign('/dashboard');
  } else {
    alert(response.statusText);
  }
};

document.querySelector('#signOut').addEventListener('click', signOut);
