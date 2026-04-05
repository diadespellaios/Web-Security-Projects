const fetchBtn = document.getElementById("fetch")
const replyPar = document.getElementById("reply")

fetchBtn.addEventListener("click", () => {
  fetch("http://localhost:8000/endpoint", {method: "GET"})
    .then(res => res.json())
    .then(data => {
      console.log(data)
      replyPar.style.display = "block"
      replyPar.innerText = "Fetch response: " + JSON.stringify(data)
    })
    .catch(error => {
      replyPar.style.display = "block"
      replyPar.innerText = error
    })
})

