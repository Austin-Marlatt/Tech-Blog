const signOut = async () => {
  const response = await fetch('/api/users/signOut', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

document.querySelector('#signOut').addEventListener('click', signOut);
