const signupFormHandler = async (event) => {
    event.preventDefault();
    const email = document.querySelector('#email-input').value.trim();
    const username = document.querySelector("#username-input").value.trim();
    const password = document.querySelector("#password-input").value.trim();

    if (username && password) {
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ email, username, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.replace("/");
      } else {
        alert("Failed to signup");
      }
    }
  };

document //signup button
.querySelector("form")
.addEventListener("submit", signupFormHandler);