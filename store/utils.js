export const getCookie = cookieName => {
  const defaultResult = ''
  if (cookieName == null) {
    return defaultResult
  }
  const cookies = document.cookie.split(';')
  const decodeCookieName = decodeURIComponent(cookieName)
  for (let i = 0; i < cookies.length; i++) {
    const [key, value] = cookies[i].trim().split('=')
    if (decodeURIComponent(key) === decodeCookieName) {
      return decodeURIComponent(value)
    }
  }
  return defaultResult
}

export const setCookie = (name, value, days = 365) => {
  const date = new Date()
  const encodeName = encodeURIComponent(name)
  const encodeValue = encodeURIComponent(value)
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${encodeName}=${encodeValue}; expires=${date.toUTCString()}; path=/; domain=.bilibili.com`
}
