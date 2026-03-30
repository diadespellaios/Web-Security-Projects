const input = document.getElementById("input")
const submit = document.getElementById("submit")
const output = document.getElementById("output")

const renderText = () => {
  output.innerHTML = input.value
  output.style.display = "block"
  input.value = ''
} 

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter" ) {
    renderText()
  }
})

submit.addEventListener("click", renderText)