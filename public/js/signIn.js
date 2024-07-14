const signIn = async function (e) {
  e.preventDefault();

  const usernameInput = document.querySelector("#signIn-username").value.trim();
  const passwordInput = document.querySelector("#signIn-password").value.trim();

  const response = await fetch("/api/users/signIn", {
    method: "POST",
    body: JSON.stringify({
      username: usernameInput,
      password: passwordInput,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Sign In failed, Please try again.");
  }
};

document
  .querySelector("#signIn-form")
  .addEventListener("submit", signIn);
