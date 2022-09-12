const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (username && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to log in");
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();
  const username = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (username && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to log in");
    }
  }
};

const switchToSignup = async (event) => {
  console.log("executing switchToSignup");

  //add hidden class to login form
  document.querySelector(".login-card").classList.add("hidden");
  //remove hidden class from signup form
  document.querySelector(".signup-card").classList.remove("hidden");
};

const switchToLogin = async (event) => {
  console.log("executing switchToLogin");

  //add hidden class to signup form
  document.querySelector(".signup-card").classList.add("hidden");
  //remove hidden class from login form
  document.querySelector(".login-card").classList.remove("hidden");
};

document //login button
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);

document //signup button
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);

document //switch to signup-form button
  .querySelector(".login-card")
  .querySelector(".page-switch")
  .addEventListener("click", switchToSignup);

document //switch to login-form button
  .querySelector(".signup-card")
  .querySelector(".page-switch")
  .addEventListener("click", switchToLogin);
