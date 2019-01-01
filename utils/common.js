export const CALL_API = Symbol('Call API')

export const serializeParams = params => Object.entries(params).map(n => `${n[0]}=${n[1]}`).join('&')

export const isMobile = (mobile) => {
  if (!mobile) {
    return false
  }
  const m = mobile.replace(/ /g, '')
  return /^1[3|4|5|7|8]\d{9}$/.test(m) ? m : false
}

export const isIDNumber = (id) => {
  if (!id) {
    return false
  }
  const m = id.replace(/ /g, '')
  return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(m) ? m : false
}

export const isName = (name) => {
  if (!name) {
    return false
  }
  const m = name.replace(/ /g, '')
  return /^[\u4e00-\u9fa5]{2,4}$/.test(m) ? m : false
}

export const isIOS = () => /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)

export const isAndroid = () => /(Android)/i.test(navigator.userAgent)

export const setTitle = (title) => {
  document.title = title
  if (isIOS() && !window.__wxjs_is_wkwebview) { // eslint-disable-line
    const i = document.createElement('iframe')
    i.src = '/favicon.ico'
    i.style.display = 'none'
    i.onload = () => {
      setTimeout(() => {
        i.remove()
      }, 0)
    }
    document.body.appendChild(i)
  }
}


// 从数组中随机取出若干不同的元素
export const getSomeFromArr = (arr, num) => {
  if (!arr) return null
  if (arr.length <= num) { return arr }
  const oldArr = [...arr]
  const newArr = []
  function gg(array) {
    newArr.push(array.splice(Math.floor(Math.random() * array.length), 1)[0])
  }
  for (let i = 0; i < num; i += 1) { gg(oldArr) }
  return newArr
}


// search 转为 obj
export const searchToObj = () => {
  const { search } = window.location
  const obj = {}
  if (!search || search.length < 1) return null
  const arr = search.slice(1).split('&')
  arr.forEach((item) => {
    const itemArr = item.split('=')
    const key = itemArr[0]
    const val = itemArr[1]
    obj[key] = val
  })
  return obj
}

export const addDefault = (fromArr, toArr) => {
  toArr.forEach((item) => {
    const o1 = fromArr.find(x => x.key === item.key)
    item.list.unshift(o1)
  })
  return toArr
}

export const setCookie = (key, value, expiredays = 29) => {
  const exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = `${key}=${encodeURIComponent(value)};expires=${exdate.toUTCString()}`
}

export const getCookie = (key) => {
  const reg = new RegExp(`(^| )${key}=([^;]*)(;|$)`)
  const arr = document.cookie.match(reg)
  if (arr) return decodeURIComponent(arr[2])
  return null
}

export const delCookie = (key) => {
  const exdate = new Date()
  exdate.setTime(exdate.getTime() - 1)
  const value = getCookie(key)
  if (value) document.cookie = `${key}=${encodeURIComponent(value)};expires=${exdate.toUTCString()}`
}

export const getUrlLastStr = (pathStr) => {
  if (!String(pathStr)) return ''
  const parts = pathStr.split('/')
  const param = parts.pop() || parts.pop()
  return param
}
