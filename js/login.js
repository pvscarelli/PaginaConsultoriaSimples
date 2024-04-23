const authBtn = document.getElementById("authBtn")

authBtn.addEventListener("click", (ev) => {
  ev.preventDefault()
  const email = document.getElementById("loginInput").value
  const password = document.getElementById("passwordInput").value

  const message = document.getElementById("message")
  if (email == "" || password == "") {
    message.classList.add("errorMessage")
    message.innerText = "Informe os dados de autenticação"
  } else {
    const savedUser = JSON.parse(localStorage.getItem(email))
    if (savedUser !== null && savedUser[3] === password) {
      document.cookie = `${savedUser[0]}=${new Date().getHours()}:${new Date().getMinutes()}`
      window.location.href = "index.html"
    } else {
      message.classList.add("errorMessage")
      message.innerText = "Email ou senha incorretos!"
    }
  }
})
