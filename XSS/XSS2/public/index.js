const source = document.getElementById("input")
const submit = document.getElementById("submit")
const sink = document.getElementById("output")

const PORT = location.port

const getResult = async () => {
  const fetchRes = await fetch(`http://localhost:${PORT}/query?` + new URLSearchParams({search: `${source.value.trim()}`}).toString())

  const queryResult = await fetchRes.json()


  sink.innerHTML = `Your results for "${source.value}":<br>`
  for (let entry of queryResult) {
    sink.innerHTML += `${entry.sentence}<br>`
  }
  sink.style.display = "block"
  source.value = ''
}

source.addEventListener("keypress", (e) => {
  if (e.key === "Enter" ) {
    getResult()
  }
})

submit.addEventListener("click", getResult)