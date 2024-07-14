// Logic for sign in attempts

const signIn = async function (e) {
  e.preventDefault();

  // Variables used to listen to the input fields for the username and password of a User
  const usernameInput = document.querySelector("#signIn-username").value.trim();
  const passwordInput = document.querySelector("#signIn-password").value.trim();

  // POST request with the username and password sent in the request body
  const response = await fetch("/api/users/signIn", {
    method: "POST",
    body: JSON.stringify({
      username: usernameInput,
      password: passwordInput,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
      // Redirect to the dashboard after a successful response
    window.location.assign('/dashboard');
  } else {
    alert("Sign In failed, Please try again.");
  }
};

// Button event listener for sign in request
document
  .querySelector("#signIn-form")
  .addEventListener("submit", signIn);
