const customSite = document.getElementById("customSite")
const normalSite = document.getElementById("normalSite")

const body = document.getElementById("body")
const sendBtn = document.getElementById("sendBtn")
const loginLink = document.getElementById("loginLink")
const img2 = document.getElementById("img2")
const img1 = document.getElementById("img1")

customSite.addEventListener("click", () => {
  body.classList.add("customSite")
  body.classList.add("customInput")

  sendBtn.classList.remove("sendBtn")
  sendBtn.classList.add("sendBtn2")

  loginLink.classList.remove("loginLink")
  loginLink.classList.add("loginLink2")

  img2.classList.remove("logoImg2")
  img2.classList.add("logoImg")

  img1.classList.remove("logoImg")
  img1.classList.add("logoImg2")
})

normalSite.addEventListener("click", () => {
  body.classList.remove("customSite")
  body.classList.remove("customInput")

  sendBtn.classList.remove("sendBtn2")
  sendBtn.classList.add("sendBtn")

  loginLink.classList.remove("loginLink2")
  loginLink.classList.add("loginLink")

  img1.classList.remove("logoImg2")
  img1.classList.add("logoImg")

  img2.classList.remove("logoImg")
  img2.classList.add("logoImg2")
})

const message = document.getElementById("message")

sendBtn.addEventListener("click", (ev) => {
  ev.preventDefault()
  const name = document.getElementById("nameInput").value
  const email = document.getElementById("emailInput").value
  const date = document.getElementById("dateInput").value
  const password = document.getElementById("passwordInput").value
  const confirmPassword = document.getElementById("passwordConfirmInput").value
  const selectedGenre = document.querySelector('input[name="genRd"]:checked')
  const markedService1 = document.getElementById("servicesChkBx1").checked
  const markedService2 = document.getElementById("servicesChkBx2").checked
  const markedService3 = document.getElementById("servicesChkBx3").checked

  const error = validateInputs(name, email, date, password, confirmPassword, selectedGenre)

  if (error !== "") {
    message.classList.remove("successMessage")
    message.classList.add("errorMessage")
    message.innerText = error
  } else {
    message.classList.remove("errorMessage")
    message.classList.add("successMessage")
    message.innerText = "Usuário cadastrado com sucesso!"
    const user = [
      name,
      email,
      date,
      password,
      confirmPassword,
      selectedGenre.value,
      (services = [markedService1, markedService2, markedService3]),
    ]
    updateLocalStorage(email, user)
  }
})

function validateInputs(name, email, date, password, confirmPassword, selectedGenre) {
  if (name === "" || email === "" || date === "" || password === "" || confirmPassword === "" || selectedGenre === null) {
    return "Preencha todos os campos!"
  }
  const namePattern = /^[a-zA-ZÀ-ú\s]+$/

  console.log(name + "\n" + email + "\n" + date + "\n" + password + "\n" + confirmPassword + "\n" + selectedGenre.value)
  if (!namePattern.test(name)) {
    return "Insira um nome válido"
  }

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  if (!emailPattern.test(email)) {
    return "Insira um e-mail válido"
  }

  if (password !== confirmPassword) {
    return "As senhas não coincidem"
  }
  return ""
}

function updateLocalStorage(email, user) {
  const savedEmail = JSON.parse(localStorage.getItem(email))
  if (savedEmail === null) {
    localStorage.setItem(email, JSON.stringify(user))
    document.getElementById("regForm").reset()
  } else {
    message.classList.remove("successMessage")
    message.classList.add("errorMessage")
    message.innerText = "E-mail duplicado!"
  }
}

const cookies = document.cookie.split("=")
const user = cookies[0]
const loginTime = cookies[1]

if (loginTime !== undefined) {
  const showUser = document.getElementById("userNotAuth")
  showUser.innerText = `${user}\n${loginTime}`
}
