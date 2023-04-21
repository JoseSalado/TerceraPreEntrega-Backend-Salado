const form = document.getElementById("loginForm");

  form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const obj = {};

  data.forEach((value, key) => (obj[key] = value));

  const url = "/api/auth";
  const headers = {
    "Content-Type": "application/json",
  };
  const method = "POST";
  const body = JSON.stringify(obj);

  fetch(url, {
    headers,
    method, 
    body,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.user) {
        window.location.href = "http://localhost:8080/profile";
      }
    })
    .catch((error) => console.log(error));
});