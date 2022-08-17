const TOKEN_KEY = 'geek_pc'

function getToken () {
  return localStorage.getItem(TOKEN_KEY)
}

function setToken (value) {
  return localStorage.setItem(TOKEN_KEY, value)
}

function removeToken () {
  return localStorage.removeItem(TOKEN_KEY)
}

export { getToken, setToken, removeToken }