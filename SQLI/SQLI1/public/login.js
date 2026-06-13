const loginForm = document.getElementById("login-form")
const output = document.getElementById("output")

const PORT = location.port

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault()

  const loginFormData = new FormData(loginForm)

  const username = loginFormData.get("username").trim()
  const password = loginFormData.get("password")

  const answer = await fetch(`http://localhost:${PORT}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  })

  if(answer.ok) {
    window.location.assign("/user")
  } else {
    output.textContent = "Invalid Credentials"
    output.style.display = "block"
  }
})