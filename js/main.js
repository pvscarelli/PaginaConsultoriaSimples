const cookies = document.cookie.split("=")
const user = cookies[0]
const loginTime = cookies[1]

const logoutBtn = document.getElementById("logout")

if (loginTime !== undefined) {
  const showUser = document.getElementById("userNotAuth")
  showUser.innerText = `${user}\n${loginTime}`
  const userImg = document.getElementById("userImg")
  userImg.classList.remove("notVisible")
  const loginLink = document.getElementById("loginLink")
  loginLink.classList.add("notVisible")
} else {
  logoutBtn.classList.add("notVisible")
}

logoutBtn.addEventListener("click", (ev) => {
  document.cookie = `${user}=; max-age=0`
  location.reload()
})
