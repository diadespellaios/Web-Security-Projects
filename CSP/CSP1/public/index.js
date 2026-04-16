const source = document.getElementById("input")
const submit = document.getElementById("submit")
const sink = document.getElementById("output")

const PORT = location.port

const getResult = async () => {
  const fetchRes = await fetch(`http://localhost:${PORT}/query?` + new URLSearchParams({search: `${source.value.trim()}`}).toString())
  source.value = ''
  
  const queryResult = await fetchRes.json()

  sink.innerHTML = `${queryResult}`
  sink.style.display = "block"
}

source.addEventListener("keypress", (e) => {
  if (e.key === "Enter" ) {
    getResult()
  }
})

submit.addEventListener("click", getResult)