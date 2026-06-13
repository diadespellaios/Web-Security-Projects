const registerForm = document.getElementById("register-form")
const output = document.getElementById("output")
const signIn = document.getElementById("sign-in")

const PORT = location.port

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault()

  const registerFormData = new FormData(registerForm)

  const fullName = registerFormData.get("fullName").trim()
  const username = registerFormData.get("username").trim()
  const password = registerFormData.get("password")

  const answer = await fetch(`http://localhost:${PORT}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      fullName: fullName,
      username: username,
      password: password
    })
  })

  registerForm.reset()

  const data = await answer.json()
  output.textContent = data.Registration
  output.style.display = "block"
  signIn.style.display = "block"
})