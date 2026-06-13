const welcome = document.getElementById("welcome")
const personalNotes = document.getElementById("personal-notes")
const save = document.getElementById("save")
const response = document.getElementById("response")

const PORT = location.port

fetch(`http://localhost:${PORT}/user/data`, {
  credentials: "include"
})
  .then(res => res.json())
  .then(data => {
    welcome.textContent += ` ${data.username}`
    if (data.notes)
      personalNotes.value = data.notes
  })
  .catch(err => console.log(err))

save.addEventListener("click", async () => {
  const res = await fetch(`http://localhost:${PORT}/user/update`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({notes: `${personalNotes.value}`})
  })

  const resData = await res.json()
  response.textContent = resData.status
  response.style.display = "block"
})