const login = document.getElementById("login")
const cookieEl = document.getElementById("cookie")

const PORT = location.port

const username = "victim45"
const password = "123456"

const getData = async () => {
  const resp = await fetch(`http://localhost:${PORT}/user/data`)
  const data = await resp.json()

  cookieEl.textContent += ` | ${data.data}`
}

login.addEventListener("click", async () => {
  await fetch(`http://localhost:${PORT}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  })

  cookieEl.textContent = `Your session cookie: ${document.cookie}`
  cookieEl.style.display = "block"

  getData()
})